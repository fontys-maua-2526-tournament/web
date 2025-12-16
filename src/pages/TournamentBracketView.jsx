// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getTournamentById } from '../services/tournament-service';
// import { getAllMatches } from '../services/match-service';
// import { getTeamById } from '../services/team-service';
// import { SingleEliminationBracket, SVGViewer } from '@g-loot/react-tournament-brackets';

// function TournamentBracketView() {
//   const { id } = useParams();
//   const [tournament, setTournament] = useState(null);
//   const [allMatches, setAllMatches] = useState([]);
//   const [tournamentMatches, setTournamentMatches] = useState([]);
//   const [teams, setTeams] = useState([]);
//   const [bracketData, setBracketData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [tournamentData, matchesData] = await Promise.all([
//           getTournamentById(id),
//           getAllMatches(),
//         ]);
//         setTournament(tournamentData.tournament);
//         setAllMatches(matchesData.matches || matchesData);
//       } catch (error) {
//         console.error('Failed to fetch data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [id]);

//   useEffect(() => {
//     if (tournament && allMatches.length) {
//       const filteredMatches = allMatches.filter(m => m.tournamentId == id);
//       setTournamentMatches(filteredMatches);
//     }
//   }, [tournament, allMatches, id]);

//   useEffect(() => {
//     if (tournamentMatches.length) {
//       const teamIds = new Set();
//       tournamentMatches.forEach(match => {
//         teamIds.add(match.team1Id);
//         teamIds.add(match.team2Id);
//       });
//       const fetchTeams = async () => {
//         try {
//           const teamsData = await Promise.all(Array.from(teamIds).map(id => getTeamById(id)));
//           setTeams(teamsData);
//         } catch (error) {
//           console.error('Failed to fetch teams:', error);
//         }
//       };
//       fetchTeams();
//     }
//   }, [tournamentMatches]);

//   useEffect(() => {
//     if (tournament && tournamentMatches.length && teams.length) {
//       const transformedMatches = transformMatches(tournamentMatches, teams);
//       setBracketData(transformedMatches);
//     }
//   }, [tournament, tournamentMatches, teams]);

//   const transformMatches = (tournamentMatches, teams) => {
//     const teamMap = teams.reduce((acc, team) => {
//       acc[team.id] = team.name;
//       return acc;
//     }, {});

//     return tournamentMatches.map(match => ({
//       id: match.id,
//       name: `Round ${match.round} - Match ${match.id}`,
//       nextMatchId: null, // Assuming no next match for simplicity
//       tournamentRoundText: `Round ${match.round}`,
//       startTime: '', // Not provided
//       state: match.status === 'COMPLETED' ? 'DONE' : 'SCHEDULED',
//       participants: [
//         {
//           id: match.team1Id,
//           name: teamMap[match.team1Id] || `Team ${match.team1Id}`,
//           resultText: match.team1Score !== null ? match.team1Score.toString() : '',
//           isWinner: match.team1Score > match.team2Score,
//           status: match.status === 'COMPLETED' ? 'PLAYED' : null,
//         },
//         {
//           id: match.team2Id,
//           name: teamMap[match.team2Id] || `Team ${match.team2Id}`,
//           resultText: match.team2Score !== null ? match.team2Score.toString() : '',
//           isWinner: match.team2Score > match.team1Score,
//           status: match.status === 'COMPLETED' ? 'PLAYED' : null,
//         },
//       ],
//     }));
//   };

//   if (loading) return <div>Loading...</div>;

//   if (!tournament) return <div>Tournament not found.</div>;

//   return (
//     <div className="p-5">
//       <h1 className="text-2xl font-bold mb-5">Bracket for {tournament.name}</h1>
//       {bracketData.length > 0 ? (
//         <SingleEliminationBracket
//           matches={bracketData}
//           matchComponent={({ match }) => (
//             <div className="bg-white border p-2 rounded shadow">
//               <div className="font-semibold">{match.name}</div>
//               {match.participants.map(participant => (
//                 <div key={participant.id} className={`p-1 ${participant.isWinner ? 'bg-green-200' : ''}`}>
//                   {participant.name}: {participant.resultText}
//                 </div>
//               ))}
//             </div>
//           )}
//           svgWrapper={({ children, ...props }) => (
//             <SVGViewer width={800} height={600} {...props}>
//               {children}
//             </SVGViewer>
//           )}
//         />
//       ) : (
//         <div>No matches found for this tournament.</div>
//       )}
//     </div>
//   );
// }

// export default TournamentBracketView;