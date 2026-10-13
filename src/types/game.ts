export type PetSpecies = 'frog' | 'cat' | 'duck';

export type PetMood = 'happy' | 'suspicious' | 'dramatic' | 'sleepy' | 'angry';

export interface PetStats {
  happiness: number; // 0 - 100
  energy: number;    // 0 - 100
  trust: number;     // 0 - 100
  drama: number;     // 0 - 100
}

export interface PetProfile {
  species: PetSpecies;
  name: string;
  title: string;
  stats: PetStats;
  mood: PetMood;
  equippedAccessories: {
    hat?: string;
    eyewear?: string;
    neck?: string;
    desk?: string;
  };
}

export interface CaseExhibit {
  label: string; // e.g. "Exhibit A"
  description: string;
}

export type VerdictStampType = 'GUILTY' | 'INNOCENT' | 'PARDONED' | 'SENTENCED' | 'SILLY';

export interface DefenseOption {
  id: string;
  text: string;
  verdictTitle: string;
  verdictText: string;
  stampType: VerdictStampType;
  statEffects: {
    happiness: number;
    energy: number;
    trust: number;
    drama: number;
  };
  judgeReactionMood: PetMood;
  judgeQuote: {
    frog: string;
    cat: string;
    duck: string;
  };
}

export interface TrialCase {
  id: string;
  caseNumber: string;
  title: string;
  subtitle: string;
  description: string;
  exhibits: CaseExhibit[];
  defenses: DefenseOption[];
}

export interface CompletedCaseRecord {
  caseId: string;
  caseNumber: string;
  title: string;
  chosenDefenseText: string;
  verdictTitle: string;
  verdictText: string;
  stampType: VerdictStampType;
  completedAt: string;
  petMoodAtVerdict: PetMood;
}

export interface CustomAccusation {
  id: string;
  defendant: string;
  accusation: string;
  category: 'Friendship Crimes' | 'Crimes Against Common Sense' | 'Emotional Damage' | 'Suspicious Behaviour' | 'Other Crimes';
  severity: 'Mild Teasing' | 'Unforgivable Betrayal' | 'Code Red Shenanigans' | 'Catastrophic Silly';
  verdictTitle: string;
  verdictText: string;
  stampType: VerdictStampType;
  filedAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface Accessory {
  id: string;
  name: string;
  slot: 'hat' | 'eyewear' | 'neck' | 'desk';
  description: string;
  icon: string;
  unlockedByDefault: boolean;
}

export type ActiveTab = 'court' | 'pet_room' | 'archive' | 'achievements' | 'accuse' | 'certificate';

export interface GameSaveData {
  playerName: string;
  pet: PetProfile;
  currentTrialIndex: number;
  completedCases: CompletedCaseRecord[];
  customAccusations: CustomAccusation[];
  unlockedAchievements: string[];
  unlockedAccessories: string[];
  soundEnabled: boolean;
  secretEndingUnlocked: boolean;
  timesPetted: number;
  timesFed: number;
  miniGameHighScore: number;
  personalFriendMessage: string;
}
