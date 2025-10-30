import Navbar from '../components/navbar';
import CustomButton from '../components/customButton';
import CustomTextField from '../components/customTextField';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TeamViewer = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeams = async () => {
            setLoading(true)
            const options = {method: 'GET', url: `http://localhost:8080/teams`};

            try {
                const { data } = await axios.request(options);
                console.log(data);
                setTeams(data.teams);
            } catch (error) {
                console.error('Failed to fetch teams:', error);
                setTeams(null);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
        //Pull the data again every minute
        const Interval = setInterval(fetchTeams, 60000);
        //prevent memory leakage
        return () => clearInterval(Interval);

    }, []);


    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>team Id</th>
                        <th>Team Name</th>
                    </tr>
                </tbody>
                {teams.map(team => (
                   <tbody>
                        <tr>
                            <td>
                                {team.id}
                            </td>
                            <td>
                                {team.name}
                            </td>
                        </tr>
                   </tbody> 
                ))}
            </table>
        </div>
    );
};

export default TeamViewer;