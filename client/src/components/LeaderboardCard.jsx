import React from 'react';
import { Trophy, Medal, Award, Sparkles } from 'lucide-react';

const LeaderboardCard = ({ rank, name, college, points, isHeader = false }) => {
  const getRankIcon = () => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />;
    return <span className="text-lg font-semibold">{rank}</span>;
  };

 
  let rowStyle = "bg-slate-800/50 border-slate-700/50 hover:border-cyan-500/50";
  
  if (isHeader) {
    rowStyle = "bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-500";
  } else if (rank === 1) {
    rowStyle = "bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-500/30 hover:border-yellow-500/50";
  } else if (rank === 2) {
    rowStyle = "bg-gradient-to-r from-gray-400/10 to-gray-500/10 border-gray-400/30 hover:border-gray-400/50";
  } else if (rank === 3) {
    rowStyle = "bg-gradient-to-r from-amber-600/10 to-amber-700/10 border-amber-600/30 hover:border-amber-600/50";
  }

  return (
    <div className={`grid grid-cols-12 gap-4 p-4 rounded-lg border-2 transition-all ${rowStyle}`}>
      <div className="col-span-2 flex items-center justify-center">
        {isHeader ? (
          <span className="font-bold text-white">Rank</span>
        ) : (
          getRankIcon()
        )}
      </div>

    
      <div className="col-span-3 flex items-center">
        {isHeader ? (
          <span className="font-bold text-white">Name</span>
        ) : (
          <span className="text-white font-medium">{name}</span>
        )}
      </div>

      {/* College - 5 cols */}
      <div className="col-span-5 flex items-center">
        {isHeader ? (
          <span className="font-bold text-white">College</span>
        ) : (
          <span className="text-slate-300">{college}</span>
        )}
      </div>

      {/* Points - 2 cols */}
      <div className="col-span-2 flex items-center justify-end gap-2">
        {isHeader ? (
          <span className="font-bold text-white">Points</span>
        ) : (
          <>
            <span className="text-white font-bold">{points}</span>
            {rank <= 3 && <Sparkles className="w-4 h-4 text-yellow-400" />}
          </>
        )}
      </div>
    </div>
  );
};

export default LeaderboardCard;