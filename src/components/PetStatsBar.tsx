import React from 'react';
import { PetStats, PetMood } from '../types/game';

interface PetStatsBarProps {
  stats: PetStats;
  mood: PetMood;
}

export const PetStatsBar: React.FC<PetStatsBarProps> = ({ stats, mood }) => {
  const getMoodBadge = (m: PetMood) => {
    switch (m) {
      case 'happy':
        return { label: 'Joyous', color: 'bg-[#788C68] text-white' };
      case 'suspicious':
        return { label: 'Suspicious', color: 'bg-[#E9D99A] text-[#292C26]' };
      case 'dramatic':
        return { label: 'Dramatic', color: 'bg-[#D97B48] text-white' };
      case 'sleepy':
        return { label: 'Sleepy', color: 'bg-[#77614D] text-white' };
      case 'angry':
        return { label: 'Outraged', color: 'bg-[#A83232] text-white' };
    }
  };

  const moodInfo = getMoodBadge(mood);

  // Meter helper with 10 pixel segments
  const renderPixelMeter = (value: number, fillColor: string) => {
    const segments = 10;
    const filledSegments = Math.round(Math.min(100, Math.max(0, value)) / 10);

    return (
      <div className="flex items-center gap-[2px] bg-[#292C26] p-[2px] border border-[#292C26]">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-3 transition-colors ${
              i < filledSegments ? fillColor : 'bg-[#3D4039]'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[#FAF6EE] border-2 border-[#292C26] px-3 py-2 shadow-[2px_2px_0px_#292C26] flex flex-wrap items-center justify-between gap-3 text-xs">
      {/* Mood Badge */}
      <div className="flex items-center gap-2">
        <span className="font-pixel text-[10px] text-[#77614D] uppercase">Mood</span>
        <span className={`font-pixel text-[10px] px-2 py-0.5 border border-[#292C26] ${moodInfo.color}`}>
          {moodInfo.label}
        </span>
      </div>

      {/* 4 Core Stats */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Happiness */}
        <div className="flex items-center gap-1.5" title={`Happiness: ${stats.happiness}%`}>
          <span className="font-pixel text-[10px] text-[#292C26]">Joy</span>
          {renderPixelMeter(stats.happiness, 'bg-[#788C68]')}
          <span className="font-pixel text-[10px] w-6 text-right tabular-nums">{stats.happiness}</span>
        </div>

        {/* Energy */}
        <div className="flex items-center gap-1.5" title={`Energy: ${stats.energy}%`}>
          <span className="font-pixel text-[10px] text-[#292C26]">Zzz</span>
          {renderPixelMeter(stats.energy, 'bg-[#E9D99A]')}
          <span className="font-pixel text-[10px] w-6 text-right tabular-nums">{stats.energy}</span>
        </div>

        {/* Trust */}
        <div className="flex items-center gap-1.5" title={`Trust: ${stats.trust}%`}>
          <span className="font-pixel text-[10px] text-[#292C26]">Trust</span>
          {renderPixelMeter(stats.trust, 'bg-[#557A95]')}
          <span className="font-pixel text-[10px] w-6 text-right tabular-nums">{stats.trust}</span>
        </div>

        {/* Drama */}
        <div className="flex items-center gap-1.5" title={`Drama: ${stats.drama}%`}>
          <span className="font-pixel text-[10px] text-[#292C26]">Drama</span>
          {renderPixelMeter(stats.drama, 'bg-[#D97B48]')}
          <span className="font-pixel text-[10px] w-6 text-right tabular-nums">{stats.drama}</span>
        </div>
      </div>
    </div>
  );
};
