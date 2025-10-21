import Navbar from '../components/navbar';
import CustomButton from '../components/customButton';
import CustomTextField from '../components/customTextField';
import { useEffect, useState } from 'react';
import axios from 'axios';

const teamViewer = () => {
    const [teams, setTeams] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeams = async () => {
            setLoading(true)
            const options = {method: 'GET', url: `https://localhost:/team`};

            try {
                const { data } = await axios.request(options);
                console.log(data);
                setTeams(data);
            } catch (error) {
                console.error('Failed to fetch player:', error);
                setPlayer(null);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    });


    return (
        <div>
            <table>
                <th>
                    <td>team Id</td>
                    <td>Team Name</td>
                </th>
                {data.teams.forEach(team => {
                   <tr>
                    <td>
                        {team.id}
                    </td>
                    <td>
                        {team.name}
                    </td>
                   </tr> 
                })}
            </table>
        </div>
    );
};

export default teamViewer;