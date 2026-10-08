import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const temporary = await mkdtemp(path.join(tmpdir(), 'travelgods-tests-'));
try {
  const entry = path.join(temporary, 'entry.js');
  const output = path.join(temporary, 'runtime.mjs');
  await writeFile(entry, `
    export { configureStore } from '${root.replaceAll('\\', '/')}/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs';
    export { campersApi as axios } from '${root.replaceAll('\\', '/')}/src/services/campersApi.js';
    export * from '@redux/campersOperations';
    export * from '@redux/campersSlice';
    export * from '@redux/filtersSlice';
    export * from '@redux/applicationStorageSlice';
    export * from '@utils/bookingValidation';
  `);
  await build({ entryPoints: [entry], outfile: output, bundle: true, platform: 'node', format: 'esm', preserveSymlinks: true,
    alias: { '@redux': path.join(root, 'src/redux'), '@utils': path.join(root, 'src/utils') },
    define: { 'import.meta.env.VITE_API_KEY': JSON.stringify('66b1f8e71ca8ad33d4f5f63e') },
    banner: { js: "import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);" },
  });
  const api = await import(pathToFileURL(output));
  const store = api.configureStore({ reducer: { campers: api.campersReducer, filters: api.filtersReducer } });
  const requests = [];
  const reply = (config, data) => ({ config, data, status: 200, statusText: 'OK', headers: {} });
  api.axios.defaults.adapter = async config => {
    requests.push(config.url);
    const params = new URL(config.url, 'https://example.test').searchParams;
    const page = Number(params.get('page'));
    return reply(config, { items: page === 1 ? [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }] : [{ id: '5' }], total: 10 });
  };
  const applied = { transmission: 'automatic', kitchen: true, location: ' Kyiv, Ukraine ' };
  await store.dispatch(api.fetchCampers({ filters: applied }));
  store.dispatch(api.updateFilters({ transmission: 'manual' }));
  await store.dispatch(api.fetchCampers({ filters: store.getState().filters.filters.applied, isNextPage: true }));
  assert.equal(store.getState().campers.items.length, 5);
  assert.equal(new Set(store.getState().campers.items.map(item => item.id)).size, 5);
  assert.match(requests[1], /page=2/);
  assert.match(requests[1], /transmission=automatic/);
  assert.match(requests[1], /kitchen=true/);
  assert.match(requests[1], /location=Kyiv/);
  assert.equal(store.getState().filters.filters.draft.transmission, 'manual');
  console.log('PASS: pagination retains applied filters while draft selections change');

  const pending = [];
  api.axios.defaults.adapter = config => new Promise(resolve => pending.push({ config, resolve }));
  store.dispatch(api.changePage(1));
  const older = store.dispatch(api.fetchCampers({ filters: { engine: 'diesel' } }));
  store.dispatch(api.changePage(1));
  const newer = store.dispatch(api.fetchCampers({ filters: { engine: 'petrol' } }));
  pending[1].resolve(reply(pending[1].config, { items: [{ id: 'new' }], total: 1 }));
  await newer;
  pending[0].resolve(reply(pending[0].config, { items: [{ id: 'old' }], total: 1 }));
  await older;
  assert.deepEqual(store.getState().campers.items.map(item => item.id), ['new']);
  assert.equal(store.getState().filters.filters.applied.engine, 'petrol');
  console.log('PASS: a late previous search cannot overwrite current results');

  api.axios.defaults.adapter = async () => { const error = new Error('Not found'); error.response = { status: 404 }; throw error; };
  store.dispatch(api.changePage(1));
  await store.dispatch(api.fetchCampers({ filters: { engine: 'electric' } }));
  assert.equal(store.getState().campers.items.length, 0);
  assert.equal(store.getState().campers.isEndOfCollection, true);
  assert.equal(store.getState().campers.error, null);
  await store.dispatch(api.fetchCamperById('999999'));
  assert.equal(store.getState().campers.error, 'NOT_FOUND');
  console.log('PASS: empty search and missing detail produce different states');


  store.dispatch(api.resetState());
  let failNext = false;
  const pages = [];
  api.axios.defaults.adapter = async config => {
    const page = Number(new URL(config.url, 'https://example.test').searchParams.get('page'));
    pages.push(page);
    if (failNext) { failNext = false; throw new Error('Network disconnected'); }
    const items = Array.from({ length: page === 3 ? 1 : 4 }, (_, index) => ({ id: String((page - 1) * 4 + index + 1) }));
    return reply(config, { items, total: 9 });
  };
  await store.dispatch(api.fetchCampers({ filters: {} }));
  failNext = true;
  await store.dispatch(api.fetchCampers({ filters: {}, isNextPage: true }));
  assert.equal(store.getState().campers.page, 1);
  assert.equal(store.getState().campers.items.length, 4);
  assert.equal(store.getState().campers.loading, false);
  assert.equal(store.getState().campers.error, 'Network disconnected');
  await store.dispatch(api.fetchCampers({ filters: {}, isNextPage: true }));
  assert.equal(store.getState().campers.items.length, 8);
  assert.equal(store.getState().campers.error, null);
  await store.dispatch(api.fetchCampers({ filters: {}, isNextPage: true }));
  assert.equal(store.getState().campers.isEndOfCollection, true);
  assert.equal(new Set(store.getState().campers.items.map(item => item.id)).size, 9);
  assert.deepEqual(pages, [1, 2, 2, 3]);
  store.dispatch(api.changePage(1));
  assert.equal(store.getState().campers.items.length, 0);
  assert.equal(store.getState().campers.isEndOfCollection, false);
  await store.dispatch(api.fetchCampers({ filters: { transmission: 'manual' } }));
  assert.equal(store.getState().campers.page, 1);
  assert.equal(store.getState().campers.items.length, 4);
  console.log('PASS: network retry retains cards, final page ends pagination and new search resets results');

  const detailRequests = [];
  api.axios.defaults.adapter = config => new Promise(resolve => detailRequests.push({ config, resolve }));
  const oldDetail = store.dispatch(api.fetchCamperById('1'));
  store.dispatch(api.clearCamperDetails());
  const currentDetail = store.dispatch(api.fetchCamperById('8'));
  detailRequests[1].resolve(reply(detailRequests[1].config, { id: '8' }));
  await currentDetail;
  detailRequests[0].resolve(reply(detailRequests[0].config, { id: '1' }));
  await oldDetail;
  assert.equal(store.getState().campers.camperDetails.id, '8');
  store.dispatch(api.clearCamperDetails());
  assert.equal(store.getState().campers.camperDetails, null);
  console.log('PASS: navigating between details ignores outdated responses and clears the previous camper');

  const validBooking = { userName: 'Çağrı Yılmaz', userEmail: 'camper@example.com' };
  assert.equal(await api.bookingValidation.isValid(validBooking), true);
  assert.equal(await api.bookingValidation.isValid({ ...validBooking, userName: '12345' }), false);
  assert.equal(await api.bookingValidation.isValid({ ...validBooking, userEmail: 'johnexample.com' }), false);
  assert.equal(await api.bookingValidation.isValid({ ...validBooking, userName: '' }), false);
  assert.equal(await api.bookingValidation.isValid({ ...validBooking, userEmail: '' }), false);
  console.log('PASS: name and email alone allow booking; invalid or missing values are rejected');

  let saved = api.applicationStorageReducer(undefined, { type: 'init' });
  saved = api.applicationStorageReducer(saved, api.switchFavorites('8'));
  const rehydrated = JSON.parse(JSON.stringify(saved));
  assert.deepEqual(rehydrated.favorites, ['8']);
  saved = api.applicationStorageReducer(rehydrated, api.switchFavorites('8'));
  assert.deepEqual(saved.favorites, []);
  saved = api.applicationStorageReducer(saved, api.changeBooking({ id: '8', name: 'Çağrı Yılmaz', email: 'camper@example.com' }));
  assert.deepEqual(JSON.parse(JSON.stringify(saved)).booking['8'], { name: 'Çağrı Yılmaz', email: 'camper@example.com' });
  console.log('PASS: favorite toggling and local booking storage survive serialization');
} finally {
  await rm(temporary, { recursive: true, force: true });
}
