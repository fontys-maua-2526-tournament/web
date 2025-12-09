const API_URL = "http://localhost:8080/tournaments";//should change the port if incorrect

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

export async function getTournamentById(id: number) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Error retrieving tournament");
  return await res.json();
}

export async function cancelTournament(id: number) {
  const res = await fetch(`${API_URL}/cancel/${id}`, { method: "PUT" });
  if (!res.ok) throw new Error("Error canceling tournament");
  return await res.json();
}
