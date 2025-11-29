import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LucidePlusCircle, LucideTrash2 } from 'lucide-react';
import CustomButton from '../components/customButton';
import CustomModal from '../components/customModal';
import AddUserToTeam from './addUserToTeam';
import { toast } from 'react-toastify';

// Mock data para membros (será substituído pela API depois)
const mockMembersByTeamId = {
  1: [
    { id: 1, firstName: 'João', lastName: 'Silva', email: 'joao@example.com' },
    { id: 2, firstName: 'Maria', lastName: 'Santos', email: 'maria@example.com' },
    { id: 3, firstName: 'Pedro', lastName: 'Oliveira', email: 'pedro@example.com' },
  ],
  2: [
    { id: 4, firstName: 'Ana', lastName: 'Costa', email: 'ana@example.com' },
    { id: 5, firstName: 'Carlos', lastName: 'Ferreira', email: 'carlos@example.com' },
  ],
  3: [
    { id: 6, firstName: 'Lucas', lastName: 'Martins', email: 'lucas@example.com' },
  ],
};

const TeamDetail = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [selectedMemberToDelete, setSelectedMemberToDelete] = useState(null);

  const fetchTeamDetails = async () => {
    setLoading(true);
    try {
      // Buscar dados reais do time da API
      const { data } = await axios.get(`http://localhost:8080/teams`);
      const foundTeam = data.teams.find(t => t.id === parseInt(teamId));
      
      if (!foundTeam) {
        toast.error('Team not found');
        return;
      }
      
      setTeam(foundTeam);
      
      // Usar dados mockados para membros por enquanto
      const mockMembers = mockMembersByTeamId[parseInt(teamId)] || [];
      setMembers(mockMembers);
    } catch (error) {
      console.error('Failed to fetch team details:', error);
      toast.error('Failed to fetch team details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamDetails();
  }, [teamId]);

  const handleRemoveMemberClick = (member) => {
    setSelectedMemberToDelete(member);
    setConfirmDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // Mock: Remover membro localmente
      const updatedMembers = members.filter(member => member.id !== selectedMemberToDelete.id);
      setMembers(updatedMembers);
      toast.success('Member removed from team');
      setConfirmDeleteModal(false);
      setSelectedMemberToDelete(null);
    } catch (error) {
      console.error('Failed to remove member:', error);
      toast.error('Failed to remove member');
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex h-screen w-screen items-center justify-center gap-10 bg-[rgba(0,0,0,0.5)]">
        <p className="animate-bounce text-[14rem] text-white transition-all duration-700">.</p>
        <p className="animate-bounce text-[14rem] text-white transition-all duration-700" style={{ animationDelay: '300ms' }}>
          .
        </p>
        <p className="animate-bounce text-[14rem] text-white transition-all duration-700" style={{ animationDelay: '600ms' }}>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="m-10 flex flex-1 flex-col p-8">
      {/* Title */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-900">{team?.name || 'Team'}</h1>

        <CustomButton
          onClick={() => setModalOpen(true)}
          className="bg-fontyssPurple inline-flex items-center gap-2 rounded-xl px-4 py-2 text-white shadow transition-colors hover:bg-[#874c95]"
        >
          <LucidePlusCircle className="h-5 w-5" />
          Add Member
        </CustomButton>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {members.map(member => (
          <div
            key={member.id}
            className="flex h-20 items-center overflow-hidden rounded-xl bg-[#BDADC0] shadow-md transition-all duration-200 hover:bg-[#9A8FA0] hover:shadow-xl"
          >
            <div className="bg-fontyssPurple h-full w-6" />

            <div className="flex flex-1 items-center justify-between px-6">
              <div>
                <span className="text-lg font-semibold text-black">
                  {member.firstName} {member.lastName}
                </span>
                <p className="text-sm text-gray-700">{member.email}</p>
              </div>
              <button
                onClick={() => handleRemoveMemberClick(member)}
                className="text-black transition-colors hover:text-gray-700"
                title="Remove member"
              >
                <LucideTrash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {members.length === 0 && (
        <div className="text-center text-gray-500">
          <p>No members in this team yet</p>
        </div>
      )}

      {/* Add Member Modal */}
      <CustomModal isOpen={modalOpen} title={'Add Member to Team'} onClose={() => setModalOpen(false)}>
        <AddUserToTeam
          teamId={teamId}
          inviteCode={team?.inviteCode}
          onClose={() => {
            setModalOpen(false);
            toast.success('Member added successfully');
          }}
        />
      </CustomModal>

      {/* Confirm Delete Modal */}
      <CustomModal 
        isOpen={confirmDeleteModal} 
        title={'Confirm Delete'} 
        onClose={() => {
          setConfirmDeleteModal(false);
          setSelectedMemberToDelete(null);
        }}
      >
        <div className="flex flex-col items-center justify-center gap-4 px-4">
          <p className="text-center text-sm text-gray-700">
            Are you sure you want to remove <strong>{selectedMemberToDelete?.firstName} {selectedMemberToDelete?.lastName}</strong> from the team?
          </p>
          <div className="flex w-full gap-2">
            <CustomButton
              onClick={() => {
                setConfirmDeleteModal(false);
                setSelectedMemberToDelete(null);
              }}
              className="flex-1 rounded-lg bg-gray-400 px-3 py-1 text-xs text-white transition-colors hover:bg-gray-500"
            >
              Cancel
            </CustomButton>
            <CustomButton
              onClick={handleConfirmDelete}
              className="flex-1 rounded-lg bg-mauaBlue px-3 py-1 text-xs text-white transition-colors hover:bg-blue-700"
            >
              Delete
            </CustomButton>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default TeamDetail;
