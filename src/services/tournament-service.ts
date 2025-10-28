const API_URL = "http://localhost:8080/api/tournaments";//should change the port if incorrect

export async function getAllTournaments() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error retrieving tournaments");
  return await res.json();
}

export async function createTournament(tournament: {
  name: string;
  address: string;
  start_time?: string;
  end_time?: string;
}) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tournament),
  });
  if (!res.ok) throw new Error("Error creating tournament");
  return await res.json();
}

export async function deleteTournament(id: number) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error deleting tournament");
}
