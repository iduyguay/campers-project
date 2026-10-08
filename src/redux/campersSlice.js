import { createSlice } from '@reduxjs/toolkit';
import { fetchCampers, fetchCamperById } from '@redux/campersOperations';

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const initialState = {
  items: [],
  camperDetails: null,
  page: 1,
  isEndOfCollection: false,
  loading: false,
  error: null,
  listRequestId: null,
  detailsRequestId: null,
};

const campersSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {
    changePage(state, action) {
      if (action.payload === 1) {
        state.items = [];
        state.page = 1;
        state.isEndOfCollection = false;
        state.listRequestId = null;
      }
      state.page = action.payload;
    },
    clearCamperDetails(state) {
      state.camperDetails = null;
      state.detailsRequestId = null;
      state.loading = false;
      state.error = null;
    },
    resetState(state) {
      state.items = [];
      state.page = 1;
      state.isEndOfCollection = false;
      state.loading = false;
      state.error = null;
      state.listRequestId = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCampers.pending, (state, action) => {
        handlePending(state);
        state.error = null;
        state.listRequestId = action.meta.requestId;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        if (state.listRequestId !== action.meta.requestId) return;
        state.loading = false;
        state.error = null;
        state.items = [...action.payload.items];
        state.page = action.payload.page;
        state.isEndOfCollection = action.payload.isEndOfCollection;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        if (state.listRequestId !== action.meta.requestId) return;
        handleRejected(state, action);
      })
      .addCase(fetchCamperById.pending, (state, action) => {
        handlePending(state);
        state.error = null;
        state.detailsRequestId = action.meta.requestId;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        if (state.detailsRequestId !== action.meta.requestId) return;
        state.loading = false;
        state.error = null;
        state.camperDetails = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        if (state.detailsRequestId !== action.meta.requestId) return;
        handleRejected(state, action);
      });
  },
});

export const { changePage, clearCamperDetails, resetState } =
  campersSlice.actions;
export const campersReducer = campersSlice.reducer;
