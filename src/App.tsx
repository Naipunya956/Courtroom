import { useState, useEffect, useRef } from 'react';
import {
  PetProfile,
  CompletedCaseRecord,
  CustomAccusation,
  ActiveTab,
  GameSaveData,
  DefenseOption,
  PetMood
} from './types/game';
import { INITIAL_CASES } from './data/cases';
import { INITIAL_ACHIEVEMENTS } from './data/achievements';
import { SnackItem } from './data/accessories';
import { sound } from './utils/audio';

// Components
import { IntroAdoption } from './components/IntroAdoption';
import { GameNavigation } from './components/GameNavigation';
import { PetStatsBar } from './components/PetStatsBar';
import { CourtroomScene } from './components/CourtroomScene';
import { TrialScreen } from './components/TrialScreen';
import { PetRoom } from './components/PetRoom';
import { CaseArchive } from './components/CaseArchive';
import { AccusationForm } from './components/AccusationForm';
import { AchievementCollection } from './components/AchievementCollection';
import { FinalCertificate } from './components/FinalCertificate';
import { SettingsModal } from './components/SettingsModal';

const SAVE_KEY = 'friendship_court_save_v1';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [pet, setPet] = useState<PetProfile | null>(null);
  const [currentTrialIndex, setCurrentTrialIndex] = useState(0);
  const [completedCases, setCompletedCases] = useState<CompletedCaseRecord[]>([]);
  const [customAccusations, setCustomAccusations] = useState<CustomAccusation[]>([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [unlockedAccessories, setUnlockedAccessories] = useState<string[]>([
    'hat-judge-wig',
    'eyewear-spectacles',
    'neck-bowtie',
    'desk-tea'
  ]);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [secretEndingUnlocked, setSecretEndingUnlocked] = useState(false);
  const [timesPetted, setTimesPetted] = useState(0);
  const [timesFed, setTimesFed] = useState(0);
  const [miniGameHighScore, setMiniGameHighScore] = useState(0);
  const [personalFriendMessage, setPersonalFriendMessage] = useState(
    'Thanks for being there through all the chaos, laughs, late-night memes, and questionable life decisions. I wouldn\'t trade our friendship for anything in the world.'
  );

  // Navigation & Modal State
  const [activeTab, setActiveTab] = useState<ActiveTab>('court');
  const [activeTrialCaseId, setActiveTrialCaseId] = useState<string | null>(null);
  const [isReplayTrial, setIsReplayTrial] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  // Tracking if pet was ever sad for achievement
  const petWasSadRef = useRef(false);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) {
        const data: GameSaveData = JSON.parse(saved);
        setPlayerName(data.playerName || '');
        setPet(data.pet || null);
        setCurrentTrialIndex(data.currentTrialIndex || 0);
        setCompletedCases(data.completedCases || []);
        setCustomAccusations(data.customAccusations || []);
        setUnlockedAchievements(data.unlockedAchievements || []);
        setUnlockedAccessories(data.unlockedAccessories || [
          'hat-judge-wig',
          'eyewear-spectacles',
          'neck-bowtie',
          'desk-tea'
        ]);
        setSoundEnabled(data.soundEnabled || false);
        sound.setEnabled(data.soundEnabled || false);
        setSecretEndingUnlocked(data.secretEndingUnlocked || false);
        setTimesPetted(data.timesPetted || 0);
        setTimesFed(data.timesFed || 0);
        setMiniGameHighScore(data.miniGameHighScore || 0);
        if (data.personalFriendMessage) {
          setPersonalFriendMessage(data.personalFriendMessage);
        }
      }
    } catch {
      // Storage error fallback
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (!isLoaded || !pet) return;

    const data: GameSaveData = {
      playerName,
      pet,
      currentTrialIndex,
      completedCases,
      customAccusations,
      unlockedAchievements,
      unlockedAccessories,
      soundEnabled,
      secretEndingUnlocked,
      timesPetted,
      timesFed,
      miniGameHighScore,
      personalFriendMessage
    };

    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    } catch {
      // LocalStorage save error
    }
  }, [
    isLoaded,
    playerName,
    pet,
    currentTrialIndex,
    completedCases,
    customAccusations,
    unlockedAchievements,
    unlockedAccessories,
    soundEnabled,
    secretEndingUnlocked,
    timesPetted,
    timesFed,
    miniGameHighScore,
    personalFriendMessage
  ]);

  // Audio sync
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.setEnabled(next);
    if (next) sound.playClick();
  };

  // Toast Helper
  const showToast = (msg: string) => {
    setToastNotification(msg);
    setTimeout(() => {
      setToastNotification((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  // Achievement unlocker
  const unlockAchievement = (id: string, name: string) => {
    if (!unlockedAchievements.includes(id)) {
      setUnlockedAchievements((prev) => [...prev, id]);
      sound.playFanfare();
      showToast(`🏆 Badge Unlocked: ${name}!`);
    }
  };

  // Check achievements on relevant state changes
  useEffect(() => {
    if (!pet) return;

    // Check Trust achievement
    if (pet.stats.trust >= 85) {
      unlockAchievement('ach-judge-favourite', "The Judge's Favourite");
    }

    // Check if pet was sad
    if (pet.stats.happiness < 40) {
      petWasSadRef.current = true;
    } else if (petWasSadRef.current && pet.stats.happiness >= 70) {
      unlockAchievement('ach-change-of-heart', 'A Change of Heart');
    }

    // Check decoration
    const hasDecorations = Object.values(pet.equippedAccessories).some((v) => !!v);
    if (hasDecorations) {
      unlockAchievement('ach-unsupervised', 'Legally Unsupervised');
    }
  }, [pet]);

  // Adoption complete
  const handleAdoptPet = (player: string, adoptedPet: PetProfile) => {
    setPlayerName(player);
    setPet(adoptedPet);
    showToast(`Welcome to Court! ${adoptedPet.name} has been sworn in.`);
  };

  // Determine next unplayed case
  const nextCase =
    currentTrialIndex < INITIAL_CASES.length
      ? INITIAL_CASES[currentTrialIndex]
      : null;

  // Start trial
  const handleStartNextTrial = () => {
    if (!nextCase) return;
    setActiveTrialCaseId(nextCase.id);
    setIsReplayTrial(false);
  };

  // Replay a case from archive
  const handleReplayCase = (caseId: string) => {
    setActiveTrialCaseId(caseId);
    setIsReplayTrial(true);
    setActiveTab('court');
  };

  // Verdict reached
  const handleVerdictReached = (
    record: CompletedCaseRecord,
    statEffects: DefenseOption['statEffects'],
    newMood: PetMood
  ) => {
    if (!pet) return;

    // Update pet stats
    const updatedStats = {
      happiness: Math.min(100, Math.max(0, pet.stats.happiness + statEffects.happiness)),
      energy: Math.min(100, Math.max(0, pet.stats.energy + statEffects.energy)),
      trust: Math.min(100, Math.max(0, pet.stats.trust + statEffects.trust)),
      drama: Math.min(100, Math.max(0, pet.stats.drama + statEffects.drama))
    };

    setPet({
      ...pet,
      stats: updatedStats,
      mood: newMood
    });

    // Check if new case or replay
    if (!isReplayTrial) {
      const nextIndex = currentTrialIndex + 1;
      setCurrentTrialIndex(nextIndex);
      const newCompleted = [...completedCases, record];
      setCompletedCases(newCompleted);

      // Check case count for ending unlock
      if (newCompleted.length >= INITIAL_CASES.length) {
        setSecretEndingUnlocked(true);
        unlockAchievement('ach-lifetime-sentence', 'Friendship Is a Lifetime Sentence');
        showToast('🌟 Secret Ending Unlocked: Check the Final Verdict tab!');
      }

      // Check trial achievements
      if (record.stampType === 'INNOCENT' || record.stampType === 'PARDONED') {
        unlockAchievement('ach-innocent', 'Innocent Until Proven Guilty');
      }

      if (record.stampType === 'SILLY') {
        unlockAchievement('ach-vibes', 'No Thoughts, Just Vibes');
      }

      if (['case-003', 'case-004', 'case-007'].includes(record.caseId)) {
        unlockAchievement('ach-yapper', 'Professional Yapper');
      }

      const guiltyCount = newCompleted.filter((c) => c.stampType === 'GUILTY').length;
      if (guiltyCount >= 3) {
        unlockAchievement('ach-repeat-offender', 'Repeat Offender');
      }
      if (guiltyCount >= 5) {
        unlockAchievement('ach-tiny-criminal', 'Tiny Criminal');
      }
    }
  };

  // Pet Care Interactions
  const handleFeedSnack = (snack: SnackItem) => {
    if (!pet) return;
    const newTimesFed = timesFed + 1;
    setTimesFed(newTimesFed);

    if (newTimesFed >= 3) {
      unlockAchievement('ach-snacker', 'Chief Snacker');
    }

    setPet({
      ...pet,
      mood: 'happy',
      stats: {
        ...pet.stats,
        happiness: Math.min(100, pet.stats.happiness + snack.effects.happiness),
        energy: Math.min(100, pet.stats.energy + snack.effects.energy),
        trust: Math.min(100, pet.stats.trust + snack.effects.trust)
      }
    });

    showToast(`Fed ${pet.name} a ${snack.name}!`);
  };

  const handlePetJudge = () => {
    if (!pet) return;
    setTimesPetted((c) => c + 1);

    setPet({
      ...pet,
      mood: 'happy',
      stats: {
        ...pet.stats,
        happiness: Math.min(100, pet.stats.happiness + 6),
        trust: Math.min(100, pet.stats.trust + 4)
      }
    });
  };

  const handleMiniGameComplete = (score: number) => {
    if (!pet) return;
    if (score > miniGameHighScore) {
      setMiniGameHighScore(score);
    }

    if (score >= 5) {
      unlockAchievement('ach-mini-game', 'Gavel Virtuoso');
    }

    // Award rewards
    const happinessBonus = score * 4;
    const trustBonus = score * 3;

    setPet({
      ...pet,
      mood: score >= 3 ? 'happy' : pet.mood,
      stats: {
        ...pet.stats,
        happiness: Math.min(100, pet.stats.happiness + happinessBonus),
        trust: Math.min(100, pet.stats.trust + trustBonus)
      }
    });

    // Unlock special party hat accessory if score >= 4
    if (score >= 4 && !unlockedAccessories.includes('hat-party')) {
      setUnlockedAccessories((prev) => [...prev, 'hat-party']);
      showToast('🎉 Unlocked Party Hat in the Wardrobe!');
    }
  };

  const handleAddAccusation = (acc: CustomAccusation) => {
    setCustomAccusations((prev) => [acc, ...prev]);
    showToast(`Accusation filed against ${acc.defendant}!`);
  };

  const handleResetGame = () => {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch {
      // storage error
    }
    setPlayerName('');
    setPet(null);
    setCurrentTrialIndex(0);
    setCompletedCases([]);
    setCustomAccusations([]);
    setUnlockedAchievements([]);
    setUnlockedAccessories([
      'hat-judge-wig',
      'eyewear-spectacles',
      'neck-bowtie',
      'desk-tea'
    ]);
    setSecretEndingUnlocked(false);
    setActiveTab('court');
    setActiveTrialCaseId(null);
    showToast('Court records cleared. Starting fresh!');
  };

  // Build achievement objects with unlock statuses
  const achievementsList = INITIAL_ACHIEVEMENTS.map((a) => ({
    ...a,
    unlocked: unlockedAchievements.includes(a.id)
  }));

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F0E6] text-[#292C26] font-pixel text-xs">
        Loading The Friendship Court...
      </div>
    );
  }

  // Not adopted yet -> Show Premise & Adoption
  if (!pet) {
    return <IntroAdoption onComplete={handleAdoptPet} />;
  }

  // Currently active case object if in trial
  const activeCaseObject = activeTrialCaseId
    ? INITIAL_CASES.find((c) => c.id === activeTrialCaseId) || null
    : null;

  return (
    <div className="min-h-screen bg-[#F5F0E6] text-[#292C26] flex flex-col justify-between selection:bg-[#E9D99A]">
      {/* Toast Notification */}
      {toastNotification && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-[#292C26] text-[#FAF6EE] px-4 py-2 border-2 border-[#E9D99A] font-pixel text-xs shadow-[3px_3px_0px_#292C26] animate-subtle-bounce">
          {toastNotification}
        </div>
      )}

      {/* Main Top Navigation */}
      <GameNavigation
        activeTab={activeTab}
        onSelectTab={(t) => {
          setActiveTrialCaseId(null); // exit trial mode if navigating
          setActiveTab(t);
        }}
        secretEndingUnlocked={secretEndingUnlocked}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onOpenSettings={() => setIsSettingsOpen(true)}
        pet={pet}
      />

      {/* Body Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-4">
        {/* Persistent Pet Stats Bar */}
        <PetStatsBar stats={pet.stats} mood={pet.mood} />

        {/* ACTIVE TRIAL VIEW (if a trial is currently being conducted) */}
        {activeCaseObject ? (
          <TrialScreen
            currentCase={activeCaseObject}
            pet={pet}
            playerName={playerName}
            onVerdictReached={handleVerdictReached}
            onCloseTrial={() => setActiveTrialCaseId(null)}
            isReplay={isReplayTrial}
          />
        ) : (
          /* TAB ROUTING */
          <>
            {activeTab === 'court' && (
              <CourtroomScene
                pet={pet}
                playerName={playerName}
                nextCase={nextCase}
                completedCases={completedCases}
                totalCasesCount={INITIAL_CASES.length}
                onStartTrial={handleStartNextTrial}
                onOpenPetRoom={() => setActiveTab('pet_room')}
                onOpenAccusations={() => setActiveTab('accuse')}
                onOpenEnding={() => {
                  unlockAchievement('ach-justice-served', 'Justice Has Been Served');
                  setActiveTab('certificate');
                }}
                onPetClick={handlePetJudge}
              />
            )}

            {activeTab === 'pet_room' && (
              <PetRoom
                pet={pet}
                unlockedAccessories={unlockedAccessories}
                onUpdatePet={(updated) => setPet({ ...pet, ...updated })}
                onFeedSnack={handleFeedSnack}
                onPetJudge={handlePetJudge}
                onMiniGameComplete={handleMiniGameComplete}
              />
            )}

            {activeTab === 'archive' && (
              <CaseArchive
                completedCases={completedCases}
                onReplayCase={handleReplayCase}
              />
            )}

            {activeTab === 'achievements' && (
              <AchievementCollection achievements={achievementsList} />
            )}

            {activeTab === 'accuse' && (
              <AccusationForm
                pet={pet}
                playerName={playerName}
                customAccusations={customAccusations}
                onAddAccusation={handleAddAccusation}
              />
            )}

            {activeTab === 'certificate' && (
              <FinalCertificate
                pet={pet}
                playerName={playerName}
                personalFriendMessage={personalFriendMessage}
                onUpdatePersonalMessage={setPersonalFriendMessage}
                onReplayEnding={() => {
                  sound.playFanfare();
                  showToast('Replaying final friendship verdict!');
                }}
                onBackToCourt={() => setActiveTab('court')}
              />
            )}
          </>
        )}
      </main>

      {/* Quiet Indie Footer */}
      <footer className="border-t border-[#77614D]/25 bg-[#FAF6EE] py-3 px-4 text-center text-xs text-[#77614D] print:hidden">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span className="font-pixel text-[10px]">
            The Friendship Court · A Handcrafted Friendship Simulator
          </span>
          <span className="text-[11px]">
            Presided over by {pet.name} · All verdicts are final and irrevocable
          </span>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onResetGame={handleResetGame}
      />
    </div>
  );
}
