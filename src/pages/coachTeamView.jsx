import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { LucidePlusCircle } from 'lucide-react';

export default function CoachTeamView(){

    const [teams, setTeams] = useState([]);
    
     

    return(
        <div className="flex flex-col flex-1 p-8 ml-20"> 
            <div className="flex items-center gap-4 mb-8">
                <h1 className="text-black text-4xl font-bold duration-300 hover:-translate-y-1.5 hover:scale-101">
                    My Teams
                </h1>
                <Link to={`/teams/new`}>
                    <LucidePlusCircle className='text-purple-600 hover:text-fontyssPurple transition-colors'/>
                </Link>
            </div>
            <div>
                
            </div>
        </div>
    )
}