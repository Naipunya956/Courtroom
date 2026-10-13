import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { PetProfile } from '../types/game';
import { PetSprite } from './PetSprite';
import { sound } from '../utils/audio';

interface FinalCertificateProps {
  pet: PetProfile;
  playerName: string;
  personalFriendMessage: string;
  onUpdatePersonalMessage: (msg: string) => void;
  onReplayEnding: () => void;
  onBackToCourt: () => void;
}

export const FinalCertificate: React.FC<FinalCertificateProps> = ({
  pet,
  playerName,
  personalFriendMessage,
  onUpdatePersonalMessage,
  onReplayEnding,
  onBackToCourt
}) => {
  useEffect(() => {
    // Trigger celebratory confetti on view
    sound.playFanfare();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E9D99A', '#788C68', '#344B3A', '#D97B48']
      });
    } catch {
      // Confetti fallback
    }
  }, []);

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      {/* Top Controls */}
      <div className="flex items-center justify-between bg-[#FAF6EE] border-2 border-[#292C26] p-3 shadow-[2px_2px_0px_#292C26] print:hidden">
        <button
          onClick={() => {
            sound.playClick();
            onBackToCourt();
          }}
          className="font-pixel text-xs text-[#77614D] hover:text-[#292C26] cursor-pointer"
        >
          ← Return to Courtroom
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onReplayEnding}
            className="pixel-btn bg-[#FAF6EE] text-[#292C26] font-pixel text-xs px-3 py-1 cursor-pointer hover:bg-[#EFE8DA]"
          >
            Replay Verdict ↻
          </button>
          <button
            onClick={handlePrint}
            className="pixel-btn bg-[#344B3A] text-white font-pixel text-xs px-3 py-1 cursor-pointer hover:bg-[#2A3E2F]"
          >
            Print / Save Certificate 🖨️
          </button>
        </div>
      </div>

      {/* Intimate Speech Bubble Stage */}
      <div className="pixel-box p-6 bg-[#344B3A] text-[#FAF6EE] border-3 border-[#292C26] shadow-[4px_4px_0px_#292C26] space-y-4 print:hidden">
        <div className="flex items-center justify-center gap-4">
          <PetSprite
            species={pet.species}
            mood="happy"
            size="md"
            equipped={pet.equippedAccessories}
          />
          <div>
            <span className="font-pixel text-[10px] text-[#E9D99A] uppercase tracking-wider block">
              Final Supreme Ruling
            </span>
            <h3 className="font-pixel text-sm text-[#FAF6EE]">
              {pet.name}'s Unconditional Verdict
            </h3>
          </div>
        </div>

        <div className="parchment-sheet p-5 text-[#292C26] space-y-3 text-sm leading-relaxed border-2 border-[#292C26]">
          <p className="font-semibold text-[#344B3A]">
            "After reviewing all the evidence, the court has reached its final verdict.
          </p>
          <p>
            You are officially guilty of being an absolute menace.
          </p>
          <p>
            Unfortunately, you are also one of my favourite people.
          </p>
          <p className="font-bold text-[#A83232]">
            Your sentence is permanent friendship, with no possibility of parole."
          </p>
        </div>
      </div>

      {/* The Printable Official Certificate */}
      <div className="parchment-sheet p-8 sm:p-12 border-4 border-[#292C26] shadow-[6px_6px_0px_#292C26] text-center space-y-6 relative overflow-hidden bg-[#FFFDF8]">
        {/* Decorative Corner Ornaments */}
        <div className="absolute top-2 left-3 font-pixel text-xs text-[#77614D]">★ ⚖️ ★</div>
        <div className="absolute top-2 right-3 font-pixel text-xs text-[#77614D]">★ ⚖️ ★</div>
        <div className="absolute bottom-2 left-3 font-pixel text-xs text-[#77614D]">★ ⚖️ ★</div>
        <div className="absolute bottom-2 right-3 font-pixel text-xs text-[#77614D]">★ ⚖️ ★</div>

        {/* Certificate Header */}
        <div className="space-y-1 border-b-2 border-[#77614D]/40 pb-4">
          <span className="font-pixel text-xs text-[#77614D] tracking-widest uppercase block">
            The Supreme Tribunal of Mutual Affection
          </span>
          <h1 className="font-pixel text-lg sm:text-2xl text-[#292C26] tracking-wide pt-1">
            OFFICIALLY CONVICTED OF BEING MY FRIEND
          </h1>
          <span className="text-xs text-[#788C68] font-pixel block uppercase mt-1">
            Permanent Lifetime Sentence · Docket Complete
          </span>
        </div>

        {/* Certificate Body */}
        <div className="space-y-4 max-w-lg mx-auto py-2 text-sm text-[#292C26] leading-relaxed">
          <p className="italic text-xs text-[#77614D]">
            Be it known to all mortal beings, ponds, and parliaments:
          </p>

          <p>
            The individual legally registered as{' '}
            <span className="font-pixel text-base font-bold text-[#344B3A] underline decoration-2 underline-offset-4">
              {playerName}
            </span>
          </p>

          <p>
            has been weighed in the balance of companionship and found irrevocably, delightfully, and stubbornly irreplaceable.
          </p>

          {/* Configurable Personal Message Box */}
          <div className="my-6 p-4 bg-[#FAF6EE] border-2 border-dashed border-[#77614D] text-left relative group">
            <span className="font-pixel text-[9px] text-[#77614D] uppercase block mb-1">
              Personal Note from the Bench:
            </span>
            <textarea
              rows={2}
              value={personalFriendMessage}
              onChange={(e) => onUpdatePersonalMessage(e.target.value)}
              className="w-full bg-transparent border-none text-xs text-[#292C26] italic focus:outline-none focus:ring-0 resize-none font-medium"
              placeholder="Write a special personal note for your friend here..."
            />
            <span className="text-[9px] text-[#77614D] block text-right print:hidden opacity-60">
              (Editable note)
            </span>
          </div>
        </div>

        {/* Signatures & Seal */}
        <div className="pt-6 border-t-2 border-[#77614D]/40 flex flex-wrap items-center justify-between gap-6 px-4">
          {/* Presiding Judge Signature */}
          <div className="text-center">
            <div className="font-pixel text-xs text-[#292C26] border-b border-[#292C26] pb-1 px-4 mb-1">
              🐾 {pet.name}
            </div>
            <span className="font-pixel text-[9px] text-[#77614D] uppercase block">
              Presiding Magistrate
            </span>
          </div>

          {/* Official Wax / Rubber Stamp */}
          <div className="relative">
            <div className="rubber-stamp text-xs rotate-[-8deg] text-[#A83232] border-[#A83232] px-3 py-1 bg-[#A83232]/10">
              ★ IRREVOCABLE SENTENCE ★
            </div>
          </div>

          {/* Date */}
          <div className="text-center">
            <div className="font-pixel text-xs text-[#292C26] border-b border-[#292C26] pb-1 px-4 mb-1">
              {today}
            </div>
            <span className="font-pixel text-[9px] text-[#77614D] uppercase block">
              Date Ratified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
