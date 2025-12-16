import CustomButton from '../components/customButton';
import CustomTextField from '../components/customTextField';
import CustomModal from '../components/customModal';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllTournaments } from '../services/tournament-service';
import { useUser } from '../app/hooks/use-user';

export default function Home() {
  // const [textExample, setTextExample] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [tournaments, setTournaments] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const userCtx = useUser();
  const role = userCtx?.role;

  useEffect(() => {
    let mounted = true;
    async function fetch() {
      setLoading(true);
      try {
        const data = await getAllTournaments();
        const list = Array.isArray(data) ? data : data.tournaments || data;
        if (!mounted) return;
        const sorted = (list || [])
          .slice()
          .sort(
            (a, b) => new Date(b.startTime || b.start_time) - new Date(a.startTime || a.start_time),
          );
        setTournaments(sorted.slice(0, 5));
      } catch (err) {
        console.error('Failed to load tournaments', err);
        setTournaments([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetch();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-black">Welcome to Mauá-Fontyss Tournaments</h1>
            <p className="mt-2 text-gray-600">
              Find and join tournaments near you — quick and easy.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/tournaments" className="rounded-lg bg-white px-4 py-2 text-gray-800 shadow">
              View All
            </Link>
            {!token ? (
              <CustomButton onClick={() => navigate('/login')}>Sign-in</CustomButton>
            ) : (
              <CustomButton onClick={() => navigate('/profile')}>Profile</CustomButton>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto mt-8 max-w-6xl">
        <section className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Latest Tournaments</h2>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search tournaments..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="rounded-lg border border-gray-300 p-2"
              />
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="col-span-full p-8 text-center text-gray-500">
                Loading latest tournaments...
              </div>
            ) : (
              tournaments
                .filter(t =>
                  search ? (t.name || '').toLowerCase().includes(search.toLowerCase()) : true,
                )
                .map(t => (
                  <Link
                    to={`/tournaments/${t.id}`}
                    key={t.id}
                    className="rounded-lg bg-white p-4 shadow duration-150 hover:shadow-lg"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="text-lg font-bold text-gray-900">{t.name}</div>
                      <div className="text-sm text-gray-600">{t.status}</div>
                    </div>
                    <div className="text-sm text-gray-600">{t.address}</div>
                    <div className="mt-2 text-xs text-gray-400">
                      {new Date(t.startTime || t.start_time).toLocaleString()}
                    </div>
                  </Link>
                ))
            )}
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
            <p className="mt-2 text-gray-600">Useful actions for your account.</p>
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex gap-3">
                <CustomButton onClick={() => navigate('/tournaments')}>
                  Browse Tournaments
                </CustomButton>
              </div>
              {role === 'ORGANIZER' && (
                <div className="flex gap-3">
                  <CustomButton onClick={() => navigate('/teams')}>My Teams</CustomButton>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="text-lg font-semibold">Tips & Info</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-600">
              <li>Organizers can create tournaments, teams and matches</li>
              <li>Coaches can add athletes to teams and register them to tournaments.</li>
              <li>Athletes can view tournaments, their teams and their matches easily.</li>
            </ul>
          </div>
        </section>

        {/* <section className="mt-8">
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-4 text-lg font-semibold">Developer Examples</h3>
            <div className="flex flex-col items-center gap-6">
              <h4 className="text-2xl font-bold text-black duration-300 hover:-translate-y-1.5 hover:scale-110 hover:cursor-pointer">
                This is the home screen with Tailwind CSS!
              </h4>
              <CustomTextField
                id="example"
                name="example"
                label="Example Input blocked"
                value="this one is blocked"
                onChange={() => {}}
                blocked={true}
                placeholder="Type something..."
                className="max-w-md"
                showCopy
              />
              <CustomTextField
                id="example2"
                name="example2"
                label="Example editable with copy"
                value={textExample}
                onChange={e => setTextExample(e.target.value)}
                placeholder="Type something..."
                className="max-w-md"
                showCopy
              />
              <CustomTextField
                id="example3"
                name="example3"
                label="Example wrongly looks unblocked"
                value="this one is blocked but looks unblocked"
                onChange={() => {}}
                placeholder="Type something..."
                className="max-w-md"
              />
              <CustomButton onClick={() => setModalOpen(true)} children="Click Me" />
            </div>
          </div>
        </section> */}

        <CustomModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="My Modal">
          <p>This is the content of the modal!</p>
        </CustomModal>
      </main>
    </div>
  );
}
