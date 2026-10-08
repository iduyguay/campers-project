import { useSelector, useDispatch } from 'react-redux';
import { BsX } from 'react-icons/bs';
import { Card, Button } from '@components';
import LoadingOverlay from '../LoadingOverlay';
import { selectFilters } from '@redux/filtersSelectors';
import { updateFilters, emptyFilters } from '@redux/filtersSlice';
import { changePage } from '@redux/campersSlice';
import { selectCampers, selectEndOfCollection, selectError, selectLoading } from '@redux/campersSelectors';
import { fetchCampers } from '@redux/campersOperations';
import css from './CampersList.module.css';
export default function CampersList() {
  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);
  const { applied } = useSelector(selectFilters);
  const isEnd = useSelector(selectEndOfCollection);
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const clear = () => {
    dispatch(updateFilters(emptyFilters));
    dispatch(changePage(1));
    dispatch(fetchCampers({ filters: emptyFilters }));
  };
  return <section className={css.campers} aria-label="Campers list" aria-busy={loading}>
    {campers.length > 0 && <ul className={css.list}>{campers.map(camper => <Card {...camper} key={camper.id} />)}</ul>}
    {!loading && !error && campers.length === 0 && <div className={css.empty}>
      <img src="/not-found/campers-empty.png" width="488" height="463" alt="Camper and magnifying glass in a mountain landscape" />
      <h2>No campers found</h2>
      <p>We couldn’t find any campers that match your filters.<br />Try adjusting your search or clearing some filters.</p>
      <div className={css.actions}><Button outlined onClick={clear}><BsX size={20} aria-hidden="true" />Clear filters</Button><Button filled onClick={clear}>View all campers</Button></div>
    </div>}
    {error && <div className={css.error} role="alert"><h2>Unable to load campers</h2><p>Please check your connection and try again.</p><Button outlined onClick={() => dispatch(fetchCampers({ filters: applied, isNextPage: campers.length > 0 }))}>Try again</Button></div>}
    {!error && !isEnd && !loading && <Button onClick={() => dispatch(fetchCampers({ filters: applied, isNextPage: true }))} outlined centered>Load more</Button>}
    {loading && <LoadingOverlay />}
  </section>;
}
