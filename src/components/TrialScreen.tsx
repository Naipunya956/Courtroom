import React, { useState } from 'react';
import { TrialCase, PetProfile, DefenseOption, CompletedCaseRecord } from '../types/game';
import { PetSprite } from './PetSprite';
import { sound } from '../utils/audio';

interface TrialScreenProps {
  currentCase: TrialCase;
  pet: PetProfile;
  playerName: string;
  onVerdictReached: (
    completedCase: CompletedCaseRecord,
    statEffects: DefenseOption['statEffects'],
    newMood: PetProfile['mood']
  ) => void;
  onCloseTrial: () => void;
  isReplay?: boolean;
}

export const TrialScreen: React.FC<TrialScreenProps> = ({
  currentCase,
  pet,
  playerName,
  onVerdictReached,
  onCloseTrial,
  isReplay = false
}) => {
  const [selectedDefense, setSelectedDefense] = useState<DefenseOption | null>(null);
  const [verdictPhase, setVerdictPhase] = useState<'reading' | 'deliberating' | 'verdict'>('reading');
  const [currentJudgeMood, setCurrentJudgeMood] = useState<PetProfile['mood']>(pet.mood);

  const handleSelectDefense = (defense: DefenseOption) => {
    sound.playClick();
    setSelectedDefense(defense);
    setVerdictPhase('deliberating');

    // Simulate intense judicial deliberation
    setTimeout(() => {
      sound.playGavel();
    }, 450);

    setTimeout(() => {
      sound.playStamp();
      setCurrentJudgeMood(defense.judgeReactionMood);
      setVerdictPhase('verdict');

      const completedRecord: CompletedCaseRecord = {
        caseId: currentCase.id,
        caseNumber: currentCase.caseNumber,
        title: currentCase.title,
        chosenDefenseText: defense.text,
        verdictTitle: defense.verdictTitle,
        verdictText: defense.verdictText,
        stampType: defense.stampType,
        completedAt: new Date().toLocaleDateString(),
        petMoodAtVerdict: defense.judgeReactionMood
      };

      onVerdictReached(completedRecord, defense.statEffects, defense.judgeReactionMood);
    }, 950);
  };

  const getStampColor = (type: string) => {
    switch (type) {
      case 'INNOCENT':
      case 'PARDONED':
        return 'text-[#344B3A] border-[#344B3A] bg-[#788C68]/15';
      case 'GUILTY':
        return 'text-[#A83232] border-[#A83232] bg-[#A83232]/10';
      case 'SENTENCED':
        return 'text-[#77614D] border-[#77614D] bg-[#E9D99A]/20';
      case 'SILLY':
      default:
        return 'text-[#D97B48] border-[#D97B48] bg-[#D97B48]/15';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Bar with Case Header */}
      <div className="flex items-center justify-between gap-4 bg-[#FAF6EE] border-2 border-[#292C26] p-3 shadow-[2px_2px_0px_#292C26]">
        <div className="flex items-center gap-3">
          <span className="font-pixel text-xs bg-[#292C26] text-[#FAF6EE] px-2 py-1">
            {currentCase.caseNumber}
          </span>
          <span className="font-pixel text-xs text-[#77614D]">
            Defendant: {playerName}
          </span>
          {isReplay && (
            <span className="text-[10px] font-pixel bg-[#E9D99A] text-[#292C26] px-2 py-0.5 border border-[#292C26]">
              Archive Re-examination
            </span>
          )}
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onCloseTrial();
          }}
          className="font-pixel text-[11px] text-[#77614D] hover:text-[#292C26] px-2 py-1 border border-[#77614D] cursor-pointer"
        >
          Exit Trial ✕
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Judge Bench (4 cols on lg) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-start bg-[#FAF6EE] border-2 border-[#292C26] p-4 text-center shadow-[3px_3px_0px_#292C26]">
          <div className="text-[10px] font-pixel text-[#788C68] uppercase tracking-wider mb-2">
            Presiding Magistrate
          </div>
          <h3 className="font-pixel text-sm text-[#292C26] mb-1">
            {pet.name}
          </h3>
          <span className="text-xs text-[#77614D] italic mb-3">
            {pet.title}
          </span>

          {/* Illustrated Mini Bench */}
          <div className="relative w-full py-4 flex flex-col items-center justify-center">
            <PetSprite
              species={pet.species}
              mood={currentJudgeMood}
              size="lg"
              equipped={pet.equippedAccessories}
              isClickable={true}
              onClick={() => sound.playPetSound(pet.species, currentJudgeMood)}
            />

            {/* Bench Graphic */}
            <div className="w-full h-4 bg-[#77614D] border-t-2 border-[#292C26] mt-[-10px] flex items-center justify-center">
              <span className="w-12 h-1 bg-[#5A4533] block" />
            </div>
          </div>

          {/* Judge's Speech Bubble during trial */}
          <div className="mt-3 w-full bg-[#FFFDF9] border-2 border-[#292C26] p-3 text-xs text-[#292C26] text-left relative shadow-[2px_2px_0px_#292C26]">
            <div className="font-pixel text-[10px] text-[#788C68] mb-1 uppercase">
              Bench Notes:
            </div>
            {verdictPhase === 'reading' && (
              <p className="italic">
                "The defendant may review the exhibits and present their formal defense. No bribery... yet."
              </p>
            )}
            {verdictPhase === 'deliberating' && (
              <p className="italic font-bold text-[#A83232] animate-pulse">
                *Taps gavel furiously on the sound block* "Order! The court is weighing the silliness of this matter!"
              </p>
            )}
            {verdictPhase === 'verdict' && selectedDefense && (
              <p className="italic">
                {selectedDefense.judgeQuote[pet.species]}
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Case Dossier & Defense selection (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-6">
          {verdictPhase !== 'verdict' ? (
            /* CASE DOSSIER VIEW */
            <div className="parchment-sheet p-6 space-y-6">
              {/* Dossier Header */}
              <div className="border-b-2 border-[#77614D]/40 pb-4">
                <span className="font-pixel text-[11px] text-[#A83232] tracking-wider uppercase block">
                  Confidential Docket // Court of Friendship
                </span>
                <h2 className="font-pixel text-lg sm:text-xl text-[#292C26] mt-1">
                  {currentCase.title}
                </h2>
                <span className="text-xs text-[#77614D] block mt-0.5 italic">
                  {currentCase.subtitle}
                </span>
                <p className="text-sm text-[#292C26] mt-3 leading-relaxed">
                  {currentCase.description}
                </p>
              </div>

              {/* Exhibits Box */}
              <div>
                <h4 className="font-pixel text-xs text-[#344B3A] mb-3 uppercase tracking-wide">
                  Documented Evidence & Exhibits:
                </h4>
                <div className="space-y-2">
                  {currentCase.exhibits.map((ex, idx) => (
                    <div
                      key={idx}
                      className="bg-[#FAF6EE] border border-[#292C26] p-3 flex items-start gap-3 text-xs"
                    >
                      <span className="font-pixel text-[10px] bg-[#E9D99A] text-[#292C26] px-1.5 py-0.5 border border-[#292C26] shrink-0">
                        {ex.label}
                      </span>
                      <span className="text-[#292C26] leading-relaxed">
                        {ex.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Defenses Section */}
              <div>
                <h4 className="font-pixel text-xs text-[#292C26] mb-3 uppercase tracking-wide">
                  Choose Your Plea / Defense:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentCase.defenses.map((def) => (
                    <button
                      key={def.id}
                      disabled={verdictPhase === 'deliberating'}
                      onClick={() => handleSelectDefense(def)}
                      className="pixel-btn bg-[#FFFDF9] hover:bg-[#E9D99A]/30 text-left p-3.5 border-2 border-[#292C26] cursor-pointer flex flex-col justify-between group disabled:opacity-50"
                    >
                      <span className="text-xs font-semibold text-[#292C26] leading-snug group-hover:text-[#344B3A]">
                        {def.text}
                      </span>
                      <span className="font-pixel text-[10px] text-[#77614D] mt-2 block">
                        Plead this defense →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* OFFICIAL VERDICT CARD */
            <div className="parchment-sheet p-6 sm:p-8 space-y-6 text-center animate-subtle-bounce">
              {/* Rubber Stamp */}
              {selectedDefense && (
                <div className="flex justify-center mb-2">
                  <div
                    className={`rubber-stamp text-sm sm:text-base rotate-[-6deg] ${getStampColor(
                      selectedDefense.stampType
                    )}`}
                  >
                    ★ {selectedDefense.stampType} ★
                  </div>
                </div>
              )}

              <span className="font-pixel text-xs text-[#77614D] tracking-widest uppercase block">
                Official Judicial Pronouncement
              </span>

              <h2 className="font-pixel text-base sm:text-lg text-[#292C26]">
                {selectedDefense?.verdictTitle}
              </h2>

              <p className="text-sm text-[#292C26] leading-relaxed max-w-lg mx-auto bg-[#FAF6EE] p-4 border border-[#292C26]">
                {selectedDefense?.verdictText}
              </p>

              {/* Stat Impact Chips */}
              {selectedDefense && (
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <span className="font-pixel text-[10px] text-[#77614D] mr-1">Stat Effects:</span>
                  {selectedDefense.statEffects.happiness !== 0 && (
                    <span className="font-pixel text-[10px] bg-[#788C68] text-white px-2 py-0.5 border border-[#292C26]">
                      Joy {selectedDefense.statEffects.happiness > 0 ? `+${selectedDefense.statEffects.happiness}` : selectedDefense.statEffects.happiness}
                    </span>
                  )}
                  {selectedDefense.statEffects.trust !== 0 && (
                    <span className="font-pixel text-[10px] bg-[#557A95] text-white px-2 py-0.5 border border-[#292C26]">
                      Trust {selectedDefense.statEffects.trust > 0 ? `+${selectedDefense.statEffects.trust}` : selectedDefense.statEffects.trust}
                    </span>
                  )}
                  {selectedDefense.statEffects.drama !== 0 && (
                    <span className="font-pixel text-[10px] bg-[#D97B48] text-white px-2 py-0.5 border border-[#292C26]">
                      Drama {selectedDefense.statEffects.drama > 0 ? `+${selectedDefense.statEffects.drama}` : selectedDefense.statEffects.drama}
                    </span>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => {
                    sound.playClick();
                    onCloseTrial();
                  }}
                  className="pixel-btn bg-[#344B3A] text-white font-pixel text-xs px-6 py-2.5 cursor-pointer hover:bg-[#2A3E2F]"
                >
                  Confirm Verdict & Return to Court →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
