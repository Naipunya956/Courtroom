import React, { useState } from 'react';
import { CompletedCaseRecord } from '../types/game';
import { sound } from '../utils/audio';

interface CaseArchiveProps {
  completedCases: CompletedCaseRecord[];
  onReplayCase: (caseId: string) => void;
}

export const CaseArchive: React.FC<CaseArchiveProps> = ({
  completedCases,
  onReplayCase
}) => {
  const [selectedCase, setSelectedCase] = useState<CompletedCaseRecord | null>(
    completedCases.length > 0 ? completedCases[0] : null
  );
  const [filterStamp, setFilterStamp] = useState<string>('ALL');

  const filteredCases = completedCases.filter((c) => {
    if (filterStamp === 'ALL') return true;
    return c.stampType === filterStamp;
  });

  const getStampBadgeClass = (stamp: string) => {
    switch (stamp) {
      case 'INNOCENT':
      case 'PARDONED':
        return 'border-[#344B3A] text-[#344B3A] bg-[#788C68]/20';
      case 'GUILTY':
        return 'border-[#A83232] text-[#A83232] bg-[#A83232]/10';
      case 'SENTENCED':
        return 'border-[#77614D] text-[#77614D] bg-[#E9D99A]/20';
      case 'SILLY':
      default:
        return 'border-[#D97B48] text-[#D97B48] bg-[#D97B48]/20';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-[#FAF6EE] border-2 border-[#292C26] p-4 flex flex-wrap items-center justify-between gap-4 shadow-[2px_2px_0px_#292C26]">
        <div>
          <h2 className="font-pixel text-base text-[#292C26]">
            Court Archive & Closed Dockets
          </h2>
          <p className="text-xs text-[#77614D] mt-0.5">
            {completedCases.length} trials adjudicated and filed away into friendship history.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {['ALL', 'INNOCENT', 'PARDONED', 'GUILTY', 'SILLY', 'SENTENCED'].map((stamp) => (
            <button
              key={stamp}
              onClick={() => {
                sound.playClick();
                setFilterStamp(stamp);
              }}
              className={`font-pixel text-[10px] px-2 py-1 border border-[#292C26] cursor-pointer ${
                filterStamp === stamp
                  ? 'bg-[#344B3A] text-white shadow-[1px_1px_0px_#292C26]'
                  : 'bg-[#FFFDF9] text-[#292C26] hover:bg-[#EFE8DA]'
              }`}
            >
              {stamp}
            </button>
          ))}
        </div>
      </div>

      {completedCases.length === 0 ? (
        <div className="parchment-sheet p-12 text-center space-y-3">
          <div className="text-3xl">📁</div>
          <h3 className="font-pixel text-sm text-[#292C26]">
            The Archive Is Currently Empty
          </h3>
          <p className="text-xs text-[#77614D] max-w-sm mx-auto">
            You haven't faced any friendship trials yet. Head over to the Courtroom to face Case #001!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Dossier List (5 cols) */}
          <div className="md:col-span-5 space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredCases.map((record) => {
              const isSelected = selectedCase?.caseId === record.caseId;

              return (
                <div
                  key={record.caseId}
                  onClick={() => {
                    sound.playPaper();
                    setSelectedCase(record);
                  }}
                  className={`p-3 border-2 border-[#292C26] cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#E9D99A] shadow-[3px_3px_0px_#292C26] -translate-y-0.5'
                      : 'bg-[#FFFDF9] hover:bg-[#FAF0DA] shadow-[1px_1px_0px_#292C26]'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <span className="font-pixel text-[10px] text-[#77614D] block uppercase">
                      {record.caseNumber}
                    </span>
                    <h4 className="font-pixel text-xs text-[#292C26] truncate">
                      {record.title}
                    </h4>
                    <span className="text-[10px] text-[#77614D]">
                      Filed: {record.completedAt}
                    </span>
                  </div>

                  <span
                    className={`font-pixel text-[9px] px-1.5 py-0.5 border shrink-0 ${getStampBadgeClass(
                      record.stampType
                    )}`}
                  >
                    {record.stampType}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Dossier Detail Inspection (7 cols) */}
          <div className="md:col-span-7">
            {selectedCase ? (
              <div className="parchment-sheet p-6 space-y-4">
                <div className="flex items-start justify-between border-b-2 border-[#77614D]/40 pb-3">
                  <div>
                    <span className="font-pixel text-[10px] text-[#77614D] block uppercase">
                      Official Archive Record · {selectedCase.caseNumber}
                    </span>
                    <h3 className="font-pixel text-base text-[#292C26] mt-1">
                      {selectedCase.title}
                    </h3>
                  </div>

                  <div
                    className={`rubber-stamp text-xs rotate-[-4deg] ${getStampBadgeClass(
                      selectedCase.stampType
                    )}`}
                  >
                    {selectedCase.stampType}
                  </div>
                </div>

                <div>
                  <h5 className="font-pixel text-[10px] text-[#77614D] uppercase mb-1">
                    Entered Defense:
                  </h5>
                  <div className="bg-[#FAF6EE] border border-[#292C26] p-2.5 text-xs italic text-[#292C26]">
                    {selectedCase.chosenDefenseText}
                  </div>
                </div>

                <div>
                  <h5 className="font-pixel text-[10px] text-[#77614D] uppercase mb-1">
                    Judicial Ruling:
                  </h5>
                  <div className="border border-[#77614D]/40 p-3 bg-[#FFFDF9] space-y-2">
                    <h4 className="font-pixel text-xs text-[#292C26]">
                      {selectedCase.verdictTitle}
                    </h4>
                    <p className="text-xs text-[#292C26] leading-relaxed">
                      {selectedCase.verdictText}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-[#77614D]/30">
                  <span className="text-[11px] text-[#77614D]">
                    Adjudicated on {selectedCase.completedAt}
                  </span>

                  <button
                    onClick={() => {
                      sound.playClick();
                      onReplayCase(selectedCase.caseId);
                    }}
                    className="pixel-btn bg-[#344B3A] text-white font-pixel text-[10px] px-3 py-1.5 cursor-pointer hover:bg-[#2A3E2F]"
                  >
                    Re-open Case Docket ↺
                  </button>
                </div>
              </div>
            ) : (
              <div className="parchment-sheet p-8 text-center text-xs text-[#77614D]">
                Select a case from the archive list to examine the verdict.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
