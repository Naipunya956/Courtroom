import React from 'react';
import { ActiveTab, PetProfile } from '../types/game';
import { sound } from '../utils/audio';

interface GameNavigationProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  secretEndingUnlocked: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenSettings: () => void;
  pet: PetProfile;
}

export const GameNavigation: React.FC<GameNavigationProps> = ({
  activeTab,
  onSelectTab,
  secretEndingUnlocked,
  soundEnabled,
  onToggleSound,
  onOpenSettings,
  pet
}) => {
  const tabs: { id: ActiveTab; label: string; icon: string; highlight?: boolean }[] = [
    { id: 'court', label: 'Courtroom', icon: '⚖️' },
    { id: 'pet_room', label: 'Pet Quarters', icon: '🥣' },
    { id: 'archive', label: 'Archive', icon: '📁' },
    { id: 'achievements', label: 'Badges', icon: '🏆' },
    { id: 'accuse', label: 'Accuse', icon: '✍️' }
  ];

  if (secretEndingUnlocked) {
    tabs.push({ id: 'certificate', label: 'Final Verdict', icon: '📜', highlight: true });
  }

  const handleTabClick = (tabId: ActiveTab) => {
    sound.playClick();
    onSelectTab(tabId);
  };

  return (
    <header className="bg-[#FAF6EE] border-b-2 border-[#292C26] sticky top-0 z-30 shadow-[0_2px_0_#292C26]">
      <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div
          onClick={() => handleTabClick('court')}
          className="flex items-center gap-2 cursor-pointer shrink-0"
        >
          <div className="w-8 h-8 bg-[#E9D99A] border-2 border-[#292C26] flex items-center justify-center text-sm shadow-[1px_1px_0px_#292C26]">
            ⚖️
          </div>
          <div>
            <span className="font-pixel text-xs sm:text-sm text-[#292C26] block leading-tight">
              The Friendship Court
            </span>
            <span className="text-[10px] text-[#788C68] font-pixel block sm:inline">
              Magistrate {pet.name}
            </span>
          </div>
        </div>

        {/* Navigation Tabs (Scrollable on mobile) */}
        <nav className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
          {tabs.map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleTabClick(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-pixel text-[11px] whitespace-nowrap shrink-0 border-2 border-[#292C26] cursor-pointer transition-all ${
                  isActive
                    ? 'bg-[#344B3A] text-white shadow-[2px_2px_0px_#292C26] -translate-y-0.5'
                    : t.highlight
                    ? 'bg-[#E9D99A] text-[#292C26] hover:bg-[#DFC770]'
                    : 'bg-[#FFFDF9] text-[#292C26] hover:bg-[#FAF0DA]'
                }`}
              >
                <span className="text-xs">{t.icon}</span>
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Sound & Settings */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Disable Audio' : 'Enable Audio'}
            className="w-8 h-8 border-2 border-[#292C26] bg-[#FFFDF9] hover:bg-[#FAF0DA] flex items-center justify-center text-xs font-pixel cursor-pointer shadow-[1px_1px_0px_#292C26]"
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenSettings();
            }}
            title="Settings"
            className="w-8 h-8 border-2 border-[#292C26] bg-[#FFFDF9] hover:bg-[#FAF0DA] flex items-center justify-center text-xs font-pixel cursor-pointer shadow-[1px_1px_0px_#292C26]"
          >
            ⚙️
          </button>
        </div>
      </div>
    </header>
  );
};
