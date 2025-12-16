import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getTeamById,
  getAllTeams,
  getTeamMembers,
  removeUserFromTeam,
  deleteTeam,
  updateTeam,
} from '../services/team-service';
import { LucidePlusCircle, LucideTrash2, PenLine } from 'lucide-react';
import CustomButton from '../components/customButton';
import CustomModal from '../components/customModal';
import CustomTextField from '../components/customTextField';
import AddUserToTeam from './addUserToTeam';
import { toast } from 'react-toastify';

const TeamDetail = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [selectedMemberToDelete, setSelectedMemberToDelete] = useState(null);
  const [deleteTeamModal, setDeleteTeamModal] = useState(false);
  const [deletingTeam, setDeletingTeam] = useState(false);
  const [editTeamModal, setEditTeamModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [editInvite, setEditInvite] = useState('');
  const [savingEdit, setSavingEdit] = useState(false);
  const openEditTeamModal = () => {
    setEditName(team?.name || '');
    setEditInvite(team?.inviteCode || '');
    setEditTeamModal(true);
  };

  const handleEditTeam = async e => {
    e.preventDefault();
    setSavingEdit(true);
    try {
      await updateTeam(Number(teamId), {
        id: Number(teamId),
        name: editName,
        inviteCode: editInvite,
      });
      toast.success('Team updated successfully');
      setEditTeamModal(false);
      fetchTeamDetails();
    } catch (error) {
      console.error('Failed to update team:', error);
      toast.error('Failed to update team');
    } finally {
      setSavingEdit(false);
    }
  };
  const navigate = useNavigate();
  const handleDeleteTeam = async () => {
    setDeletingTeam(true);
    try {
      await deleteTeam(teamId);
      toast.success('Team deleted successfully');
      setDeleteTeamModal(false);
      navigate('/teams');
    } catch (error) {
      console.error('Failed to delete team:', error);
      toast.error('Failed to delete team');
    } finally {
      setDeletingTeam(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const list = await getTeamMembers(teamId);
      setMembers(list);
    } catch (error) {
      console.error('Failed to fetch team members:', error);
      toast.error('Failed to fetch team members');
      setMembers([]);
    }
  };

  const fetchTeamDetails = async () => {
    setLoading(true);
    try {
      // Get team basic data from /teams/{teamId} if available
      try {
        const data = await getTeamById(teamId);
        // if API returns the team object directly
        if (data && data.id) {
          setTeam(data);
        } else if (data && Array.isArray(data.teams)) {
          // fallback if API returns list of teams
          const found = data.teams.find(t => t.id === parseInt(teamId));
          setTeam(found || null);
        } else {
          setTeam(null);
        }
      } catch (err) {
        // fallback to fetching all teams and finding by id
        console.log('Falling back to fetching all teams', err);
        const data = await getAllTeams();
        const foundTeam = data.teams
          ? data.teams.find(t => t.id === parseInt(teamId))
          : Array.isArray(data)
            ? data.find(t => t.id === parseInt(teamId))
            : null;
        setTeam(foundTeam || null);
      }

      // Now fetch members for the team (if any)
      await fetchMembers();
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

  const handleRemoveMemberClick = member => {
    setSelectedMemberToDelete(member);
    setConfirmDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // Try to make API request to remove the member from the team
      await removeUserFromTeam(teamId, selectedMemberToDelete?.id);
      // Refresh members
      await fetchMembers();
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
        <p
          className="animate-bounce text-[14rem] text-white transition-all duration-700"
          style={{ animationDelay: '300ms' }}
        >
          .
        </p>
        <p
          className="animate-bounce text-[14rem] text-white transition-all duration-700"
          style={{ animationDelay: '600ms' }}
        >
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
        <div className="flex gap-3">
          <CustomButton
            onClick={() => setModalOpen(true)}
            className="bg-fontyssPurple inline-flex items-center gap-2 rounded-xl px-4 py-2 text-white shadow transition-colors hover:bg-[#874c95]"
          >
            <LucidePlusCircle className="h-5 w-5" />
            Add Member
          </CustomButton>
          <CustomButton
            onClick={openEditTeamModal}
            middleSize={false}
            className="bg-mauaBlue hover:bg-fontyssPurple inline-flex items-center gap-2 rounded-xl px-4 py-2 text-white shadow transition-colors"
          >
            <PenLine className="h-5 w-5" />
          </CustomButton>
          <CustomButton
            onClick={() => setDeleteTeamModal(true)}
            middleSize={false}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-white shadow transition-colors hover:bg-red-700"
          >
            <LucideTrash2 className="h-5 w-5" />
            Delete Team
          </CustomButton>
        </div>
      </div>
      {/* Edit Team Modal */}
      <CustomModal
        isOpen={editTeamModal}
        title={'Edit Team'}
        onClose={() => setEditTeamModal(false)}
      >
        <form onSubmit={handleEditTeam} className="flex flex-col gap-4 px-4 py-2">
          <CustomTextField
            id="edit-team-name"
            label="Team Name"
            value={editName}
            onChange={e => setEditName(e.target.value)}
            required
          />
          <CustomTextField
            id="edit-team-invite"
            label="Invite Code"
            value={editInvite}
            onChange={e => setEditInvite(e.target.value)}
          />
          <div className="mt-4 flex gap-2">
            <CustomButton
              type="button"
              onClick={() => setEditTeamModal(false)}
              className="flex-1 rounded-lg bg-gray-400 px-3 py-1 text-xs text-white transition-colors hover:bg-gray-500"
            >
              Cancel
            </CustomButton>
            <CustomButton
              type="submit"
              className="bg-mauaBlue hover:bg-fontyssPurple flex-1 rounded-lg px-3 py-1 text-xs text-white transition-colors"
              disabled={savingEdit}
            >
              {savingEdit ? 'Saving...' : 'Save'}
            </CustomButton>
          </div>
        </form>
      </CustomModal>
      {/* Delete Team Modal */}
      <CustomModal
        isOpen={deleteTeamModal}
        title={'Delete Team'}
        onClose={() => setDeleteTeamModal(false)}
      >
        <div className="flex flex-col items-center justify-center gap-4 px-4">
          <p className="text-center text-sm text-gray-700">
            Are you sure you want to delete the team <strong>{team?.name}</strong>? This action
            cannot be undone.
          </p>
          <div className="flex w-full gap-2">
            <CustomButton
              onClick={() => setDeleteTeamModal(false)}
              className="flex-1 rounded-lg bg-gray-400 px-3 py-1 text-xs text-white transition-colors hover:bg-gray-500"
            >
              Cancel
            </CustomButton>
            <CustomButton
              onClick={handleDeleteTeam}
              className="flex-1 rounded-lg bg-red-600 px-3 py-1 text-xs text-white transition-colors hover:bg-red-700"
              disabled={deletingTeam}
            >
              {deletingTeam ? 'Deleting...' : 'Delete'}
            </CustomButton>
          </div>
        </div>
      </CustomModal>

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
      <CustomModal
        isOpen={modalOpen}
        title={'Add Member to Team'}
        onClose={() => setModalOpen(false)}
      >
        <AddUserToTeam
          teamId={teamId}
          inviteCode={team?.inviteCode}
          onClose={() => {
            setModalOpen(false);
            // Refresh members when a new member is added
            fetchMembers();
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
            Are you sure you want to remove{' '}
            <strong>
              {selectedMemberToDelete?.firstName} {selectedMemberToDelete?.lastName}
            </strong>{' '}
            from the team?
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
              className="bg-mauaBlue flex-1 rounded-lg px-3 py-1 text-xs text-white transition-colors hover:bg-blue-700"
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
