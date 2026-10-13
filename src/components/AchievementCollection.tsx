import React from 'react';
import { Achievement } from '../types/game';
import { sound } from '../utils/audio';

interface AchievementCollectionProps {
  achievements: Achievement[];
}

export const AchievementCollection: React.FC<AchievementCollectionProps> = ({
  achievements
}) => {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const percentage = Math.round((unlockedCount / achievements.length) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-[#FAF6EE] border-2 border-[#292C26] p-4 flex flex-wrap items-center justify-between gap-4 shadow-[2px_2px_0px_#292C26]">
        <div>
          <h2 className="font-pixel text-base text-[#292C26]">
            Court Badges & Judicial Honors
          </h2>
          <p className="text-xs text-[#77614D] mt-0.5">
            {unlockedCount} of {achievements.length} badges unlocked ({percentage}%)
          </p>
        </div>

        {/* Retro Progress Pill */}
        <div className="flex items-center gap-2">
          <div className="w-32 h-4 bg-[#292C26] border border-[#292C26] p-[2px]">
            <div
              style={{ width: `${percentage}%` }}
              className="h-full bg-[#E9D99A] transition-all duration-300"
            />
          </div>
          <span className="font-pixel text-xs text-[#292C26] tabular-nums">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {achievements.map((ach) => {
          return (
            <div
              key={ach.id}
              onClick={() => {
                if (ach.unlocked) sound.playFanfare();
                else sound.playClick();
              }}
              className={`p-4 border-2 border-[#292C26] transition-all flex flex-col justify-between ${
                ach.unlocked
                  ? 'bg-[#FFFDF9] shadow-[3px_3px_0px_#292C26] hover:-translate-y-0.5 cursor-pointer'
                  : 'bg-[#EAE4D7] opacity-65 cursor-default'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-12 h-12 border-2 border-[#292C26] flex items-center justify-center text-2xl ${
                      ach.unlocked ? 'bg-[#E9D99A]' : 'bg-[#D6CEBF]'
                    }`}
                  >
                    {ach.unlocked ? ach.icon : '🔒'}
                  </div>

                  <span
                    className={`font-pixel text-[9px] px-1.5 py-0.5 border ${
                      ach.unlocked
                        ? 'bg-[#788C68] text-white border-[#292C26]'
                        : 'bg-[#77614D] text-[#FAF6EE] border-[#77614D]'
                    }`}
                  >
                    {ach.unlocked ? 'UNLOCKED' : 'LOCKED'}
                  </span>
                </div>

                <h3 className="font-pixel text-xs text-[#292C26] mb-1.5 leading-snug">
                  {ach.title}
                </h3>
                <p className="text-[11px] text-[#77614D] leading-relaxed">
                  {ach.description}
                </p>
              </div>

              {ach.unlocked && ach.unlockedAt && (
                <div className="pt-3 mt-3 border-t border-[#77614D]/20 text-[10px] font-pixel text-[#788C68]">
                  Earned {ach.unlockedAt}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
