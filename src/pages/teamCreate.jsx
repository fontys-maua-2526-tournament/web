import Navbar from '../components/navbar';
import CustomButton from '../components/customButton';
import CustomTextField from '../components/customTextField';
import { useEffect, useState } from 'react';
import axios from 'axios';

const teamViewer = () => {
    const [newTeam, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const createTeam = async () => {
            setLoading(true)
            const options = {
                method: 'POST', 
                url: `http://localhost:8080/teams`,
                data: {
                    id: 0,
                    name: newTeam
                }
            };

            try {
                const { data } = await axios.request(options);
                console.log(data);
            } catch (error) {
                console.error('Failed to create team:', error);
                setTeam(null);
            } finally {
                setLoading(false);
            }
        };

    });


    return (
        <div>

        </div>
    );
};

export default teamViewer;