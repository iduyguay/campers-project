import { createSlice } from '@reduxjs/toolkit';
export const emptyFilters = { location: '', form: '', engine: '', transmission: '', AC: false, TV: false, bathroom: false, kitchen: false };
const filtersSlice = createSlice({
  name: 'filters',
  initialState: { filters: { draft: { ...emptyFilters }, applied: { ...emptyFilters } } },
  reducers: {
    updateFilters(state, action) { state.filters.draft = { ...emptyFilters, ...action.payload }; },
    applyFilters(state, action) { state.filters.applied = { ...emptyFilters, ...action.payload }; },
  },
});
export const { updateFilters, applyFilters } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
