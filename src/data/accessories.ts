import { Accessory } from '../types/game';

export const ACCESSORIES: Accessory[] = [
  {
    id: 'hat-judge-wig',
    name: 'Powdered Judge Wig',
    slot: 'hat',
    description: 'Imparts 300% more legal authority and dignity to any tiny animal.',
    icon: '🧑‍⚖️',
    unlockedByDefault: true
  },
  {
    id: 'hat-tophat',
    name: 'Dapper Top Hat',
    slot: 'hat',
    description: 'For judges who appreciate old-world courtroom elegance.',
    icon: '🎩',
    unlockedByDefault: false
  },
  {
    id: 'hat-party',
    name: 'Party Cone Hat',
    slot: 'hat',
    description: 'For when court is legally declared to be in party mode.',
    icon: '🎉',
    unlockedByDefault: false
  },
  {
    id: 'eyewear-spectacles',
    name: 'Golden Spectacles',
    slot: 'eyewear',
    description: 'Enables micro-forensic scrutiny of fraudulent excuses.',
    icon: '👓',
    unlockedByDefault: true
  },
  {
    id: 'eyewear-cool',
    name: 'Pixel Sunglasses',
    slot: 'eyewear',
    description: 'For delivering savage verdicts with undeniable swagger.',
    icon: '🕶️',
    unlockedByDefault: false
  },
  {
    id: 'neck-bowtie',
    name: 'Crimson Bow Tie',
    slot: 'neck',
    description: 'Crisp, polite, and completely disarming.',
    icon: '🎀',
    unlockedByDefault: true
  },
  {
    id: 'neck-medal',
    name: 'Best Friend Medal',
    slot: 'neck',
    description: 'Solid brass medal awarded for exceptional loyalty.',
    icon: '🏅',
    unlockedByDefault: false
  },
  {
    id: 'desk-tea',
    name: 'Chamomile Tea Mug',
    slot: 'desk',
    description: 'Steaming herbal tea to soothe heated judicial debates.',
    icon: '🍵',
    unlockedByDefault: true
  },
  {
    id: 'desk-plant',
    name: 'Teapot Succulent',
    slot: 'desk',
    description: 'A tiny courtroom plant that never interrupts.',
    icon: '🪴',
    unlockedByDefault: false
  },
  {
    id: 'desk-gavel',
    name: 'Golden Gavel',
    slot: 'desk',
    description: 'Extremely shiny gavel that sounds satisfying upon wood.',
    icon: '🔨',
    unlockedByDefault: false
  }
];

export interface SnackItem {
  id: string;
  name: string;
  desc: string;
  icon: string;
  effects: {
    happiness: number;
    energy: number;
    trust: number;
  };
}

export const SNACKS: SnackItem[] = [
  {
    id: 'snack-biscuit',
    name: 'Lily Pad Biscuit',
    desc: 'Buttery, slightly green, seasoned with pond herbs.',
    icon: '🍪',
    effects: { happiness: 12, energy: 10, trust: 6 }
  },
  {
    id: 'snack-cracker',
    name: 'Goldfish Cracker',
    desc: 'Crisp, cheesy, delightfully bite-sized.',
    icon: '🐟',
    effects: { happiness: 10, energy: 12, trust: 5 }
  },
  {
    id: 'snack-bread',
    name: 'Sourdough Crust',
    desc: 'Chewy bakery delight prized by ducks and gourmands.',
    icon: '🍞',
    effects: { happiness: 14, energy: 8, trust: 8 }
  },
  {
    id: 'snack-cake',
    name: 'Petite Strawberry Cake',
    desc: 'Sweet royal treat topped with a tiny sugar star.',
    icon: '🍰',
    effects: { happiness: 22, energy: 15, trust: 14 }
  }
];
