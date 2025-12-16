import api from './api';

const API_URL = '/teams';

export async function getAllTeams() {
  const response = await api.get(API_URL);
  return response.data;
}

export async function getTeamById(id: number | string) {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
}

export async function createTeam(team: { name: string; inviteCode?: string }) {
  const response = await api.post(API_URL + '/create', team);
  return response.data;
}

export async function updateTeam(id: number, team: { name: string; inviteCode?: string }) {
  const response = await api.put(`${API_URL}/${id}`, team);
  return response.data;
}

export async function deleteTeam(id: number) {
  const response = await api.delete(`${API_URL}/${id}`);
  return response.data;
}

export async function getTeamMembers(teamId: number | string) {
  const response = await api.get(`${API_URL}/${teamId}/members`);
  const data = response.data;
  return Array.isArray(data) ? data : data.members || data.data || [];
}

export async function addUserToTeam(teamId: number | string, userId: number) {
  // NOTE: some backends expose adding by team id via POST /teams/{teamId}/users
  // keep support for that shape if available
  try {
    const response = await api.post(`${API_URL}/${teamId}`, { userId });
    return response.data;
  } catch (err) {
    // fallback to invite-based endpoint if backend exposes addToTeam
    // (TeamsController provides POST /teams/addToTeam/{userId}/{inviteCode})
    throw err;
  }
}

export async function addUserToTeamByInvite(userId: number | string, inviteCode: string) {
  const response = await api.post(`${API_URL}/addToTeam/${userId}/${inviteCode}`);
  return response.data;
}

export async function removeUserFromTeam(teamId: number | string, userId: number | string) {
  const response = await api.delete(`${API_URL}/${teamId}/users/${userId}`);
  return response.data;
}
