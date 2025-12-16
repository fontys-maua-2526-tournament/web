export async function deleteTournament(id: number | string) {
  const response = await api.delete(`${API_URL}/${id}`);
  return response.data;
}
import api from './api';

const API_URL = '/tournaments';

export async function getAllTournaments() {
  const response = await api.get(API_URL);
  return response.data;
}

export async function createTournament(tournament: {
  name: string;
  address: string;
  startTime?: string;
  endTime?: string;
}) {
  const response = await api.post(API_URL, tournament);
  return response.data;
}

export async function getTournamentById(id: number | string) {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
}

export async function updateTournament(
  id: number,
  tournament: {
    id?: number;
    name: string;
    invite?: string;
    address: string;
    status?: string;
    startTime: string;
    endTime: string;
  },
) {
  const response = await api.put(`${API_URL}/${id}`, tournament);
  return response.data;
}

export async function cancelTournament(id: number | string) {
  const response = await api.put(`${API_URL}/cancel/${id}`);
  return response.data;
}
