import { PetSpecies, PetMood } from '../types/game';

export interface PetDialogueSet {
  idle: string[];
  click: string[];
  feeding: string[];
  petting: string[];
  resting: string[];
  playing: string[];
  accusation: string[];
  moods: Record<PetMood, string[]>;
}

export const PET_DIALOGUES: Record<PetSpecies, PetDialogueSet> = {
  frog: {
    idle: [
      'You have entered the court. I hope you brought snacks.',
      'Objection! That excuse was embarrassing.',
      'I am a professional. A professional who accepts bribes in the form of biscuits.',
      'I have reviewed the evidence and unfortunately you remain a little suspicious.',
      'Your friendship has been renewed for another 500 business years.',
      'Please stop clicking me. I have a very important nap scheduled.',
      'Justice is blind, but I have excellent hearing and I heard everything.',
      'The defendant is guilty of being annoying. Sentence: friendship.',
      'A true friend shares the warm rock near the pond.',
      'Blinking slowly at the court proceedings... fascinating.'
    ],
    click: [
      'Ribbit! My judicial robes are freshly pressed!',
      'Do not poke the judge. It violates Article 12 of Pond Law.',
      'Yes, yes, I am small, but my gavel hits hard.',
      'Is that a crumb in your pocket or are you just happy to see justice?',
      '*Blinks both eyes simultaneously in deep contemplation*'
    ],
    feeding: [
      'Mmm. An acceptable tribute to the bench.',
      'A crunchy bribe! The defendant\'s standing has improved.',
      'Delicious. Your friendship karma is temporarily pristine.',
      'Munch munch... justice tastes like sourdough.'
    ],
    petting: [
      'Ribbit... that is surprisingly soothing.',
      'Gentle head pats are authorized by executive order.',
      'A peaceful moment on the lily pad bench.',
      '*Content froggy sigh*'
    ],
    resting: [
      'Zzz... dreaming of giant dragonflies and peaceful dockets...',
      'Court is in recess. Wake me up only for snacks.',
      'The judge is recharging their supreme wisdom.'
    ],
    playing: [
      'Rapid gavel reflexes! Keep your eyes on the bench!',
      'A spirited debate! My frog reflexes are unmatched!',
      'Order! Order in the lily pond!'
    ],
    accusation: [
      'A new grievance! Let me polish my spectacles and review.',
      'This allegation smells of mild mischief and strong drama.',
      'The evidence has arrived. Let us evaluate the absurdity.'
    ],
    moods: {
      happy: [
        'Justice has prevailed! The pond is at peace.',
        'Feeling splendid. I might pardon everyone today.',
        'High happiness levels detected. Friendship status: optimal.'
      ],
      suspicious: [
        'I am squinting at you through my amphibious lenses.',
        'Something in this case does not add up, tadpole.',
        'Very suspicious activity. My webbed feet are tingling.'
      ],
      dramatic: [
        'The tension in this courtroom could cut a lily pad!',
        'A crisis of epic proportions! Bring me my ceremonial fan!',
        'The drama! The scandal! The pure theater!'
      ],
      sleepy: [
        'Zzz... yawn... the gavel feels very heavy right now...',
        'I require a 20-minute judicial slumber immediately.',
        'Closing eyes... still listening to your defense with one ear...'
      ],
      angry: [
        'Ribbit! Silence in the courtroom! Silence, I say!',
        'Contempt of court! Where are my judicial snacks?!',
        'Do not test the patience of a judge with webbed toes!'
      ]
    }
  },
  cat: {
    idle: [
      'Justice is blind, but I see you haven\'t complimented my fur today.',
      'I am preparing to knock your case file off the bench. Try to stop me.',
      'Objection! That defense was offensive to my artistic sensibilities.',
      'I demand 300 treats or this court will adjourn indefinitely.',
      'Your sentence is to scratch behind my ears for twelve minutes.',
      'I am the law, the jury, and the cutest living organism in this room.',
      'A misdemeanor? How pedestrian. Bring me grand drama!',
      'The court finds you guilty of not giving me enough attention.'
    ],
    click: [
      'Meow! Do you dare touch the sacred fur of justice?!',
      'Purr... okay, but only three clicks. Four is an attack.',
      'Watch the tail! It has its own legal jurisdiction!',
      '*Dramatically swats at your cursor with a paw*',
      'I am calculating whether to pardon you or scratch the couch.'
    ],
    feeding: [
      'Finally! Royal tribute worthy of this courtroom!',
      'Nom nom nom... you may remain on the premises.',
      'A fine delicacy. I shall reduce your sentence by three seconds.',
      'Exquisite! I purr in approval of this snack transaction!'
    ],
    petting: [
      'Purrrrrr... justice has never felt so warm.',
      'Behind the left ear, peasant. Yes, right there.',
      'You are officially granted royal petting privileges.',
      '*Kneading paws softly against the mahogany desk*'
    ],
    resting: [
      'Zzz... curling into a fuzzy donut of absolute power...',
      'Do not dare disturb the feline slumber of state.',
      'Sleeping 18 hours today is constitutionally protected.'
    ],
    playing: [
      'Pounce! My judicial reflexes are laser-guided!',
      'Gasp! Did you see that magnificent swat?!',
      'The prosecution cannot outrun my paws!'
    ],
    accusation: [
      'Ooooh, drama! Spill the tea, my dear human!',
      'A juicy crime! Fetch my magnifying glass and tea!',
      'Let us dissect this betrayal with razor-sharp claws!'
    ],
    moods: {
      happy: [
        'Purring intensely. Everything in the universe is satisfactory.',
        'You are my chosen subject and favorite human.',
        'Basking in the golden sunlight of righteous victory!'
      ],
      suspicious: [
        'My pupils are widening into dark voids of suspicion.',
        'You\'re hiding something. Did you buy treats and not share?',
        'Tail twitching with forensic skepticism.'
      ],
      dramatic: [
        'Gasp! I am clutching my pearls and fainting onto the rug!',
        'The betrayal! The sheer, unadulterated perfidy!',
        'Someone fetch the opera orchestra! I must lament!'
      ],
      sleepy: [
        'Yaaaaawn... stretch... my royal eyelids are heavy...',
        'Curling up directly on top of the case evidence...',
        'Recess. The honorable judge is taking a catnap.'
      ],
      angry: [
        'Hiss! How dare you present such insolence to the bench?!',
        'I am about to push this entire stack of law books off the edge!',
        'Furious tail lash! You are on thin judicial ice!'
      ]
    }
  },
  duck: {
    idle: [
      'QUACK! The court is in session! All rise or sit or whatever!',
      'I am investigating every unread message you have ever sent.',
      'My clipboard has documented 47 separate friendship infractions.',
      'Bread crumbs are the official legal currency of this tribunal.',
      'I suspect foul play. Pun 100% intended, do not laugh.',
      'Waddling into the room with undisputed moral superiority.',
      'Justice never sleeps, and neither do suspicious waterfowl.',
      'The defendant looks like someone who steals pens from banks.'
    ],
    click: [
      'Quack! Don\'t ruffle my legal feathers!',
      'Hands off the detective badge, civilian!',
      '*Aggressively points wing at the constitution*',
      'I saw that poke! It has been entered as Exhibit D!',
      'Preening my feathers... justice must look sharp.'
    ],
    feeding: [
      'BREAD?! CRACKERS?! GOBBLE GOBBLE GOBBLE!',
      'The duck tribunal accepts this magnificent grain tribute!',
      'Munch! A bribe of exquisite carbohydrate quality!',
      'Honk! My energy levels have reached critical zoom!'
    ],
    petting: [
      'Soft quacks... my downy feathers are soothed.',
      'Even a tough detective duck needs a warm chin scratch.',
      'Preening gently... you are an approved flock companion.',
      '*Flaps wings with quiet contentment*'
    ],
    resting: [
      'Zzz... head tucked under wing... still suspicious in my dreams...',
      'Recharging duck batteries... quack... zzz...',
      'Sleeping with one eye open to catch sneaky defendants.'
    ],
    playing: [
      'Waddle sprint! Catch the gavel before it drops!',
      'Quack quack! High speed aquatic courtroom action!',
      'Precision pecking! The court is in full swing!'
    ],
    accusation: [
      'A formal complaint! Let me inspect the stamps and seals!',
      'Foul deeds afoot! My detective beak is twitching!',
      'I shall interrogate this matter with uncompromising quacks!'
    ],
    moods: {
      happy: [
        'Flapping wings with joy! Justice is swimming smoothly!',
        'A splendid day for the pond and our great alliance!',
        'High spirits! I might grant everyone honorary bread!'
      ],
      suspicious: [
        'My left eye is squinting with forensic precision.',
        'Something smells fishy, and not the kind of fish I like to eat.',
        'Clipboard furiously scribbling notes about your posture.'
      ],
      dramatic: [
        'HONK! A crisis on the water! Sound the duck alarms!',
        'This scandal will shake the pond to its muddy core!',
        'Flapping wings in grand, sweeping gestures of outrage!'
      ],
      sleepy: [
        'Head nodding forward onto the judge desk... thud...',
        'Floating peacefully on a drift of dream crumbs...',
        'Yawning beak... time for a detective snooze...'
      ],
      angry: [
        'LOUD INDIGNANT QUACKING! CONTEMPT! CONTEMPT!',
        'My beak is vibrating with judicial fury!',
        'I am issuing a warrant for immediate tickling and fines!'
      ]
    }
  }
};

export const getRandomDialogue = (species: PetSpecies, mood: PetMood, action?: keyof PetDialogueSet): string => {
  const set = PET_DIALOGUES[species];
  if (action && Array.isArray(set[action])) {
    const arr = set[action] as string[];
    return arr[Math.floor(Math.random() * arr.length)];
  }
  // Try mood dialogues or idle
  const moodLines = set.moods[mood];
  if (Math.random() > 0.4 && moodLines && moodLines.length > 0) {
    return moodLines[Math.floor(Math.random() * moodLines.length)];
  }
  return set.idle[Math.floor(Math.random() * set.idle.length)];
};
