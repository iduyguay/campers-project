import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { PER_PAGE } from '@utils/constants/apiConfig';
import { getCampers, getCamper } from '../services/campersApi';
import { applyFilters } from '@redux/filtersSlice';

const checkEndOfCollection = (total, page) => {
  const totalPages = Math.ceil(total / PER_PAGE);
  return page >= totalPages || totalPages === 1;
};

export const fetchCampers = createAsyncThunk(
  'campers/fetchCampers',
  async ({ filters, isNextPage = false }, thunkAPI) => {
    if (!isNextPage) thunkAPI.dispatch(applyFilters(filters));
    const {
      campers: { page, items },
    } = thunkAPI.getState();

    const currentPage = isNextPage ? page + 1 : page;

    try {
      const data = await getCampers(filters, currentPage);

      const isEndOfCollection = checkEndOfCollection(
        data.total,
        currentPage
      );

      if (!data.total) {
        return { items: [], page: currentPage, isEndOfCollection };
      }
      if (isEndOfCollection && isNextPage) {
        toast.success('End of collection.');
      }

      const newItems = isNextPage
        ? [...items, ...data.items]
        : data.items;

      return {
        items: newItems,
        page: currentPage,
        isEndOfCollection,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCamperById = createAsyncThunk(
  'campers/fetchCamperById',
  async (id, thunkAPI) => {
    try {
      return await getCamper(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.status === 404 ? 'NOT_FOUND' : error.message);
    }
  }
);
