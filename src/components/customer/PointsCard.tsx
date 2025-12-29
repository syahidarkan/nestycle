import React from 'react';
import { SparklesIcon, TrophyIcon } from '@heroicons/react/24/solid';
import { formatNumber } from '../../utils/formatting';

interface PointsCardProps {
  points: number;
  className?: string;
}

const PointsCard: React.FC<PointsCardProps> = ({ points, className = '' }) => {
  const getPointsLevel = (points: number) => {
    if (points >= 200) return { level: 'Platinum', color: 'purple', icon: TrophyIcon };
    if (points >= 100) return { level: 'Gold', color: 'yellow', icon: TrophyIcon };
    if (points >= 50) return { level: 'Silver', color: 'gray', icon: SparklesIcon };
    return { level: 'Bronze', color: 'orange', icon: SparklesIcon };
  };

  const levelInfo = getPointsLevel(points);
  const LevelIcon = levelInfo.icon;

  return (
    <div className={`bg-primary rounded-lg shadow-card ${className}`}>
      {/* Content */}
      <div className="px-6 py-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-primary-100 text-sm font-medium mb-1">Saldo Poin Anda</p>
            <div className="flex items-baseline space-x-2">
              <h2 className="text-4xl font-bold text-white">{formatNumber(points)}</h2>
              <span className="text-primary-100 text-lg">pts</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <SparklesIcon className="w-7 h-7 text-white" />
          </div>
        </div>

        {/* Level Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
          <LevelIcon className="w-5 h-5 text-white" />
          <span className="text-white font-semibold text-sm">Member {levelInfo.level}</span>
        </div>

        {/* Progress to next level */}
        {points < 200 && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-primary-100 mb-1.5">
              <span>Progres ke level selanjutnya</span>
              <span>
                {points < 50 && `${50 - points} pts ke Silver`}
                {points >= 50 && points < 100 && `${100 - points} pts ke Gold`}
                {points >= 100 && points < 200 && `${200 - points} pts ke Platinum`}
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{
                  width: `${
                    points < 50
                      ? (points / 50) * 100
                      : points < 100
                      ? ((points - 50) / 50) * 100
                      : ((points - 100) / 100) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PointsCard;
