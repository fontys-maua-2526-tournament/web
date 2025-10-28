import { useContext } from "react";
import { TournamentContext } from "../context/tournament-context";

export function useTournament() {
  const context = useContext(TournamentContext);
  if (!context)
    throw new Error("useTournament should be used with <TournamentProvider>");
  return context;
}
