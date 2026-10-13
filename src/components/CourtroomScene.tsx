import React, { useState, useEffect } from 'react';
import { PetProfile, TrialCase, CompletedCaseRecord } from '../types/game';
import { PetSprite } from './PetSprite';
import { getRandomDialogue } from '../data/dialogue';
import { sound } from '../utils/audio';

interface CourtroomSceneProps {
  pet: PetProfile;
  playerName: string;
  nextCase: TrialCase | null;
  completedCases: CompletedCaseRecord[];
  totalCasesCount: number;
  onStartTrial: () => void;
  onOpenPetRoom: () => void;
  onOpenAccusations: () => void;
  onOpenEnding: () => void;
  onPetClick: () => void;
}

export const CourtroomScene: React.FC<CourtroomSceneProps> = ({
  pet,
  playerName,
  nextCase,
  completedCases,
  totalCasesCount,
  onStartTrial,
  onOpenPetRoom,
  onOpenAccusations,
  onOpenEnding,
  onPetClick
}) => {
  const [speechText, setSpeechText] = useState('');
  const [heartPuffs, setHeartPuffs] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    // Generate initial dialogue
    setSpeechText(getRandomDialogue(pet.species, pet.mood));
  }, [pet.species, pet.mood]);

  const handleJudgeClick = (e: React.MouseEvent) => {
    sound.playPetSound(pet.species, pet.mood);
    onPetClick();

    // Spawn cute heart/star particle
    const rect = e.currentTarget.getBoundingClientRect();
    const newPuff = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    setHeartPuffs((prev) => [...prev, newPuff]);
    setTimeout(() => {
      setHeartPuffs((prev) => prev.filter((p) => p.id !== newPuff.id));
    }, 1000);

    // Refresh random quote
    setSpeechText(getRandomDialogue(pet.species, pet.mood, 'click'));
  };

  const isAllCasesFinished = completedCases.length >= totalCasesCount;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Courtroom Banner / Stage */}
      <div className="pixel-box p-6 sm:p-8 relative overflow-hidden bg-[#FAF6EE]">
        {/* Decorative Courtroom Wall Details */}
        <div className="absolute top-2 left-4 text-xs font-pixel text-[#77614D]/40 select-none">
          THE SUPREME FRIENDSHIP TRIBUNAL · EST. 2026
        </div>

        {/* Scales of Justice in Corner */}
        <div className="absolute top-3 right-4 text-xl opacity-75 select-none" title="Scales of Friendship Equity">
          ⚖️
        </div>

        {/* Central Stage: The Bench & The Pet Judge */}
        <div className="flex flex-col items-center justify-center pt-6 pb-4 relative">
          {/* Speech Bubble */}
          <div className="max-w-md w-full bg-[#FFFDF9] border-2 border-[#292C26] p-3 mb-4 shadow-[3px_3px_0px_#292C26] relative text-center">
            <span className="font-pixel text-[10px] text-[#788C68] uppercase tracking-wider block mb-1">
              {pet.name} says:
            </span>
            <p className="text-xs sm:text-sm text-[#292C26] italic font-medium leading-relaxed">
              "{speechText}"
            </p>
            {/* Bubble Tail */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FFFDF9] border-r-2 border-b-2 border-[#292C26] rotate-45" />
          </div>

          {/* Interactive Pet Judge on Bench */}
          <div className="relative group cursor-pointer" onClick={handleJudgeClick}>
            <PetSprite
              species={pet.species}
              mood={pet.mood}
              size="xl"
              equipped={pet.equippedAccessories}
              isClickable={true}
            />

            {/* Floating Heart Puffs when clicked */}
            {heartPuffs.map((p) => (
              <span
                key={p.id}
                style={{ left: p.x, top: p.y }}
                className="absolute pointer-events-none text-base animate-ping"
              >
                💛
              </span>
            ))}
          </div>

          {/* Handcrafted Wooden Bench Artwork */}
          <div className="w-full max-w-lg bg-[#664C35] border-3 border-[#292C26] rounded-t-sm shadow-[0_4px_0_#292C26] p-3 mt-[-8px] flex items-center justify-between text-xs text-[#E9D99A]">
            <div className="flex items-center gap-2">
              <span className="text-sm">🔨</span>
              <span className="font-pixel text-[10px] text-[#FAF6EE] hidden sm:inline">
                Bench of Equity
              </span>
            </div>

            <div className="font-pixel text-[11px] text-[#FAF6EE]">
              {pet.name} · {pet.title}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm">📚</span>
              <span className="font-pixel text-[10px] text-[#FAF6EE] hidden sm:inline">
                Lex Amicitiae
              </span>
            </div>
          </div>
        </div>

        {/* Trial Progress Bar */}
        <div className="mt-4 pt-4 border-t border-[#77614D]/30 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[10px] text-[#77614D] uppercase">
              Trial Progression:
            </span>
            <span className="font-pixel text-[11px] text-[#292C26]">
              {completedCases.length} of {totalCasesCount} Cases Completed
            </span>
          </div>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalCasesCount }).map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 border border-[#292C26] flex items-center justify-center text-[9px] font-pixel ${
                  i < completedCases.length
                    ? 'bg-[#788C68] text-white'
                    : 'bg-[#FAF6EE] text-[#77614D]'
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Action Hub */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Action 1: Next Trial */}
        <div className="parchment-sheet p-5 flex flex-col justify-between border-2 border-[#292C26] shadow-[3px_3px_0px_#292C26]">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-pixel text-[10px] bg-[#E9D99A] text-[#292C26] px-1.5 py-0.5 border border-[#292C26]">
                Court Docket
              </span>
              <span className="text-xs">📜</span>
            </div>
            <h3 className="font-pixel text-sm text-[#292C26] mb-1">
              {isAllCasesFinished ? 'All Cases Completed!' : nextCase?.title || 'Next Friendship Trial'}
            </h3>
            <p className="text-xs text-[#77614D] leading-relaxed mb-4">
              {isAllCasesFinished
                ? 'You have faced every trial in the friendship code. Revisit cases in the Archive or discover your final sentence.'
                : nextCase?.description || 'A new infraction awaits judicial review.'}
            </p>
          </div>

          {isAllCasesFinished ? (
            <button
              onClick={() => {
                sound.playFanfare();
                onOpenEnding();
              }}
              className="pixel-btn w-full bg-[#E9D99A] text-[#292C26] font-pixel text-xs py-2.5 cursor-pointer hover:bg-[#DFC770]"
            >
              ★ View Secret Ending & Certificate ★
            </button>
          ) : (
            <button
              onClick={() => {
                sound.playGavel();
                onStartTrial();
              }}
              className="pixel-btn w-full bg-[#344B3A] text-white font-pixel text-xs py-2.5 cursor-pointer hover:bg-[#2A3E2F]"
            >
              Begin Trial ({nextCase?.caseNumber}) →
            </button>
          )}
        </div>

        {/* Action 2: Pet's Room */}
        <div className="parchment-sheet p-5 flex flex-col justify-between border-2 border-[#292C26] shadow-[3px_3px_0px_#292C26]">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-pixel text-[10px] bg-[#788C68] text-white px-1.5 py-0.5 border border-[#292C26]">
                Judge's Quarters
              </span>
              <span className="text-xs">🍪</span>
            </div>
            <h3 className="font-pixel text-sm text-[#292C26] mb-1">
              Pet Care & Chambers
            </h3>
            <p className="text-xs text-[#77614D] leading-relaxed mb-4">
              Feed snacks to {pet.name}, stroke their head, play the Order in the Court mini-game, or equip tiny hats.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onOpenPetRoom();
            }}
            className="pixel-btn w-full bg-[#FAF6EE] text-[#292C26] font-pixel text-xs py-2.5 cursor-pointer hover:bg-[#EFE8DA]"
          >
            Visit Pet Chambers →
          </button>
        </div>

        {/* Action 3: File an Accusation */}
        <div className="parchment-sheet p-5 flex flex-col justify-between border-2 border-[#292C26] shadow-[3px_3px_0px_#292C26]">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-pixel text-[10px] bg-[#D97B48] text-white px-1.5 py-0.5 border border-[#292C26]">
                Accusation Box
              </span>
              <span className="text-xs">✍️</span>
            </div>
            <h3 className="font-pixel text-sm text-[#292C26] mb-1">
              File a Custom Accusation
            </h3>
            <p className="text-xs text-[#77614D] leading-relaxed mb-4">
              Got a real grievance against {playerName}? Submit a ridiculous accusation to get an official judge ruling!
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onOpenAccusations();
            }}
            className="pixel-btn w-full bg-[#FAF6EE] text-[#292C26] font-pixel text-xs py-2.5 cursor-pointer hover:bg-[#EFE8DA]"
          >
            File Accusation →
          </button>
        </div>
      </div>
    </div>
  );
};
