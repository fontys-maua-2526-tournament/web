import api from './api';

const API_URL = '/matches';

export async function getAllMatches() {
  const response = await api.get(API_URL);
  return response.data;
}

export async function getMatchById(id: number | string) {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
}