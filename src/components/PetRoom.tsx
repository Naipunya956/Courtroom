import React, { useState } from 'react';
import { PetProfile, PetMood, Accessory } from '../types/game';
import { PetSprite } from './PetSprite';
import { SNACKS, ACCESSORIES, SnackItem } from '../data/accessories';
import { getRandomDialogue } from '../data/dialogue';
import { sound } from '../utils/audio';

interface PetRoomProps {
  pet: PetProfile;
  unlockedAccessories: string[];
  onUpdatePet: (updated: Partial<PetProfile>) => void;
  onFeedSnack: (snack: SnackItem) => void;
  onPetJudge: () => void;
  onMiniGameComplete: (score: number) => void;
}

export const PetRoom: React.FC<PetRoomProps> = ({
  pet,
  unlockedAccessories,
  onUpdatePet,
  onFeedSnack,
  onPetJudge,
  onMiniGameComplete
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'care' | 'play' | 'wardrobe'>('care');
  const [roomActionFeedback, setRoomActionFeedback] = useState<string>(
    getRandomDialogue(pet.species, pet.mood, 'idle')
  );
  const [isResting, setIsResting] = useState<boolean>(false);
  const [heartParticles, setHeartParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  // Mini-game state for "Order in the Court!"
  const [miniGameState, setMiniGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [targetPosition, setTargetPosition] = useState<number>(50);
  const [markerPosition, setMarkerPosition] = useState<number>(0);
  const [markerDirection, setMarkerDirection] = useState<number>(1);
  const [miniGameScore, setMiniGameScore] = useState<number>(0);
  const [miniGameRoundsLeft, setMiniGameRoundsLeft] = useState<number>(5);

  // Feeding
  const handleGiveSnack = (snack: SnackItem) => {
    sound.playSnack();
    onFeedSnack(snack);
    const quote = getRandomDialogue(pet.species, pet.mood, 'feeding');
    setRoomActionFeedback(quote);
  };

  // Petting
  const handlePet = (e: React.MouseEvent) => {
    sound.playPetSound(pet.species, pet.mood);
    onPetJudge();

    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    setHeartParticles((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setHeartParticles((prev) => prev.filter((p) => p.id !== newHeart.id));
    }, 1200);

    const quote = getRandomDialogue(pet.species, pet.mood, 'petting');
    setRoomActionFeedback(quote);
  };

  // Nap/Rest
  const handleToggleRest = () => {
    sound.playSleep();
    if (!isResting) {
      setIsResting(true);
      onUpdatePet({
        mood: 'sleepy',
        stats: {
          ...pet.stats,
          energy: Math.min(100, pet.stats.energy + 30)
        }
      });
      setRoomActionFeedback(getRandomDialogue(pet.species, 'sleepy', 'resting'));
    } else {
      setIsResting(false);
      onUpdatePet({
        mood: 'happy',
        stats: {
          ...pet.stats,
          energy: Math.min(100, pet.stats.energy + 10)
        }
      });
      setRoomActionFeedback(getRandomDialogue(pet.species, 'happy', 'idle'));
    }
  };

  // Mini-game handlers
  const startMiniGame = () => {
    sound.playClick();
    setMiniGameState('playing');
    setMiniGameScore(0);
    setMiniGameRoundsLeft(5);
    setMarkerPosition(10);
    setMarkerDirection(2.5);
    setTargetPosition(Math.floor(25 + Math.random() * 50));
  };

  // Marker animation loop when playing
  React.useEffect(() => {
    if (miniGameState !== 'playing') return;

    const interval = setInterval(() => {
      setMarkerPosition((pos) => {
        let next = pos + markerDirection;
        if (next >= 90) {
          setMarkerDirection(-Math.abs(markerDirection));
          next = 90;
        } else if (next <= 10) {
          setMarkerDirection(Math.abs(markerDirection));
          next = 10;
        }
        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [miniGameState, markerDirection]);

  const handleStrikeGavel = () => {
    sound.playGavel();
    const distance = Math.abs(markerPosition - targetPosition);
    let hit = false;

    if (distance <= 12) {
      hit = true;
      setMiniGameScore((s) => s + 1);
    }

    const nextRounds = miniGameRoundsLeft - 1;
    setMiniGameRoundsLeft(nextRounds);

    if (nextRounds <= 0) {
      const finalScore = hit ? miniGameScore + 1 : miniGameScore;
      setMiniGameState('gameover');
      onMiniGameComplete(finalScore);
      sound.playFanfare();
    } else {
      // Pick new target
      setTargetPosition(Math.floor(25 + Math.random() * 50));
      // Increase speed slightly
      setMarkerDirection((dir) => (dir > 0 ? dir + 0.3 : dir - 0.3));
    }
  };

  // Accessory Toggle
  const handleToggleAccessory = (acc: Accessory) => {
    sound.playClick();
    const currentSlot = acc.slot;
    const isCurrentlyEquipped = pet.equippedAccessories[currentSlot] === acc.id;

    const updatedEquipped = {
      ...pet.equippedAccessories,
      [currentSlot]: isCurrentlyEquipped ? undefined : acc.id
    };

    onUpdatePet({
      equippedAccessories: updatedEquipped
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Sub Tabs: Care, Play, Wardrobe */}
      <div className="flex items-center gap-2 border-b-2 border-[#292C26] pb-2">
        <button
          onClick={() => {
            sound.playClick();
            setActiveSubTab('care');
          }}
          className={`font-pixel text-xs px-4 py-2 border-2 border-[#292C26] cursor-pointer ${
            activeSubTab === 'care'
              ? 'bg-[#344B3A] text-white shadow-[2px_2px_0px_#292C26]'
              : 'bg-[#FAF6EE] text-[#292C26] hover:bg-[#EFE8DA]'
          }`}
        >
          🥣 Care & Snacks
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveSubTab('play');
          }}
          className={`font-pixel text-xs px-4 py-2 border-2 border-[#292C26] cursor-pointer ${
            activeSubTab === 'play'
              ? 'bg-[#344B3A] text-white shadow-[2px_2px_0px_#292C26]'
              : 'bg-[#FAF6EE] text-[#292C26] hover:bg-[#EFE8DA]'
          }`}
        >
          🔨 Order Mini-Game
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveSubTab('wardrobe');
          }}
          className={`font-pixel text-xs px-4 py-2 border-2 border-[#292C26] cursor-pointer ${
            activeSubTab === 'wardrobe'
              ? 'bg-[#344B3A] text-white shadow-[2px_2px_0px_#292C26]'
              : 'bg-[#FAF6EE] text-[#292C26] hover:bg-[#EFE8DA]'
          }`}
        >
          🎩 Wardrobe & Decor
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Cozy Room Stage */}
        <div
          className={`lg:col-span-5 pixel-box p-6 flex flex-col items-center justify-between text-center relative transition-colors duration-500 ${
            isResting ? 'bg-[#292C26] text-[#FAF6EE]' : 'bg-[#FAF6EE] text-[#292C26]'
          }`}
        >
          {/* Room Ambient Label */}
          <div className="w-full flex items-center justify-between text-[10px] font-pixel mb-2">
            <span className={isResting ? 'text-[#E9D99A]' : 'text-[#77614D]'}>
              {isResting ? '🌙 Bedtime Chambers' : '☀️ Judicial Quarters'}
            </span>
            <button
              onClick={handleToggleRest}
              className={`font-pixel text-[10px] px-2 py-1 border border-current cursor-pointer ${
                isResting ? 'bg-[#77614D] text-white' : 'bg-[#E9D99A] text-[#292C26]'
              }`}
            >
              {isResting ? 'Wake Up ☀️' : 'Take a Nap 💤'}
            </button>
          </div>

          {/* Interactive Petting Area */}
          <div
            onClick={handlePet}
            className="my-6 relative cursor-pointer group flex flex-col items-center"
            title="Click to gently pet your judge!"
          >
            <PetSprite
              species={pet.species}
              mood={isResting ? 'sleepy' : pet.mood}
              size="xl"
              equipped={pet.equippedAccessories}
              isClickable={true}
            />

            <span className="font-pixel text-[10px] opacity-75 mt-2 block group-hover:scale-105 transition-transform">
              (Click to Pet / Scratch)
            </span>

            {/* Floating Heart Particles */}
            {heartParticles.map((h) => (
              <span
                key={h.id}
                style={{ left: h.x, top: h.y }}
                className="absolute text-lg pointer-events-none animate-ping"
              >
                💖
              </span>
            ))}
          </div>

          {/* Feedback Speech Quote */}
          <div
            className={`w-full p-3 border-2 border-[#292C26] text-xs italic ${
              isResting ? 'bg-[#353930] text-[#E9D99A]' : 'bg-[#FFFDF9] text-[#292C26]'
            }`}
          >
            "{roomActionFeedback}"
          </div>
        </div>

        {/* Right: Tab Panels */}
        <div className="lg:col-span-7 space-y-4">
          {activeSubTab === 'care' && (
            <div className="parchment-sheet p-6 space-y-4">
              <div className="border-b border-[#77614D]/30 pb-3">
                <h3 className="font-pixel text-sm text-[#292C26]">
                  Courtroom Snack Pantry
                </h3>
                <p className="text-xs text-[#77614D] mt-1">
                  Serve high-calorie bribes to keep your tiny judge energetic, joyous, and trusting.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SNACKS.map((snack) => (
                  <div
                    key={snack.id}
                    className="bg-[#FAF6EE] border-2 border-[#292C26] p-3 flex flex-col justify-between shadow-[2px_2px_0px_#292C26]"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{snack.icon}</span>
                        <h4 className="font-pixel text-xs text-[#292C26]">
                          {snack.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-[#77614D] leading-snug mb-2">
                        {snack.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#77614D]/20">
                      <div className="text-[10px] font-pixel text-[#788C68]">
                        +{snack.effects.happiness} Joy · +{snack.effects.energy} Zzz
                      </div>
                      <button
                        onClick={() => handleGiveSnack(snack)}
                        className="pixel-btn bg-[#344B3A] text-white font-pixel text-[10px] px-3 py-1 cursor-pointer hover:bg-[#2A3E2F]"
                      >
                        Feed →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'play' && (
            <div className="parchment-sheet p-6 space-y-4 text-center">
              <div className="border-b border-[#77614D]/30 pb-3 text-left">
                <h3 className="font-pixel text-sm text-[#292C26]">
                  Mini-Game: "Order in the Court!"
                </h3>
                <p className="text-xs text-[#77614D] mt-1">
                  Time your gavel strike when the marker aligns with the sweet spot to restore peace in the chamber!
                </p>
              </div>

              {miniGameState === 'idle' && (
                <div className="py-8 space-y-4">
                  <div className="text-3xl">🔨⚡</div>
                  <p className="text-xs text-[#292C26] max-w-sm mx-auto">
                    Test your judicial reflexes over 5 fast rounds. Hitting the mark grants massive Joy and Trust to {pet.name}.
                  </p>
                  <button
                    onClick={startMiniGame}
                    className="pixel-btn bg-[#788C68] text-white font-pixel text-xs px-6 py-3 cursor-pointer hover:bg-[#687C58]"
                  >
                    Start Order in the Court! →
                  </button>
                </div>
              )}

              {miniGameState === 'playing' && (
                <div className="py-6 space-y-6">
                  <div className="flex items-center justify-between text-xs font-pixel text-[#77614D]">
                    <span>Round: {6 - miniGameRoundsLeft}/5</span>
                    <span>Score: {miniGameScore}</span>
                  </div>

                  {/* Timing Gauge */}
                  <div className="relative w-full h-12 bg-[#292C26] border-2 border-[#292C26] overflow-hidden">
                    {/* Target Zone */}
                    <div
                      style={{
                        left: `${targetPosition - 6}%`,
                        width: '12%'
                      }}
                      className="absolute top-0 bottom-0 bg-[#E9D99A] border-x border-[#FAF6EE] opacity-90"
                    />

                    {/* Moving Marker */}
                    <div
                      style={{ left: `${markerPosition}%` }}
                      className="absolute top-0 bottom-0 w-2.5 bg-[#A83232] border border-white shadow-[0_0_4px_white] transition-none"
                    />
                  </div>

                  <button
                    onClick={handleStrikeGavel}
                    className="pixel-btn bg-[#A83232] text-white font-pixel text-sm px-8 py-4 cursor-pointer hover:bg-[#902525] active:scale-95"
                  >
                    ★ STRIKE GAVEL! ★
                  </button>
                </div>
              )}

              {miniGameState === 'gameover' && (
                <div className="py-8 space-y-4">
                  <span className="font-pixel text-xs text-[#788C68] uppercase block">
                    Session Concluded!
                  </span>
                  <h3 className="font-pixel text-lg text-[#292C26]">
                    Score: {miniGameScore} / 5
                  </h3>
                  <p className="text-xs text-[#77614D]">
                    {miniGameScore >= 4
                      ? 'Supreme Courtroom Mastery! Your pet judge is thoroughly impressed!'
                      : 'A respectable judicial rhythm. Order has been temporarily maintained.'}
                  </p>
                  <button
                    onClick={startMiniGame}
                    className="pixel-btn bg-[#344B3A] text-white font-pixel text-xs px-6 py-2.5 cursor-pointer hover:bg-[#2A3E2F]"
                  >
                    Play Again ↻
                  </button>
                </div>
              )}
            </div>
          )}

          {activeSubTab === 'wardrobe' && (
            <div className="parchment-sheet p-6 space-y-4">
              <div className="border-b border-[#77614D]/30 pb-3">
                <h3 className="font-pixel text-sm text-[#292C26]">
                  Chambers Wardrobe & Curiosities
                </h3>
                <p className="text-xs text-[#77614D] mt-1">
                  Equip hats, spectacles, bowties, and bench decorations on {pet.name}.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                {ACCESSORIES.map((acc) => {
                  const isUnlocked = acc.unlockedByDefault || unlockedAccessories.includes(acc.id);
                  const isEquipped = pet.equippedAccessories[acc.slot] === acc.id;

                  return (
                    <div
                      key={acc.id}
                      className={`border-2 border-[#292C26] p-3 flex items-start gap-3 transition-colors ${
                        !isUnlocked
                          ? 'bg-[#EFE8DA] opacity-60'
                          : isEquipped
                          ? 'bg-[#E9D99A] shadow-[2px_2px_0px_#292C26]'
                          : 'bg-[#FAF6EE]'
                      }`}
                    >
                      <span className="text-2xl shrink-0">{acc.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-pixel text-xs text-[#292C26] truncate">
                            {acc.name}
                          </h4>
                          <span className="text-[10px] font-pixel text-[#77614D] uppercase">
                            {acc.slot}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#77614D] leading-tight my-1">
                          {acc.description}
                        </p>

                        {isUnlocked ? (
                          <button
                            onClick={() => handleToggleAccessory(acc)}
                            className={`font-pixel text-[10px] px-2 py-0.5 border border-[#292C26] cursor-pointer ${
                              isEquipped
                                ? 'bg-[#A83232] text-white'
                                : 'bg-[#344B3A] text-white hover:bg-[#2A3E2F]'
                            }`}
                          >
                            {isEquipped ? 'Unequip' : 'Equip'}
                          </button>
                        ) : (
                          <span className="text-[10px] font-pixel text-[#77614D] italic">
                            🔒 Locked
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
