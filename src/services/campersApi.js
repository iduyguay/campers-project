import axios from 'axios';
import { BASE_URL, PER_PAGE } from '@utils/constants/apiConfig';
import { filterFalseValues } from '@utils/helpers/filterFalseValues';

export const campersApi = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

export async function getCampers(filters, page) {
  const cleanedFilters = filterFalseValues(filters);
  const query = new URLSearchParams(cleanedFilters);
  const url = `/campers?page=${page}&limit=${PER_PAGE}&${query}`;

  try {
    const response = await campersApi.get(url);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return { items: [], total: 0 };
    }

    throw error;
  }
}

export async function getCamper(id) {
  const response = await campersApi.get(`/campers/${id}`);
  return response.data;
}
