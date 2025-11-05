const API_URL = "http://localhost:8080/api/teams"; //should change the port if incorrect

export async function getAllTeams() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error fetching teams");
  return await res.json();
}

export async function createTeam(team: { name: string }) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(team),
  });
  if (!res.ok) throw new Error("Error creating team");
  return await res.json();
}

export async function deleteTeam(id: number) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error deleting team");
}
