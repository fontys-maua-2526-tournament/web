import api from './api';

const API_URL = '/users';

export async function register(userData: { name: string; email: string; password: string }) {
  const response = await api.post(`${API_URL}/register`, userData);
  return response.data;
}

export async function registerWithDetails(userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: string;
  userRole: string;
}) {
  const response = await api.post('/auth/register', userData);
  return response.data;
}

export async function login(email: string, password: string) {
  const response = await api.post(`/auth/login`, { email, password });
  return response.data;
}

export async function getAllUsers() {
  const response = await api.get(API_URL);
  return Array.isArray(response.data) ? response.data : response.data.users || [];
}

export async function getUserProfile(id: number) {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
}

export async function updateProfile(id: number, userData: any) {
  const response = await api.put(`${API_URL}/${id}`, userData);
  return response.data;
}

export async function deleteUser(id: number) {
  const response = await api.delete(`${API_URL}/${id}`);
  return response.data;
}
