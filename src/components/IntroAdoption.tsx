import React, { useState } from 'react';
import { PetSpecies, PetProfile } from '../types/game';
import { PetSprite } from './PetSprite';
import { sound } from '../utils/audio';

interface IntroAdoptionProps {
  onComplete: (playerName: string, pet: PetProfile) => void;
}

export const IntroAdoption: React.FC<IntroAdoptionProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'intro' | 'adopt'>('intro');
  const [selectedSpecies, setSelectedSpecies] = useState<PetSpecies>('frog');
  const [petName, setPetName] = useState('Lord Jeremiah');
  const [playerName, setPlayerName] = useState('');
  const [previewMood, setPreviewMood] = useState<'happy' | 'suspicious' | 'dramatic'>('happy');

  const speciesData: Record<
    PetSpecies,
    {
      defaultName: string;
      title: string;
      bio: string;
      personality: string;
      sampleQuote: string;
    }
  > = {
    frog: {
      defaultName: 'Lord Jeremiah',
      title: 'Supreme Magistrate of the Lily Pond',
      bio: 'Stoic, pragmatic, and remarkably corruptible with buttery biscuits. Never blinks during serious testimony.',
      personality: 'Deadpan & Snack-Motivated',
      sampleQuote: '"The defendant is guilty of being annoying. Sentence: friendship."'
    },
    cat: {
      defaultName: 'Justice Whiskers',
      title: 'Grand Chancellor of High Drama',
      bio: 'Theatrical, gasps loudly at minor inconveniences, and routinely pushes case files off the judicial desk with a paw.',
      personality: 'Melodramatic & Royal',
      sampleQuote: '"I am the law, the jury, and the cutest living organism in this room."'
    },
    duck: {
      defaultName: 'Judge Quackers',
      title: 'Chief Inspector of Unread Texts',
      bio: 'Intensely paranoid waterfowl with an oversized powdered wig. Documents every 3-minute delay in message replies.',
      personality: 'Suspicious & Meticulous',
      sampleQuote: '"My clipboard has documented 47 separate friendship infractions."'
    }
  };

  const handleSelectSpecies = (sp: PetSpecies) => {
    sound.playClick();
    setSelectedSpecies(sp);
    setPetName(speciesData[sp].defaultName);
    sound.playPetSound(sp);
  };

  const handleEnterCourtroom = () => {
    sound.playGavel();
    setStep('adopt');
  };

  const handleFinishAdoption = (e: React.FormEvent) => {
    e.preventDefault();
    const finalPlayer = playerName.trim() || 'Best Friend';
    const finalPetName = petName.trim() || speciesData[selectedSpecies].defaultName;

    sound.playGavel();
    sound.playPetSound(selectedSpecies);

    const initialPet: PetProfile = {
      species: selectedSpecies,
      name: finalPetName,
      title: speciesData[selectedSpecies].title,
      stats: {
        happiness: 80,
        energy: 85,
        trust: 70,
        drama: 45
      },
      mood: 'happy',
      equippedAccessories: {
        hat: 'hat-judge-wig',
        eyewear: selectedSpecies === 'duck' ? 'eyewear-spectacles' : undefined,
        neck: 'neck-bowtie',
        desk: 'desk-tea'
      }
    };

    onComplete(finalPlayer, initialPet);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {step === 'intro' ? (
        <div className="max-w-xl w-full pixel-box p-8 text-center animate-subtle-bounce">
          {/* Header Seal */}
          <div className="w-16 h-16 mx-auto mb-4 bg-[#E9D99A] border-2 border-[#292C26] flex items-center justify-center text-2xl shadow-[2px_2px_0px_#292C26]">
            ⚖️
          </div>

          <span className="font-pixel text-xs text-[#77614D] tracking-widest uppercase block mb-1">
            Official Docket No. 001
          </span>
          <h1 className="font-pixel text-xl sm:text-2xl text-[#292C26] mb-6">
            The Friendship Court
          </h1>

          <div className="parchment-sheet p-6 mb-8 text-left space-y-4 text-base leading-relaxed text-[#292C26]">
            <p className="font-semibold text-[#344B3A]">
              Welcome to the Friendship Court.
            </p>
            <p>
              After a thorough investigation, we have determined that your friendship is full of suspicious activity.
            </p>
            <p>
              Fortunately, justice has arrived in a very small body.
            </p>
          </div>

          <button
            onClick={handleEnterCourtroom}
            className="pixel-btn bg-[#344B3A] text-[#FAF6EE] font-pixel text-sm px-6 py-3 cursor-pointer hover:bg-[#2A3E2F]"
          >
            Enter the courtroom →
          </button>
        </div>
      ) : (
        /* ADOPTION SCREEN */
        <div className="max-w-3xl w-full pixel-box p-6 sm:p-8">
          <div className="text-center mb-6">
            <span className="font-pixel text-xs text-[#77614D] tracking-widest uppercase block">
              Step 2 of 2 · Appointment of the Magistrate
            </span>
            <h2 className="font-pixel text-xl sm:text-2xl text-[#292C26] mt-1">
              Select Your Tiny Animal Judge
            </h2>
            <p className="text-sm text-[#77614D] mt-2">
              Choose the tiny magistrate who will preside over your friendship trials.
            </p>
          </div>

          {/* 3 Pet Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {(['frog', 'cat', 'duck'] as PetSpecies[]).map((sp) => {
              const data = speciesData[sp];
              const isSelected = selectedSpecies === sp;

              return (
                <div
                  key={sp}
                  onClick={() => handleSelectSpecies(sp)}
                  className={`cursor-pointer p-4 transition-all text-center border-2 border-[#292C26] ${
                    isSelected
                      ? 'bg-[#E9D99A] shadow-[4px_4px_0px_#292C26] -translate-y-1'
                      : 'bg-[#FFFDF9] hover:bg-[#FAF0DA] shadow-[2px_2px_0px_#292C26]'
                  }`}
                >
                  <div className="h-32 flex items-center justify-center mb-2">
                    <PetSprite species={sp} mood={isSelected ? previewMood : 'happy'} size="md" />
                  </div>

                  <h3 className="font-pixel text-sm text-[#292C26] mb-1">
                    {data.defaultName}
                  </h3>
                  <span className="font-pixel text-[10px] text-[#788C68] block mb-2 uppercase">
                    {data.personality}
                  </span>
                  <p className="text-xs text-[#77614D] leading-snug mb-3">
                    {data.bio}
                  </p>

                  <div className="bg-[#FAF6EE] border border-[#292C26] p-2 text-[11px] italic text-[#292C26]">
                    {data.sampleQuote}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Preview Mood Toggles */}
          <div className="flex items-center justify-center gap-2 mb-6 text-xs">
            <span className="font-pixel text-[11px] text-[#77614D]">Preview Mood:</span>
            {(['happy', 'suspicious', 'dramatic'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setPreviewMood(m);
                }}
                className={`px-3 py-1 font-pixel text-[10px] border border-[#292C26] cursor-pointer ${
                  previewMood === m ? 'bg-[#344B3A] text-white shadow-[1px_1px_0px_#292C26]' : 'bg-[#FAF6EE] text-[#292C26]'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Inputs & Final Confirmation Form */}
          <form onSubmit={handleFinishAdoption} className="parchment-sheet p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-pixel text-xs text-[#292C26] mb-1">
                  Your Name / Defendant:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full bg-[#FFFDF9] border-2 border-[#292C26] px-3 py-2 text-sm focus:outline-none focus:bg-[#FFF]"
                />
              </div>

              <div>
                <label className="block font-pixel text-xs text-[#292C26] mb-1">
                  Pet Judge's Name:
                </label>
                <input
                  type="text"
                  required
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  className="w-full bg-[#FFFDF9] border-2 border-[#292C26] px-3 py-2 text-sm focus:outline-none focus:bg-[#FFF]"
                />
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                type="submit"
                className="pixel-btn bg-[#788C68] text-white font-pixel text-sm px-8 py-3 cursor-pointer hover:bg-[#687C58]"
              >
                Swear In the Judge & Begin Trial →
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
