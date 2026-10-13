import React, { useState } from 'react';
import { sound } from '../utils/audio';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetGame: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  soundEnabled,
  onToggleSound,
  onResetGame
}) => {
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  const handleReset = () => {
    sound.playGavel();
    onResetGame();
    setConfirmReset(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#292C26]/70 flex items-center justify-center p-4">
      <div className="max-w-md w-full pixel-box p-6 bg-[#FAF6EE] space-y-6">
        <div className="flex items-center justify-between border-b-2 border-[#292C26] pb-3">
          <h3 className="font-pixel text-sm text-[#292C26]">
            Courtroom Settings & Audio
          </h3>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="font-pixel text-xs text-[#77614D] hover:text-[#292C26] cursor-pointer"
          >
            ✕ Close
          </button>
        </div>

        {/* Audio Toggle */}
        <div className="flex items-center justify-between p-3 bg-[#FFFDF9] border border-[#292C26]">
          <div>
            <h4 className="font-pixel text-xs text-[#292C26]">
              Retro Audio Effects
            </h4>
            <p className="text-[11px] text-[#77614D] mt-0.5">
              Wooden gavels, rubber stamps, pet chirps, and retro chimes.
            </p>
          </div>
          <button
            onClick={() => {
              onToggleSound();
            }}
            className={`pixel-btn font-pixel text-xs px-3 py-1.5 cursor-pointer ${
              soundEnabled
                ? 'bg-[#788C68] text-white'
                : 'bg-[#EAE4D7] text-[#77614D]'
            }`}
          >
            {soundEnabled ? 'ON 🔊' : 'OFF 🔇'}
          </button>
        </div>

        {/* Reset Confirmation */}
        <div className="p-4 bg-[#FAF0DA] border border-[#292C26] space-y-3">
          <h4 className="font-pixel text-xs text-[#A83232]">
            Reset Court Docket & Pet
          </h4>
          <p className="text-xs text-[#77614D] leading-relaxed">
            Erase all progress, completed trials, custom accusations, and adopted pet to start completely fresh.
          </p>

          {!confirmReset ? (
            <button
              onClick={() => {
                sound.playClick();
                setConfirmReset(true);
              }}
              className="pixel-btn bg-[#FFFDF9] text-[#A83232] font-pixel text-xs px-4 py-2 border-2 border-[#A83232] cursor-pointer hover:bg-[#FBEAEA]"
            >
              Reset All Game Data
            </button>
          ) : (
            <div className="space-y-2 pt-1">
              <span className="font-pixel text-xs text-[#A83232] block font-bold">
                Are you sure? This cannot be undone!
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="pixel-btn bg-[#A83232] text-white font-pixel text-xs px-3 py-1.5 cursor-pointer hover:bg-[#8B2323]"
                >
                  Yes, Reset Everything
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="pixel-btn bg-[#FAF6EE] text-[#292C26] font-pixel text-xs px-3 py-1.5 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
