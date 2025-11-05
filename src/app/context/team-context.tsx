import React, { createContext, useEffect, useState, ReactNode } from "react";
import { getAllTeams, createTeam, deleteTeam } from "../../services/team-service";

export interface Team {
  id: number;
  name: string;
}

interface TeamContextType {
  teams: Team[];
  addTeam: (team: Omit<Team, "id">) => Promise<void>;
  removeTeam: (id: number) => Promise<void>;
}

export const TeamContext = createContext<TeamContextType | null>(null);

interface TeamProviderProps {
  children: ReactNode;
}

export function TeamProvider({ children }: TeamProviderProps) {
  const [teams, setTeams] = useState<Team[]>([]);

  async function loadTeams() {
    const data = await getAllTeams();
    setTeams(data);
  }

  async function addTeam(team: Omit<Team, "id">) {
    const newTeam = await createTeam(team);
    setTeams((prev: Team[]) => [...prev, newTeam]);
  }

  async function removeTeam(id: number) {
    await deleteTeam(id);
    setTeams((prev: Team[]) => prev.filter((t: Team) => t.id !== id));
  }

  useEffect(() => {
    loadTeams();
  }, []);

  return (
    <TeamContext.Provider value={{ teams, addTeam, removeTeam }}>
      {children}
    </TeamContext.Provider>
  );
}
