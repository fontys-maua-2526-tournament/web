import React, { createContext, useEffect, useState, ReactNode } from "react";
import {getAllTournaments, createTournament, deleteTournament} from "../../services/tournament-service";

export interface Tournament {
  id: number;
  name: string;
  address: string;
  start_time?: string;
  end_time?: string;
}

interface TournamentContextType {
  tournaments: Tournament[];
  addTournament: (tournament: Omit<Tournament, "id">) => Promise<void>;
  removeTournament: (id: number) => Promise<void>;
}

export const TournamentContext = createContext<TournamentContextType | null>(
  null
);

interface TournamentProviderProps {
  children: ReactNode;
}

export function TournamentProvider({ children }: TournamentProviderProps) {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  async function loadTournaments() {
    const data = await getAllTournaments();
    setTournaments(data);
  }

  async function addTournament(tournament: Omit<Tournament, "id">) {
    const newTournament = await createTournament(tournament);
    setTournaments((prev: Tournament[]) => [...prev, newTournament]);
  }

  async function removeTournament(id: number) {
    await deleteTournament(id);
    setTournaments((prev: Tournament[]) =>
      prev.filter((t: Tournament) => t.id !== id)
    );
  }

  useEffect(() => {
    loadTournaments();
  }, []);

  return (
    <TournamentContext.Provider
      value={{ tournaments, addTournament, removeTournament }}
    >
      {children}
    </TournamentContext.Provider>
  );
}
