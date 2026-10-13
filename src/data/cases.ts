import { TrialCase } from '../types/game';

export const INITIAL_CASES: TrialCase[] = [
  {
    id: 'case-001',
    caseNumber: 'CASE #001',
    title: 'The Disappearance Incident',
    subtitle: 'Unlawful Six-Hour Vanishing Act',
    description: 'The defendant has been accused of disappearing for six hours in the middle of a vital discussion without providing a satisfactory explanation.',
    exhibits: [
      { label: 'Exhibit A', description: 'Last active in chat 4 hours ago right after asking "wait what happened??"' },
      { label: 'Exhibit B', description: 'Witness spotted defendant posting an aesthetic Instagram story 12 minutes ago.' },
      { label: 'Exhibit C', description: 'Defendant claimed they were "busy doing laundry and staring at the wall."' }
    ],
    defenses: [
      {
        id: 'c1-d1',
        text: '"I was mentally offline and rebooting my soul."',
        verdictTitle: 'PARDONED ON GROUNDS OF EXISTENTIAL FATIGUE',
        verdictText: 'The court recognizes that the human operating system requires unannounced restarts. However, you owe your friend a complimentary meme.',
        stampType: 'PARDONED',
        statEffects: { happiness: 8, energy: -5, trust: 6, drama: -5 },
        judgeReactionMood: 'sleepy',
        judgeQuote: {
          frog: 'I too spend four hours blinking at lily pads. Case dismissed.',
          cat: 'Acceptable. Even I require 18 naps before replying to peasants.',
          duck: 'Suspicious, but I also forget how to float sometimes. You are free to waddle.'
        }
      },
      {
        id: 'c1-d2',
        text: '"I forgot how phones work and looked at the ceiling."',
        verdictTitle: 'GUILTY OF GROSS INCOMPETENCE',
        verdictText: 'Owning a $1,000 rectangle of glass and being outsmarted by a ceiling is an offense against modern friendship.',
        stampType: 'GUILTY',
        statEffects: { happiness: -4, energy: -2, trust: 4, drama: 12 },
        judgeReactionMood: 'suspicious',
        judgeQuote: {
          frog: 'The ceiling has provided zero biscuits. Your phone contains your friend.',
          cat: 'Gasp! A mortal defeated by a piece of drywall! The drama is magnificent!',
          duck: 'Quack! My clipboard notes show 0% logic and 100% procrastination!'
        }
      },
      {
        id: 'c1-d3',
        text: '"Your Honour, I plead silly."',
        verdictTitle: 'GUILTY OF SILLINESS IN THE FIRST DEGREE',
        verdictText: 'The silliness clause has been invoked. You cannot be imprisoned, but you are legally mandated to send three wholesome TikToks immediately.',
        stampType: 'SILLY',
        statEffects: { happiness: 15, energy: 5, trust: 10, drama: 8 },
        judgeReactionMood: 'happy',
        judgeQuote: {
          frog: 'The law has no defense against being a silly little guy. Verdict: friendship.',
          cat: 'How dare you be charming in my courtroom! I am forced to award you points.',
          duck: 'A ridiculous defense. Highly unprofessional. I love it.'
        }
      },
      {
        id: 'c1-d4',
        text: '"I refuse to elaborate."',
        verdictTitle: 'CONTEMPT OF FRIENDSHIP COURT',
        verdictText: 'The defendant chose pure mystery. Mystery is intriguing, but friendship dockets demand answers.',
        stampType: 'SENTENCED',
        statEffects: { happiness: -5, energy: 0, trust: -3, drama: 18 },
        judgeReactionMood: 'angry',
        judgeQuote: {
          frog: 'You cannot stonewall the amphibious bench! Sentence: buying iced coffee.',
          cat: 'Audacity! Unprecedented gall! Strike this from the record and fetch my fainting couch!',
          duck: 'Aggressive quacking! Silence does not fool this duck detective!'
        }
      }
    ]
  },
  {
    id: 'case-002',
    caseNumber: 'CASE #002',
    title: 'The Crime of Stealing Food',
    subtitle: 'The Notorious "I\'m Just Having One Fry" Heist',
    description: 'The defendant explicitly stated they were "not hungry," yet proceeded to consume 37% of the plaintiff\'s french fries, including the crispy golden ones.',
    exhibits: [
      { label: 'Exhibit A', description: 'Verbal contract: "No, don\'t order for me, I\'ll just have water."' },
      { label: 'Exhibit B', description: 'Greasy napkin recovered near defendant\'s hand.' },
      { label: 'Exhibit C', description: 'Plateful of fries reduced from a noble pyramid to sad soggy crumbs.' }
    ],
    defenses: [
      {
        id: 'c2-d1',
        text: '"Food tastes objectively better from someone else\'s plate."',
        verdictTitle: 'GUILTY OF THERMODYNAMIC FOOD THEFT',
        verdictText: 'Culinary physics confirm stolen fries contain 200% more flavor. However, grand larceny of carbohydrates remains deeply felonious.',
        stampType: 'GUILTY',
        statEffects: { happiness: 10, energy: 8, trust: 2, drama: 14 },
        judgeReactionMood: 'dramatic',
        judgeQuote: {
          frog: 'It is true. Stolen flies taste sweeter than court rations. But still: guilty!',
          cat: 'The highest crime in the feline constitution! Never touch the royal plate!',
          duck: 'Bread and fries belong to ducks, yet here you are thieving from your buddy!'
        }
      },
      {
        id: 'c2-d2',
        text: '"I was performing mandatory quality assurance."',
        verdictTitle: 'ACQUITTED AS OFFICIAL FRY INSPECTOR',
        verdictText: 'The defendant argues they were protecting the plaintiff from sodium toxicity. A completely brazen lie, but legally imaginative.',
        stampType: 'INNOCENT',
        statEffects: { happiness: 12, energy: 4, trust: 8, drama: -4 },
        judgeReactionMood: 'happy',
        judgeQuote: {
          frog: 'Quality assurance is a recognized civic duty. Case dismissed with dipping sauce.',
          cat: 'Clever peasant. You may inspect my treats next.',
          duck: 'A brilliant alibi. My detective instincts approve of thorough inspection.'
        }
      },
      {
        id: 'c2-d3',
        text: '"What is yours is mine, according to the Best Friend Pact of 2019."',
        verdictTitle: 'PARDONED BY SOCIAL CONTRACT',
        verdictText: 'The Court upholds Article 4 of the Friendship Treaty: all snacks within arm reach are communal property in times of emotional craving.',
        stampType: 'PARDONED',
        statEffects: { happiness: 14, energy: 6, trust: 15, drama: -8 },
        judgeReactionMood: 'happy',
        judgeQuote: {
          frog: 'The ancient treaties hold! Long live mutual carbohydrate distribution!',
          cat: 'Everything belongs to me anyway, so technically you both stole from me.',
          duck: 'The treaty stands. Mutual sharing promotes duck pond stability.'
        }
      },
      {
        id: 'c2-d4',
        text: '"I had low blood sugar and was fighting for my life."',
        verdictTitle: 'SENTENCED TO IMMEDIATE DESSERT PURCHASE',
        verdictText: 'If medical distress was genuinely imminent, defendant must reimburse plaintiff with a pastry of equal or superior delight.',
        stampType: 'SENTENCED',
        statEffects: { happiness: 4, energy: -2, trust: 5, drama: 6 },
        judgeReactionMood: 'suspicious',
        judgeQuote: {
          frog: 'Low blood sugar is solved with cake, not betrayal. Go buy them a treat.',
          cat: 'Medical drama! I swoon! You shall pay in sweet pastries posthaste.',
          duck: 'A suspect medical emergency! I smell bakery bribery!'
        }
      }
    ]
  },
  {
    id: 'case-003',
    caseNumber: 'CASE #003',
    title: 'Excessive Yapping in the Group Chat',
    subtitle: 'Eighteen Consecutive Audio Messages',
    description: 'The defendant submitted 14 consecutive voice memos averaging 2 minutes each, followed by 32 unpunctuated text messages about an acquaintance\'s dog.',
    exhibits: [
      { label: 'Exhibit A', description: 'Audio memo waveform resembling a seismic earthquake readout.' },
      { label: 'Exhibit B', description: 'The core revelation was that the acquaintance\'s dog sneezed twice.' },
      { label: 'Exhibit C', description: 'Victim\'s phone battery drained 40% from incoming push notifications.' }
    ],
    defenses: [
      {
        id: 'c3-d1',
        text: '"My narrative integrity required an unabridged director\'s cut."',
        verdictTitle: 'CONVICTED OF CINEMATIC YAPPING',
        verdictText: 'The court honors passionate storytelling, but reminds the defendant that podcasts require RSS feeds, not private DMs.',
        stampType: 'GUILTY',
        statEffects: { happiness: 12, energy: -4, trust: 10, drama: 16 },
        judgeReactionMood: 'dramatic',
        judgeQuote: {
          frog: 'Eighteen voice notes is longer than the Magna Carta. Slow down, tadpole.',
          cat: 'Bravo! A three-act theatrical masterpiece delivered via voice memo!',
          duck: 'Even the most talkative mallards take breaths between quacks!'
        }
      },
      {
        id: 'c3-d2',
        text: '"If I didn\'t tell you immediately, the lore would be lost forever."',
        verdictTitle: 'OFFICIAL FRIENDSHIP HISTORIAN PARDON',
        verdictText: 'Protecting the historical lore of trivial interpersonal drama is essential to cultural preservation.',
        stampType: 'PARDONED',
        statEffects: { happiness: 15, energy: 6, trust: 14, drama: -2 },
        judgeReactionMood: 'happy',
        judgeQuote: {
          frog: 'The chronicles must be protected. You are cleared of all charges.',
          cat: 'History is written by the loudest gossip. Carry on, scholar.',
          duck: 'Lore preservation is recognized in courtroom statutes. Stamped!'
        }
      },
      {
        id: 'c3-d3',
        text: '"I was speaking at 1.75x speed in real life, so technically it was brief."',
        verdictTitle: 'GUILTY OF ACOUSTIC SPEEDING',
        verdictText: 'Speeding violations apply to vocal cords. Defendant is sentenced to listen to a 5-minute silence break.',
        stampType: 'GUILTY',
        statEffects: { happiness: -2, energy: 8, trust: 3, drama: 8 },
        judgeReactionMood: 'suspicious',
        judgeQuote: {
          frog: 'Speeding in the lily pads! Where is your verbal radar detector?!',
          cat: 'My ears twitched at ultrasonic frequencies. I demand an apology purr.',
          duck: 'Quack quota exceeded by 400%. Fine: two handfuls of oats.'
        }
      },
      {
        id: 'c3-d4',
        text: '"You are literally my best friend, who else would I yap to?"',
        verdictTitle: 'INNOCENT BY EMOTIONAL EXCLUSIVITY',
        verdictText: 'A direct emotional hit on the judicial jury. Being the designated yap repository is the sacred burden of true friendship.',
        stampType: 'INNOCENT',
        statEffects: { happiness: 20, energy: 5, trust: 22, drama: -10 },
        judgeReactionMood: 'happy',
        judgeQuote: {
          frog: 'Ribbit... that touched my little amphibian heart. Unconditional acquittal.',
          cat: 'Ugh, stop making my cold heart warm! You win, you sentimental creature!',
          duck: 'The jury is crying. I am hiding a tear under my feathers. Case dismissed!'
        }
      }
    ]
  },
  {
    id: 'case-004',
    caseNumber: 'CASE #004',
    title: 'Leaving Messages on Read',
    subtitle: 'The Typing Bubble Vanishing Act',
    description: 'The defendant read an urgent query ("should I dye my hair pink or buy garlic bread"), triggered the typing bubble for 45 seconds, and then vanished forever.',
    exhibits: [
      { label: 'Exhibit A', description: 'Timestamp: "Read 2:14 PM". No follow-up until next Tuesday.' },
      { label: 'Exhibit B', description: 'Screenshot of three dancing typing dots that evaporated into thin air.' },
      { label: 'Exhibit C', description: 'Plaintiff experienced 4 hours of unwarranted spiral thinking.' }
    ],
    defenses: [
      {
        id: 'c4-d1',
        text: '"I replied in my head and genuinely thought we had a whole conversation."',
        verdictTitle: 'GUILTY OF TELEPATHIC PERJURY',
        verdictText: 'Mental telepathy has not yet been approved as a valid messaging protocol by the International Telecommunication Union.',
        stampType: 'GUILTY',
        statEffects: { happiness: 6, energy: -6, trust: 2, drama: 15 },
        judgeReactionMood: 'suspicious',
        judgeQuote: {
          frog: 'I also think thoughts. But thoughts do not ring notifications, friend.',
          cat: 'A ghost conversation! How spooky! Yet entirely inexcusable in law!',
          duck: 'If I quack in my head, do the ducks hear it? No! Send the text!'
        }
      },
      {
        id: 'c4-d2',
        text: '"I drafted the perfect witty reply and accidentally swiped out to pet a dog."',
        verdictTitle: 'PARDONED BY CANINE INTERVENTION',
        verdictText: 'Canine distractions constitute force majeure in all civil friendship jurisdictions.',
        stampType: 'PARDONED',
        statEffects: { happiness: 14, energy: 4, trust: 10, drama: -4 },
        judgeReactionMood: 'happy',
        judgeQuote: {
          frog: 'A dog was petted? The court pardons the interruption.',
          cat: 'Wait, a dog?! I object! It should have been a distinguished cat!',
          duck: 'Force majeure granted. Dogs are loud, but petting them is lawful.'
        }
      },
      {
        id: 'c4-d3',
        text: '"I was overwhelmed by the philosophical gravity of pink hair vs garlic bread."',
        verdictTitle: 'INNOCENT DUE TO HIGH STAKES',
        verdictText: 'Choosing between culinary perfection and cranial reinvention is indeed too momentous for a hasty reply.',
        stampType: 'INNOCENT',
        statEffects: { happiness: 10, energy: 2, trust: 12, drama: 0 },
        judgeReactionMood: 'happy',
        judgeQuote: {
          frog: 'Garlic bread is sacred. One does not rush garlic bread council.',
          cat: 'Both choices were dramatic! The contemplation was justified!',
          duck: 'A wise deliberation. Better late wisdom than premature foolishness.'
        }
      },
      {
        id: 'c4-d4',
        text: '"I saw the notification, got scared of my responsibilities, and put the phone in the freezer."',
        verdictTitle: 'SENTENCED TO EMOTIONAL DEFROSTING',
        verdictText: 'Refrigerating mobile hardware does not solve interpersonal anxiety, though it does keep the battery cool.',
        stampType: 'SENTENCED',
        statEffects: { happiness: 5, energy: -4, trust: 6, drama: 18 },
        judgeReactionMood: 'angry',
        judgeQuote: {
          frog: 'Do not freeze the phone. Frogs do not like frozen rectangles.',
          cat: 'Ice cold betrayal! You must provide three warm blankets in retribution!',
          duck: 'Freezer protocol is unhinged! The court orders therapy and snacks!'
        }
      }
    ]
  },
  {
    id: 'case-005',
    caseNumber: 'CASE #005',
    title: 'Making Plans and Cancelling Them',
    subtitle: 'The Bed-Gravity Defense',
    description: 'The defendant agreed to meet for boba and thrifting, but cancelled 42 minutes before departure citing "unforeseen atmospheric tiredness."',
    exhibits: [
      { label: 'Exhibit A', description: 'Plaintiff was already 65% dressed with shoes tied.' },
      { label: 'Exhibit B', description: 'Defendant\'s cancellation message featured 7 consecutive crying emojis.' },
      { label: 'Exhibit C', description: 'Live location revealed defendant was cocooned in a burrito blanket.' }
    ],
    defenses: [
      {
        id: 'c5-d1',
        text: '"The gravitational pull of my blanket exceeded escape velocity."',
        verdictTitle: 'CONVICTED OF PHYSICS-BASED COWARDICE',
        verdictText: 'Astrophysics acknowledges blanket gravity, but friendship requires overcoming the laws of inertia with a hoodie.',
        stampType: 'GUILTY',
        statEffects: { happiness: -2, energy: 10, trust: -4, drama: 15 },
        judgeReactionMood: 'dramatic',
        judgeQuote: {
          frog: 'Blanket cocoons are cozy, but boba is delicious. A tragic trade-off.',
          cat: 'I respect the blanket nap, yet I condemn the broken promise! 50/50 guilty!',
          duck: 'Your feathers stayed tucked when they should have waddled forth! Guilty!'
        }
      },
      {
        id: 'c5-d2',
        text: '"My social battery hit 2% and I was going to emit error beeps."',
        verdictTitle: 'PARDONED FOR BATTERY RECHARGE',
        verdictText: 'Running on reserve power threatens friendship stability. Prevention of total system shutdown is approved.',
        stampType: 'PARDONED',
        statEffects: { happiness: 10, energy: 8, trust: 8, drama: -6 },
        judgeReactionMood: 'sleepy',
        judgeQuote: {
          frog: 'Low battery must be honored. Take your rest on the warm mud rock.',
          cat: 'A dead battery produces dull companions. Nap now, entertain later.',
          duck: 'Safety first. A malfunctioning friend is dangerous to self and flock.'
        }
      },
      {
        id: 'c5-d3',
        text: '"I propose we reschedule to tomorrow and I pay for both drinks."',
        verdictTitle: 'SETTLEMENT APPROVED WITH BOBA RESTITUTION',
        verdictText: 'Financial compensation in tapioca pearl format satisfies the court\'s requirements for equity and justice.',
        stampType: 'INNOCENT',
        statEffects: { happiness: 18, energy: 2, trust: 20, drama: -12 },
        judgeReactionMood: 'happy',
        judgeQuote: {
          frog: 'Free drinks? The court approves of this equitable settlement.',
          cat: 'Bribery and boba! The highest ideals of friendship diplomacy!',
          duck: 'Court gavel banged! Case settled out of court with delicious bubbles!'
        }
      },
      {
        id: 'c5-d4',
        text: '"I looked in the mirror and my vibe was completely illegal today."',
        verdictTitle: 'SENTENCED TO AESTHETIC REHABILITATION',
        verdictText: 'Having an illegal vibe is not a legitimate defense, though the court appreciates self-awareness.',
        stampType: 'SENTENCED',
        statEffects: { happiness: 6, energy: -2, trust: 4, drama: 10 },
        judgeReactionMood: 'suspicious',
        judgeQuote: {
          frog: 'Every vibe is legal in my pond except bad vibes. Try again tomorrow.',
          cat: 'An ugly outfit is a misdemeanor. Cancelling plans over it is treason!',
          duck: 'Unacceptable! Pluck your feathers, straighten your cap, and march!'
        }
      }
    ]
  },
  {
    id: 'case-006',
    caseNumber: 'CASE #006',
    title: 'Being Dramatic Over Something Inconsequential',
    subtitle: 'The Tragic Spilling of Two Drops of Matcha',
    description: 'The defendant fell to the floor and declared their life ruined because a tiny drop of matcha splashed onto their sleeve.',
    exhibits: [
      { label: 'Exhibit A', description: 'The stain was 2 millimeters in diameter and entirely covered by a wristwatch.' },
      { label: 'Exhibit B', description: 'Defendant lay dramatically across the sofa gasping for air for 35 minutes.' },
      { label: 'Exhibit C', description: 'Oscar nomination petition filed by mutual acquaintances.' }
    ],
    defenses: [
      {
        id: 'c6-d1',
        text: '"Theater is my coping mechanism and the world is my stage."',
        verdictTitle: 'AWARDED ACADEMY AWARD FOR MELODRAMA',
        verdictText: 'The performance was moving, poignant, and completely unnecessary. The court gives it 4 out of 5 stars.',
        stampType: 'SILLY',
        statEffects: { happiness: 16, energy: -4, trust: 10, drama: 22 },
        judgeReactionMood: 'dramatic',
        judgeQuote: {
          frog: 'Ribbit! Encore! But please wipe your sleeve with a damp leaf.',
          cat: 'Magnificent! The anguish! The flair! You belong in the Royal Shakespeare Troupe!',
          duck: 'Oscar-worthy weeping over a stain smaller than a sesame seed!'
        }
      },
      {
        id: 'c6-d2',
        text: '"That sleeve was having the best day of its life until this tragedy."',
        verdictTitle: 'GUILTY OF SARTORIAL HYPERBOLE',
        verdictText: 'Textiles do not possess emotional lives, no matter how much thread count they have.',
        stampType: 'GUILTY',
        statEffects: { happiness: 4, energy: -2, trust: 6, drama: 14 },
        judgeReactionMood: 'suspicious',
        judgeQuote: {
          frog: 'The sleeve will survive. Wash it in lukewarm pond water.',
          cat: 'Nonsense, clothes have souls! But still, you are being ridiculous!',
          duck: 'My detective magnifying glass barely sees the stain! Absurd!'
        }
      },
      {
        id: 'c6-d3',
        text: '"I needed someone to baby me for half an hour."',
        verdictTitle: 'PARDONED FOR EMOTIONAL TENDER CARE',
        verdictText: 'Friendship includes the mandatory clause of pampering someone when they act like a dramatic baby.',
        stampType: 'PARDONED',
        statEffects: { happiness: 18, energy: 6, trust: 16, drama: -8 },
        judgeReactionMood: 'happy',
        judgeQuote: {
          frog: 'Honesty is virtuous. Here is a virtual warm tea for your baby behavior.',
          cat: 'Purr... sometimes even monarchs need to be swaddled in affection.',
          duck: 'A honest admission of neediness! Court grants unlimited head pats!'
        }
      },
      {
        id: 'c6-d4',
        text: '"I was testing your loyalty under extreme conditions."',
        verdictTitle: 'CONVICTED OF SHENANIGAN STAGECRAFT',
        verdictText: 'Testing friends with matcha drops violates standard friendship stress-test protocols.',
        stampType: 'SENTENCED',
        statEffects: { happiness: -4, energy: 2, trust: -5, drama: 16 },
        judgeReactionMood: 'angry',
        judgeQuote: {
          frog: 'Do not test friends with faux emergencies. Save the alarms for herons.',
          cat: 'How Machiavellian! Only I am permitted to test peasant loyalty!',
          duck: 'Failed the inspection! Fines issued across all quadrants!'
        }
      }
    ]
  },
  {
    id: 'case-007',
    caseNumber: 'CASE #007',
    title: 'Refusing to Share Gossip',
    subtitle: 'The "I\'ll Tell You Later When We Meet" Torture',
    description: 'The defendant texted "OMG YOU WON\'T BELIEVE WHAT HAPPENED WITH SARAH," and when asked what happened, replied "nvm remind me on Friday."',
    exhibits: [
      { label: 'Exhibit A', description: 'Plaintiff\'s heart rate escalated to 142 BPM upon reading the hook.' },
      { label: 'Exhibit B', description: 'Friday is currently 96 agonizing hours away.' },
      { label: 'Exhibit C', description: 'Defendant is currently peacefully eating a sandwich while plaintiff burns with curiosity.' }
    ],
    defenses: [
      {
        id: 'c7-d1',
        text: '"Gossip is an artisanal dish best served face-to-face with hand gestures."',
        verdictTitle: 'ACQUITTED ON ARTISANAL GOSSIP MERIT',
        verdictText: 'Text messages flatten the expressive nuance of dramatic hand gestures and gasps. Delaying for maximum impact is approved.',
        stampType: 'INNOCENT',
        statEffects: { happiness: 14, energy: 6, trust: 12, drama: 8 },
        judgeReactionMood: 'dramatic',
        judgeQuote: {
          frog: 'Theatrical timing is everything. Keep the tea brewing until Friday.',
          cat: 'Yes! Gossip requires dramatic pause, widened eyes, and claws extended!',
          duck: 'A masterclass in storytelling tension! The duck council will wait patiently.'
        }
      },
      {
        id: 'c7-d2',
        text: '"I actually forgot what the gossip was five seconds later."',
        verdictTitle: 'GUILTY OF MEMORY ATROPHY',
        verdictText: 'Broadcasting breaking news before securing the source material in permanent memory is journalistic negligence.',
        stampType: 'GUILTY',
        statEffects: { happiness: 2, energy: -4, trust: -2, drama: 18 },
        judgeReactionMood: 'suspicious',
        judgeQuote: {
          frog: 'How do you lose the fly after catching it?! Scandalous neglect!',
          cat: 'You provoked my royal curiosity and deliver nothing?! OFF WITH YOUR TOYS!',
          duck: 'Unprofessional reporting! Retract the headline immediately!'
        }
      },
      {
        id: 'c7-d3',
        text: '"I wanted to ensure you wouldn\'t cancel our Friday hangout."',
        verdictTitle: 'GUILTY OF MANIPULATIVE BRILLIANCE',
        verdictText: 'Using spicy gossip as collateral hostage to guarantee attendance is devious, morally dubious, and 100% effective.',
        stampType: 'SILLY',
        statEffects: { happiness: 12, energy: 4, trust: 15, drama: 10 },
        judgeReactionMood: 'happy',
        judgeQuote: {
          frog: 'Tactical friendship chess. You win this round, sneaky creature.',
          cat: 'Diabolical. I must take notes on this strategic hostage method.',
          duck: 'Devious duck tactics! Unethical, but mathematically genius!'
        }
      },
      {
        id: 'c7-d4',
        text: '"The government intercepted my tea and I was legally gagged."',
        verdictTitle: 'SENTENCED FOR CONSPIRACY THEORIES',
        verdictText: 'No intelligence agency cares about what Sarah did at the farmers market. Spilling the tea is mandated.',
        stampType: 'SENTENCED',
        statEffects: { happiness: 5, energy: 0, trust: 4, drama: 12 },
        judgeReactionMood: 'angry',
        judgeQuote: {
          frog: 'The pond secret service has no file on Sarah. Speak up!',
          cat: 'Do not insult the royal court with secret agents! Spill the tea!',
          duck: 'False jurisdiction! I outrank the secret service here! Talk!'
        }
      }
    ]
  },
  {
    id: 'case-008',
    caseNumber: 'CASE #008',
    title: 'The Suspicious "I\'m Fine" Incident',
    subtitle: 'The Single-Period Passive-Aggressive Period',
    description: 'The defendant responded to "how are you feeling?" with "fine." Notice the sinister full-stop period and the total absence of emojis.',
    exhibits: [
      { label: 'Exhibit A', description: 'Single four-letter word: "Fine."' },
      { label: 'Exhibit B', description: 'Normal response baseline includes: 3 sparkly emojis and at least 2 exclamation marks.' },
      { label: 'Exhibit C', description: 'Plaintiff detected a 40-degree temperature drop through the smartphone screen.' }
    ],
    defenses: [
      {
        id: 'c8-d1',
        text: '"I was legitimately fine, my fingers were just cold."',
        verdictTitle: 'REJECTED: SUSPICIOUS CIRCUMSTANCES REMAIN',
        verdictText: 'Cold fingers do not account for passive-aggressive punctuation. Punctuation carries emotional weight in Friendship Court.',
        stampType: 'GUILTY',
        statEffects: { happiness: -4, energy: -2, trust: 2, drama: 16 },
        judgeReactionMood: 'suspicious',
        judgeQuote: {
          frog: 'Frogs know cold. Cold does not explain the dreaded single period.',
          cat: 'The icy chill of a lone dot! A knife in the back of true devotion!',
          duck: 'Suspicious! Highly suspicious! The forensic punctuation team disagrees!'
        }
      },
      {
        id: 'c8-d2',
        text: '"I was sad but didn\'t want to burden you because you\'re busy."',
        verdictTitle: 'OVERRULED: YOU ARE NEVER A BURDEN',
        verdictText: 'Under Article 1 of the Best Friends Codex: emotional burdens are shared freight. Holding sadness alone is an infraction.',
        stampType: 'INNOCENT',
        statEffects: { happiness: 18, energy: 6, trust: 24, drama: -12 },
        judgeReactionMood: 'happy',
        judgeQuote: {
          frog: 'Ribbit... best friends share the storm clouds. Never carry it alone.',
          cat: 'Nonsense! I am never too busy to listen to your dramatic suffering! Speak to me!',
          duck: 'Quack! Friendship means sharing the muddy pond together. Court hugs ordered!'
        }
      },
      {
        id: 'c8-d3',
        text: '"I meant to add a heart emoji but my thumbs slipped into the abyss."',
        verdictTitle: 'PARDONED WITH MANDATORY HUG REIMBURSEMENT',
        verdictText: 'Accidental period placement pardoned. Defendant must send at least 5 sparkly hearts in compensation.',
        stampType: 'PARDONED',
        statEffects: { happiness: 12, energy: 2, trust: 10, drama: -4 },
        judgeReactionMood: 'happy',
        judgeQuote: {
          frog: 'Thumbs are clumsy appendages. Pardon granted, deliver the hearts.',
          cat: 'A simple slip of the paw. You are granted royal clemency.',
          duck: 'Accidental typographical severity. Case dismissed with warmth.'
        }
      },
      {
        id: 'c8-d4',
        text: '"I was actively plotting world domination and had no time for pleasantries."',
        verdictTitle: 'SENTENCED TO COLLABORATIVE DOMINATION',
        verdictText: 'World domination plots must include your best friend as co-conspirator or second-in-command.',
        stampType: 'SENTENCED',
        statEffects: { happiness: 8, energy: 8, trust: 12, drama: 10 },
        judgeReactionMood: 'dramatic',
        judgeQuote: {
          frog: 'If we dominate the world, more ponds for everyone. I accept.',
          cat: 'I am the rightful supreme ruler, but you may be my prime minister.',
          duck: 'A conspiracy! Assemble the duck vanguard and conquer!'
        }
      }
    ]
  },
  {
    id: 'case-009',
    caseNumber: 'CASE #009',
    title: 'Sending Memes at Unreasonable Hours',
    subtitle: 'The 3:14 AM Instagram Reel Distribution',
    description: 'The defendant unleashed a barrage of 11 absurd short-form videos between 2:45 AM and 3:30 AM while plaintiff was in deep REM sleep.',
    exhibits: [
      { label: 'Exhibit A', description: 'Reel 1: A raccoon washing cotton candy in a puddle until it dissolves.' },
      { label: 'Exhibit B', description: 'Reel 7: A medieval lute cover of Crazy Frog.' },
      { label: 'Exhibit C', description: 'Plaintiff woke up at 6:45 AM and laughed so hard they spilled their cereal.' }
    ],
    defenses: [
      {
        id: 'c9-d1',
        text: '"Laughter knows no time zone and the algorithm waits for no man."',
        verdictTitle: 'ACQUITTED UNDER NOCTURNAL COMEDY RIGHTS',
        verdictText: 'Humor delivered at night matures like fine cheese, providing essential morning serotonin for waking souls.',
        stampType: 'INNOCENT',
        statEffects: { happiness: 16, energy: 4, trust: 15, drama: -4 },
        judgeReactionMood: 'happy',
        judgeQuote: {
          frog: 'Night bugs and night memes. The ecosystem thrives after midnight.',
          cat: '3 AM is prime zoomies hour! The reels were culturally essential!',
          duck: 'A dissolved cotton candy raccoon is critical world news at any hour.'
        }
      },
      {
        id: 'c9-d2',
        text: '"I literally saw it and thought of you immediately."',
        verdictTitle: 'COMMENDED FOR UNPROVOKED AFFECTION',
        verdictText: 'Being reminded of your friend by a bizarre video of an agitated opossum is the highest compliment in modern society.',
        stampType: 'PARDONED',
        statEffects: { happiness: 20, energy: 6, trust: 20, drama: -8 },
        judgeReactionMood: 'happy',
        judgeQuote: {
          frog: 'Thinking of friends while scrolling is wholesome frog behavior.',
          cat: 'Such devotion! Even during the holy hours of sleep, you think of them!',
          duck: 'Evidence of deep bonding! Quack! Case celebrated across all courts!'
        }
      },
      {
        id: 'c9-d3',
        text: '"Sleep is a social construct invented by mattress companies."',
        verdictTitle: 'GUILTY OF SLEEP DEPRIVATION ANARCHY',
        verdictText: 'While mattress marketing is aggressive, circadian rhythms are biologically real. Go to bed.',
        stampType: 'GUILTY',
        statEffects: { happiness: 6, energy: -10, trust: 4, drama: 14 },
        judgeReactionMood: 'sleepy',
        judgeQuote: {
          frog: 'Naps are sacred! Anyone fighting sleep is battling nature itself.',
          cat: 'Heresy! Sleep is the most glorious pursuit in the cosmos! Go to bed!',
          duck: 'Your feathers are uncombed because you stayed up watching raccoons!'
        }
      },
      {
        id: 'c9-d4',
        text: '"I was checking if you were asleep so we could do midnight crime."',
        verdictTitle: 'SENTENCED TO MIDNIGHT SNACK EXPEDITION',
        verdictText: 'Conspiring for midnight mischief is legally sanctioned only if snacks are procured within 20 minutes.',
        stampType: 'SENTENCED',
        statEffects: { happiness: 12, energy: 8, trust: 14, drama: 12 },
        judgeReactionMood: 'dramatic',
        judgeQuote: {
          frog: 'Midnight crimes must involve pancakes or fries. Stamped!',
          cat: 'Midnight prowling! I shall accompany you on this shadowy mission!',
          duck: 'Keep the heist quiet, or the park ranger ducks will intervene!'
        }
      }
    ]
  },
  {
    id: 'case-010',
    caseNumber: 'CASE #010',
    title: 'The Crime of Being an Irreplaceable Best Friend',
    subtitle: 'Grand Felony of Mutual Adoration',
    description: 'The defendant stands accused of being consistently supportive, making the plaintiff laugh until they wheeze, and making life significantly better just by existing.',
    exhibits: [
      { label: 'Exhibit A', description: 'Years of inside jokes that would make zero sense to any normal human.' },
      { label: 'Exhibit B', description: 'A shared emergency archive of mutual support during tough days.' },
      { label: 'Exhibit C', description: 'Irrefutable proof that nobody else could ever take this defendant\'s spot.' }
    ],
    defenses: [
      {
        id: 'c10-d1',
        text: '"I have no defense. You\'re stuck with me forever."',
        verdictTitle: 'SENTENCED TO PERMANENT LIFELONG FRIENDSHIP',
        verdictText: 'The defendant has confessed in full. There is no possibility of parole. You are bonded for the rest of eternity.',
        stampType: 'SENTENCED',
        statEffects: { happiness: 25, energy: 10, trust: 25, drama: -15 },
        judgeReactionMood: 'happy',
        judgeQuote: {
          frog: 'Gavel banged! A lifetime sentence of shared lily pads and unconditional loyalty.',
          cat: 'I pronounce you best friends for eternity! My royal seal has been set!',
          duck: 'The highest verdict in duck jurisprudence! Permanent, unbreakable friendship!'
        }
      },
      {
        id: 'c10-d2',
        text: '"It is my constitutional duty to be your favorite person."',
        verdictTitle: 'RATIFIED AS SUPREME BEST FRIEND',
        verdictText: 'The friendship constitution has been amended. Defendant\'s status as essential life companion is permanently codified.',
        stampType: 'INNOCENT',
        statEffects: { happiness: 22, energy: 8, trust: 22, drama: -10 },
        judgeReactionMood: 'happy',
        judgeQuote: {
          frog: 'A noble duty, executed with supreme distinction.',
          cat: 'Approved! You have proven worthy of this royal friendship covenant.',
          duck: 'All flags flying at full mast! An airtight case of pure camaraderie!'
        }
      },
      {
        id: 'c10-d3',
        text: '"I plead guilty, but only because you\'re equally wonderful."',
        verdictTitle: 'CONVICTED OF MUTUAL WHOLESOMENESS',
        verdictText: 'The court cannot handle this level of mutual sweetness without a diabetes warning. Both parties are sentenced to celebrate.',
        stampType: 'GUILTY',
        statEffects: { happiness: 24, energy: 10, trust: 24, drama: -12 },
        judgeReactionMood: 'happy',
        judgeQuote: {
          frog: 'Ribbit... my little eyes are watering. Sweetness overflow.',
          cat: 'Purrrrrr! My courtroom is melting with wholesome energy!',
          duck: 'Quack! The purest verdict ever entered into the friendship docket!'
        }
      },
      {
        id: 'c10-d4',
        text: '"Your Honour, can I order pizza to celebrate this verdict?"',
        verdictTitle: 'IMMEDIATE PIZZA MANDATE ISSUED',
        verdictText: 'The bench orders an immediate pizza feast. The crusts shall be dipped in garlic butter and the friendship shall endure forever.',
        stampType: 'SILLY',
        statEffects: { happiness: 25, energy: 12, trust: 20, drama: -8 },
        judgeReactionMood: 'happy',
        judgeQuote: {
          frog: 'Pizza is the universal symbol of judicial celebration. Extra mushrooms for me!',
          cat: 'Extra cheese for the royal judge! Court is officially in celebration mode!',
          duck: 'Crusts for the duck bench! Justice has never tasted so glorious!'
        }
      }
    ]
  }
];
