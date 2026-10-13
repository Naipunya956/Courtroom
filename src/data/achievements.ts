import { Achievement } from '../types/game';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-innocent',
    title: 'Innocent Until Proven Guilty',
    description: 'Win your first trial with an acquittal or pardon verdict.',
    icon: '⚖️',
    unlocked: false
  },
  {
    id: 'ach-yapper',
    title: 'Professional Yapper',
    description: 'Complete a conversation-related case (Case #003, #004, or #007).',
    icon: '🗣️',
    unlocked: false
  },
  {
    id: 'ach-repeat-offender',
    title: 'Repeat Offender',
    description: 'Receive three guilty verdicts in the court.',
    icon: '🔨',
    unlocked: false
  },
  {
    id: 'ach-judge-favourite',
    title: "The Judge's Favourite",
    description: 'Reach a high trust score of 85 or above with your pet judge.',
    icon: '⭐',
    unlocked: false
  },
  {
    id: 'ach-vibes',
    title: 'No Thoughts, Just Vibes',
    description: 'Select a particularly ridiculous defense (like "I plead silly").',
    icon: '🦆',
    unlocked: false
  },
  {
    id: 'ach-unsupervised',
    title: 'Legally Unsupervised',
    description: 'Unlock and equip a cozy accessory or courtroom decoration.',
    icon: '🎩',
    unlocked: false
  },
  {
    id: 'ach-lifetime-sentence',
    title: 'Friendship Is a Lifetime Sentence',
    description: 'Adjudicate and complete all 10 initial friendship court cases.',
    icon: '📜',
    unlocked: false
  },
  {
    id: 'ach-tiny-criminal',
    title: 'Tiny Criminal',
    description: 'Accumulate five guilty verdicts across your friendship trials.',
    icon: '🦝',
    unlocked: false
  },
  {
    id: 'ach-change-of-heart',
    title: 'A Change of Heart',
    description: "Improve the pet's happiness back to 70+ after it was feeling down.",
    icon: '💖',
    unlocked: false
  },
  {
    id: 'ach-justice-served',
    title: 'Justice Has Been Served',
    description: 'View the secret friendship ending and claim your official certificate.',
    icon: '🏆',
    unlocked: false
  },
  {
    id: 'ach-snacker',
    title: 'Chief Snacker',
    description: 'Feed your judge three or more delicious courtroom snacks.',
    icon: '🍪',
    unlocked: false
  },
  {
    id: 'ach-mini-game',
    title: 'Gavel Virtuoso',
    description: 'Score 5 or more in the Order in the Court mini-game.',
    icon: '⚡',
    unlocked: false
  }
];
