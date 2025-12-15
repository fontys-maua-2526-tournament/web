import api from './api';

const API_URL = '/matches';

export interface SaveMatchRequest {
  round: number;
  tournamentId: number;
  team1Id: number;
  team2Id: number;
  team1Score?: number;
  team2Score?: number;
}

export interface Match extends SaveMatchRequest {
  id?: number;
}

export async function createMatch(match: SaveMatchRequest) {
  const response = await api.post(API_URL, match);
  return response.data;
}

export async function updateMatch(id: number, match: SaveMatchRequest) {
  const response = await api.put(`${API_URL}/${id}`, match);
  return response.data;
}

export async function getAllMatches(): Promise<Match[]> {
  const response = await api.get(API_URL);
  const data = response.data;
  // Normalize common response shapes
  return Array.isArray(data) ? data : data.matches || data.data || [];
}

export async function getMatchesByTournament(tournamentId: number | string): Promise<Match[]> {
  const matches = await getAllMatches();
  return matches.filter(m => String(m.tournamentId) === String(tournamentId));
}
