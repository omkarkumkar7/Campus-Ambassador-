import React, { useState, useEffect, useContext } from 'react';
import { Trophy, Star, Sparkles, ArrowLeft } from 'lucide-react';
import LeaderboardCard from '../components/LeaderboardCard';
import ParticleEffect from '../components/ParticleEffect';
import { AuthContext } from '../context/AuthContext';
import { fetchScoreboard } from '../api/data';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [error, setError] = useState(null);
  const [myRank, setMyRank] = useState(null);
  const [myPoints, setMyPoints] = useState(0);
  const [rawDebug, setRawDebug] = useState(null);

  const loadLeaderboard = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Check if user is logged in
      if (!token) {
        setError('Please sign in to view the leaderboard');
        setLeaderboardData([]);
        setIsLoading(false);
        return;
      }

      const data = await fetchScoreboard(token);
      setRawDebug(data);
      console.log('Leaderboard API response:', data);

      // Assume data is an array of objects { name, college, points, email, ... }
      const list = Array.isArray(data) ? data : (data.data || []);

      // Sort by points descending just in case, ensuring points are numbers
      // API returns 'score', so we use that. Fallback to 'points' if 'score' is missing.
      const sorted = list.sort((a, b) => (Number(b.score || b.points) || 0) - (Number(a.score || a.points) || 0));

      const formatted = sorted.map((item, index) => ({
        rank: index + 1,
        name: item.name,
        college: item.college,
        points: Number(item.score || item.points) || 0,
        email: item.email,
        isCurrentUser: user && (
          (item.email?.toLowerCase().trim() === user.email?.toLowerCase().trim()) ||
          // Check both snake_case (standard) and camelCase (API response) for SF ID
          ((item.sf_id || item.sfId) && (user.sf_id || user.sfid) && String(item.sf_id || item.sfId) === String(user.sf_id || user.sfid))
        )
      }));

      setLeaderboardData(formatted);

      if (user) {
        const myEntry = formatted.find(u => u.isCurrentUser);
        if (myEntry) {
          setMyRank(myEntry.rank);
          setMyPoints(myEntry.points);
        } else {
          // Fallback to user object data if available, or reset
          setMyRank(user.rank || null);
          setMyPoints(user.score || user.points || 0);
        }
      }

    } catch (e) {
      console.error('Leaderboard error:', e);
      setError('Unable to load leaderboard. Please try again later.');
      setLeaderboardData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLeaderboard();
  }, [token, user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParticleEffect />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-8 pb-16">

        <button
          onClick={() => navigate("/dashboard")}
          className="mb-8 flex items-center text-gray-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        {/* HEADER */}
        <div className="text-center mb-6">


          <h1 className="text-6xl font-extrabold text-yellow-400 mb-8">
            Leaderboard
          </h1>
        </div>

        {/* MAIN GRID */}
        {/* DEBUG: Remove later */}
        {/* <div className="text-xs text-gray-500 mb-2">DEBUG: Raw: {JSON.stringify(leaderboardData.length)} items.</div> */}

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT: LEADERBOARD */}
          <div className="lg:col-span-2 space-y-3">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                  <Trophy className="w-8 h-8 text-yellow-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="text-gray-400 mt-6 text-lg">Loading leaderboard...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="text-red-400 text-xl mb-4">⚠️ {error}</div>
                {error.includes('sign in') && (
                  <a
                    href="/signin"
                    className="mt-4 px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-lg font-semibold hover:scale-105 transition-transform"
                  >
                    Sign In Now
                  </a>
                )}
              </div>
            ) : leaderboardData.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Trophy className="w-16 h-16 text-gray-500 mb-4" />
                <p className="text-gray-400 text-lg">No leaderboard data available yet</p>
              </div>
            ) : (
              <>
                <LeaderboardCard
                  isHeader
                  rank="Rank"
                  name="Name"
                  college="College"
                  points="Points"
                />

                {leaderboardData.map((leader) => (
                  <LeaderboardCard
                    key={leader.rank}
                    rank={leader.rank}
                    name={leader.name}
                    college={leader.college}
                    points={leader.points}
                  />
                ))}
              </>
            )}
          </div>

          {/* RIGHT: YOUR RANK */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-purple-900/40 border border-purple-500/40 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-2">Your Current Rank</h3>
              <p className="text-gray-300 mb-6">Keep pushing 🚀</p>

              <p className="text-6xl font-extrabold text-purple-400 mb-2">
                {myRank ? `#${myRank}` : '—'}
              </p>

              <div className="flex justify-center items-center gap-2 text-lg">
                <span>{myPoints} points</span>
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Leaderboard;