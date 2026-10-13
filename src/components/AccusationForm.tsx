import React, { useState } from 'react';
import { CustomAccusation, PetProfile, VerdictStampType } from '../types/game';
import { sound } from '../utils/audio';

interface AccusationFormProps {
  pet: PetProfile;
  playerName: string;
  customAccusations: CustomAccusation[];
  onAddAccusation: (accusation: CustomAccusation) => void;
}

export const AccusationForm: React.FC<AccusationFormProps> = ({
  pet,
  playerName,
  customAccusations,
  onAddAccusation
}) => {
  const [defendant, setDefendant] = useState(playerName);
  const [accusationText, setAccusationText] = useState('');
  const [category, setCategory] = useState<CustomAccusation['category']>('Friendship Crimes');
  const [severity, setSeverity] = useState<CustomAccusation['severity']>('Code Red Shenanigans');
  const [activeAccusation, setActiveAccusation] = useState<CustomAccusation | null>(null);

  const categories: CustomAccusation['category'][] = [
    'Friendship Crimes',
    'Crimes Against Common Sense',
    'Emotional Damage',
    'Suspicious Behaviour',
    'Other Crimes'
  ];

  const severities: CustomAccusation['severity'][] = [
    'Mild Teasing',
    'Unforgivable Betrayal',
    'Code Red Shenanigans',
    'Catastrophic Silly'
  ];

  // Algorithmic verdict generator tailored to pet personality & severity
  const generateVerdict = (
    defText: string,
    cat: CustomAccusation['category'],
    sev: CustomAccusation['severity']
  ): { title: string; text: string; stamp: VerdictStampType } => {
    const stamps: VerdictStampType[] = ['GUILTY', 'SILLY', 'SENTENCED', 'PARDONED'];
    const selectedStamp = stamps[Math.floor(Math.random() * stamps.length)];

    const titles: Record<string, string[]> = {
      'Friendship Crimes': [
        'CONVICTED OF UNREGISTERED MISCHIEF',
        'OFFICIALLY GUILTY OF SHENANIGANS',
        'PARDONED UNDER THE DUMB MISTAKE CLAUSE'
      ],
      'Crimes Against Common Sense': [
        'FELONIOUS DEFICIT OF LOGIC',
        'ACQUITTED DUE TO CHARMING NONSENSE',
        'SENTENCED TO FIVE MINUTES OF SILENT REFLECTION'
      ],
      'Emotional Damage': [
        'HEINOUS INFLICTION OF GASPING',
        'OVERRULED: DRAMATIC LICENSE REVOKED',
        'SENTENCED TO SENDING APOLOGY SWEETS'
      ],
      'Suspicious Behaviour': [
        'CODE RED FORENSIC AUDIT ORDERED',
        'CLEAR CASE OF SNEAKINESS IN THE FIRST DEGREE',
        'DISMISSED WITH WATERFOWL SKEPTICISM'
      ],
      'Other Crimes': [
        'EXTRAORDINARY CITATION OF SILLINESS',
        'THE BENCH REMAINS BAFFLED BUT AMUSED',
        'MANDATORY BEST FRIEND RETRACTION ISSUED'
      ]
    };

    const chosenTitleList = titles[cat] || titles['Friendship Crimes'];
    const title = chosenTitleList[Math.floor(Math.random() * chosenTitleList.length)];

    let commentary = '';
    if (pet.species === 'frog') {
      commentary = `The Amphibian Bench has reviewed: "${defText}". Under severity rating [${sev}], Lord ${pet.name} determines that while this constitutes questionable behavior, a bribe of iced tea or biscuits will suffice to expunge the record.`;
    } else if (pet.species === 'cat') {
      commentary = `Justice ${pet.name} gasps theatrically at the allegation: "${defText}". This is a [${sev}] offense! I have pushed three pens off the desk in moral outrage. The defendant must provide chin scratches immediately.`;
    } else {
      commentary = `Detective ${pet.name} has aggressively tapped their clipboard regarding: "${defText}". A [${sev}] violation has been confirmed by duck forensics. Quack! Sentence: permanent friend duty.`;
    }

    return {
      title,
      text: commentary,
      stamp: selectedStamp
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accusationText.trim()) return;

    sound.playGavel();

    const verdictResult = generateVerdict(accusationText, category, severity);

    const newAccusation: CustomAccusation = {
      id: `acc-${Date.now()}`,
      defendant: defendant.trim() || playerName,
      accusation: accusationText.trim(),
      category,
      severity,
      verdictTitle: verdictResult.title,
      verdictText: verdictResult.text,
      stampType: verdictResult.stamp,
      filedAt: new Date().toLocaleDateString()
    };

    onAddAccusation(newAccusation);
    setActiveAccusation(newAccusation);
    setAccusationText('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-[#FAF6EE] border-2 border-[#292C26] p-4 flex flex-wrap items-center justify-between gap-4 shadow-[2px_2px_0px_#292C26]">
        <div>
          <h2 className="font-pixel text-base text-[#292C26]">
            File a Friendship Accusation
          </h2>
          <p className="text-xs text-[#77614D] mt-0.5">
            Submit a real-life inside joke or lighthearted grievance for instant courtroom adjudication.
          </p>
        </div>
        <span className="font-pixel text-[10px] bg-[#E9D99A] text-[#292C26] px-2 py-1 border border-[#292C26]">
          100% Fictional & Humorous
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Form Input (6 cols) */}
        <div className="md:col-span-6 parchment-sheet p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-pixel text-xs text-[#292C26] mb-1">
                Defendant Name:
              </label>
              <input
                type="text"
                required
                value={defendant}
                onChange={(e) => setDefendant(e.target.value)}
                placeholder="Name of your friend..."
                className="w-full bg-[#FAF6EE] border-2 border-[#292C26] px-3 py-2 text-xs focus:outline-none focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-pixel text-xs text-[#292C26] mb-1">
                The Alleged Crime / Accusation:
              </label>
              <textarea
                required
                rows={3}
                value={accusationText}
                onChange={(e) => setAccusationText(e.target.value)}
                placeholder="e.g. Ate the last dumpling without making eye contact..."
                className="w-full bg-[#FAF6EE] border-2 border-[#292C26] p-2.5 text-xs focus:outline-none focus:bg-white resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-pixel text-[10px] text-[#77614D] uppercase mb-1">
                  Crime Category:
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CustomAccusation['category'])}
                  className="w-full bg-[#FAF6EE] border-2 border-[#292C26] p-1.5 text-xs focus:outline-none"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-pixel text-[10px] text-[#77614D] uppercase mb-1">
                  Severity Level:
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as CustomAccusation['severity'])}
                  className="w-full bg-[#FAF6EE] border-2 border-[#292C26] p-1.5 text-xs focus:outline-none"
                >
                  {severities.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="pixel-btn w-full bg-[#344B3A] text-white font-pixel text-xs py-3 cursor-pointer hover:bg-[#2A3E2F]"
            >
              Hammer Gavel & Adjudicate →
            </button>
          </form>
        </div>

        {/* Live / Last Verdict Docket (6 cols) */}
        <div className="md:col-span-6 space-y-4">
          {activeAccusation ? (
            <div className="parchment-sheet p-6 space-y-4 border-2 border-[#292C26] shadow-[3px_3px_0px_#292C26] animate-subtle-bounce">
              <div className="flex items-start justify-between border-b border-[#77614D]/40 pb-3">
                <div>
                  <span className="font-pixel text-[10px] text-[#77614D] uppercase">
                    Official Docket · {activeAccusation.category}
                  </span>
                  <h3 className="font-pixel text-sm text-[#292C26] mt-1">
                    Defendant: {activeAccusation.defendant}
                  </h3>
                </div>

                <div className="rubber-stamp text-xs rotate-[-5deg] text-[#A83232] border-[#A83232]">
                  {activeAccusation.stampType}
                </div>
              </div>

              <div>
                <span className="font-pixel text-[10px] text-[#77614D] uppercase block mb-1">
                  The Accusation:
                </span>
                <p className="text-xs bg-[#FAF6EE] p-3 border border-[#292C26] italic">
                  "{activeAccusation.accusation}"
                </p>
              </div>

              <div>
                <span className="font-pixel text-[10px] text-[#77614D] uppercase block mb-1">
                  Judicial Ruling:
                </span>
                <div className="p-3 bg-[#FFFDF9] border border-[#77614D]/40 space-y-1">
                  <h4 className="font-pixel text-xs text-[#292C26]">
                    {activeAccusation.verdictTitle}
                  </h4>
                  <p className="text-xs text-[#292C26] leading-relaxed">
                    {activeAccusation.verdictText}
                  </p>
                </div>
              </div>

              <div className="text-[10px] font-pixel text-[#77614D] pt-2 text-right">
                Filed on {activeAccusation.filedAt}
              </div>
            </div>
          ) : (
            <div className="parchment-sheet p-8 text-center text-xs text-[#77614D] space-y-2">
              <div className="text-2xl">⚖️</div>
              <p>Fill out the accusation form on the left to obtain an official verdict from {pet.name}.</p>
            </div>
          )}

          {/* Past Filed Accusations List */}
          {customAccusations.length > 0 && (
            <div className="bg-[#FAF6EE] border-2 border-[#292C26] p-4 space-y-2">
              <h4 className="font-pixel text-xs text-[#292C26] mb-2">
                Previously Filed Accusations ({customAccusations.length})
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
                {customAccusations.map((acc) => (
                  <div
                    key={acc.id}
                    onClick={() => {
                      sound.playPaper();
                      setActiveAccusation(acc);
                    }}
                    className="p-2 bg-[#FFFDF9] border border-[#292C26] cursor-pointer hover:bg-[#FAF0DA] flex items-center justify-between"
                  >
                    <div className="truncate pr-2">
                      <span className="font-pixel text-[10px] text-[#77614D]">
                        {acc.defendant}:
                      </span>{' '}
                      <span className="italic">{acc.accusation}</span>
                    </div>
                    <span className="font-pixel text-[9px] px-1 bg-[#E9D99A] border border-[#292C26] shrink-0">
                      {acc.stampType}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
