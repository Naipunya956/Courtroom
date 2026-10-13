import React, { useState } from 'react';
import { PetSpecies, PetMood } from '../types/game';

interface PetSpriteProps {
  species: PetSpecies;
  mood: PetMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  equipped?: {
    hat?: string;
    eyewear?: string;
    neck?: string;
    desk?: string;
  };
  isClickable?: boolean;
  onClick?: () => void;
  className?: string;
}

export const PetSprite: React.FC<PetSpriteProps> = ({
  species,
  mood,
  size = 'lg',
  equipped = {},
  isClickable = false,
  onClick,
  className = ''
}) => {
  const [isBouncing, setIsBouncing] = useState(false);

  const handleClick = () => {
    if (isClickable && onClick) {
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 350);
      onClick();
    }
  };

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-40 h-40',
    xl: 'w-56 h-56'
  }[size];

  // Render accessories
  const renderAccessories = () => {
    return (
      <>
        {/* Hat Slot */}
        {equipped.hat === 'hat-judge-wig' && (
          <g className="wig-accessory">
            {/* White powdered curls on top & sides */}
            <rect x="26" y="10" width="48" height="12" rx="6" fill="#F0ECE4" stroke="#292C26" strokeWidth="2" />
            <rect x="22" y="16" width="12" height="18" rx="6" fill="#E4DCD0" stroke="#292C26" strokeWidth="2" />
            <rect x="66" y="16" width="12" height="18" rx="6" fill="#E4DCD0" stroke="#292C26" strokeWidth="2" />
            {/* Ribbon tie */}
            <rect x="47" y="18" width="6" height="4" fill="#344B3A" />
          </g>
        )}
        {equipped.hat === 'hat-tophat' && (
          <g className="tophat-accessory">
            <rect x="28" y="18" width="44" height="6" fill="#292C26" rx="2" />
            <rect x="34" y="4" width="32" height="16" fill="#292C26" rx="1" />
            <rect x="34" y="14" width="32" height="4" fill="#A83232" />
          </g>
        )}
        {equipped.hat === 'hat-party' && (
          <g className="partyhat-accessory">
            <polygon points="50,2 38,22 62,22" fill="#E9C440" stroke="#292C26" strokeWidth="2" />
            <circle cx="50" cy="2" r="3" fill="#D9534F" />
            <circle cx="46" cy="14" r="2" fill="#344B3A" />
            <circle cx="54" cy="16" r="2" fill="#A83232" />
          </g>
        )}

        {/* Eyewear Slot */}
        {equipped.eyewear === 'eyewear-spectacles' && (
          <g className="spectacles-accessory">
            <circle cx="39" cy="38" r="7" fill="none" stroke="#D4A017" strokeWidth="2" />
            <circle cx="61" cy="38" r="7" fill="none" stroke="#D4A017" strokeWidth="2" />
            <line x1="46" y1="38" x2="54" y2="38" stroke="#D4A017" strokeWidth="2" />
          </g>
        )}
        {equipped.eyewear === 'eyewear-cool' && (
          <g className="cool-glasses">
            <rect x="30" y="34" width="17" height="9" fill="#292C26" rx="1" />
            <rect x="53" y="34" width="17" height="9" fill="#292C26" rx="1" />
            <line x1="47" y1="37" x2="53" y2="37" stroke="#292C26" strokeWidth="2" />
            <rect x="32" y="36" width="4" height="2" fill="#FFFFFF" opacity="0.6" />
            <rect x="55" y="36" width="4" height="2" fill="#FFFFFF" opacity="0.6" />
          </g>
        )}

        {/* Neck Slot */}
        {equipped.neck === 'neck-bowtie' && (
          <g className="bowtie-accessory">
            <polygon points="44,66 38,62 38,70" fill="#A83232" stroke="#292C26" strokeWidth="1.5" />
            <polygon points="56,66 62,62 62,70" fill="#A83232" stroke="#292C26" strokeWidth="1.5" />
            <circle cx="50" cy="66" r="3" fill="#C43B3B" stroke="#292C26" strokeWidth="1.5" />
          </g>
        )}
        {equipped.neck === 'neck-medal' && (
          <g className="medal-accessory">
            <polygon points="46,65 54,65 51,71 49,71" fill="#344B3A" />
            <circle cx="50" cy="74" r="5" fill="#E9C440" stroke="#292C26" strokeWidth="1.5" />
            <polygon points="50,71 51,73 53,73 51.5,74.5 52,76.5 50,75 48,76.5 48.5,74.5 47,73 49,73" fill="#D4A017" />
          </g>
        )}

        {/* Desk Slot (rendered at bottom left or right) */}
        {equipped.desk === 'desk-tea' && (
          <g className="tea-accessory">
            <rect x="76" y="74" width="12" height="12" rx="2" fill="#E8D8C0" stroke="#292C26" strokeWidth="1.5" />
            <path d="M 88,77 C 91,77 91,82 88,82" fill="none" stroke="#292C26" strokeWidth="1.5" />
            {/* Steam */}
            <path d="M 80,72 Q 78,69 80,66" fill="none" stroke="#77614D" strokeWidth="1" strokeDasharray="2,2" opacity="0.7" />
            <path d="M 84,71 Q 86,68 84,65" fill="none" stroke="#77614D" strokeWidth="1" strokeDasharray="2,2" opacity="0.7" />
          </g>
        )}
        {equipped.desk === 'desk-plant' && (
          <g className="plant-accessory">
            <rect x="76" y="77" width="12" height="9" rx="2" fill="#77614D" stroke="#292C26" strokeWidth="1.5" />
            <circle cx="82" cy="74" r="4" fill="#788C68" stroke="#292C26" strokeWidth="1" />
            <circle cx="78" cy="75" r="3" fill="#5E754F" stroke="#292C26" strokeWidth="1" />
            <circle cx="86" cy="75" r="3" fill="#5E754F" stroke="#292C26" strokeWidth="1" />
          </g>
        )}
        {equipped.desk === 'desk-gavel' && (
          <g className="golden-gavel-accessory">
            <rect x="12" y="74" width="16" height="6" rx="1" fill="#E9C440" stroke="#292C26" strokeWidth="1.5" transform="rotate(-15 12 74)" />
            <rect x="18" y="78" width="4" height="14" fill="#D4A017" stroke="#292C26" strokeWidth="1.5" transform="rotate(-15 18 78)" />
          </g>
        )}
      </>
    );
  };

  // 1. FROG JUDGE
  if (species === 'frog') {
    return (
      <div
        onClick={handleClick}
        className={`relative inline-block select-none ${sizeClasses} ${isClickable ? 'cursor-pointer' : ''} ${className}`}
      >
        <svg
          viewBox="0 0 100 100"
          className={`w-full h-full overflow-visible transition-transform duration-200 pixelated ${
            isBouncing ? 'scale-110 -translate-y-2' : ''
          } ${mood === 'dramatic' ? 'animate-waggle' : ''} ${mood === 'happy' ? 'animate-subtle-bounce' : ''}`}
        >
          {/* Shadow */}
          <ellipse cx="50" cy="88" rx="28" ry="6" fill="#292C26" opacity="0.18" />

          {/* Frog Body Base */}
          <rect x="28" y="32" width="44" height="42" rx="18" fill="#688E52" stroke="#292C26" strokeWidth="3" />
          
          {/* Belly */}
          <ellipse cx="50" cy="56" rx="14" ry="12" fill="#B2CB82" />

          {/* Frog Eyes (Spheres on top) */}
          {/* Left Eye Mound */}
          <circle cx="36" cy="30" r="11" fill="#688E52" stroke="#292C26" strokeWidth="3" />
          {/* Right Eye Mound */}
          <circle cx="64" cy="30" r="11" fill="#688E52" stroke="#292C26" strokeWidth="3" />

          {/* Eye Whites & Mood pupils */}
          {mood === 'sleepy' ? (
            <>
              {/* Closed sleepy eyes */}
              <path d="M 29,32 Q 36,36 43,32" fill="none" stroke="#292C26" strokeWidth="3" strokeLinecap="round" />
              <path d="M 57,32 Q 64,36 71,32" fill="none" stroke="#292C26" strokeWidth="3" strokeLinecap="round" />
              {/* Zzz text */}
              <text x="68" y="18" fill="#788C68" fontSize="10" fontFamily="var(--font-pixel)" className="animate-pulse">z</text>
              <text x="76" y="10" fill="#788C68" fontSize="12" fontFamily="var(--font-pixel)" className="animate-pulse">Z</text>
            </>
          ) : mood === 'happy' ? (
            <>
              {/* Happy closed arc eyes ^ ^ */}
              <path d="M 29,32 Q 36,24 43,32" fill="none" stroke="#292C26" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 57,32 Q 64,24 71,32" fill="none" stroke="#292C26" strokeWidth="3.5" strokeLinecap="round" />
              {/* Rosy cheeks */}
              <circle cx="28" cy="46" r="4" fill="#E68A8A" opacity="0.75" />
              <circle cx="72" cy="46" r="4" fill="#E68A8A" opacity="0.75" />
            </>
          ) : mood === 'suspicious' ? (
            <>
              {/* Eye whites */}
              <circle cx="36" cy="30" r="7" fill="#FFFDF8" />
              <circle cx="64" cy="30" r="7" fill="#FFFDF8" />
              {/* Squinted suspicious horizontal pupils */}
              <rect x="31" y="29" width="8" height="3" rx="1.5" fill="#292C26" />
              <rect x="61" y="29" width="8" height="3" rx="1.5" fill="#292C26" />
              {/* Skeptical raised brow on right */}
              <line x1="57" y1="21" x2="71" y2="19" stroke="#292C26" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : mood === 'angry' ? (
            <>
              {/* Eye whites */}
              <circle cx="36" cy="30" r="7" fill="#FFFDF8" />
              <circle cx="64" cy="30" r="7" fill="#FFFDF8" />
              {/* Angry down pupils */}
              <circle cx="38" cy="32" r="4" fill="#292C26" />
              <circle cx="62" cy="32" r="4" fill="#292C26" />
              {/* Fierce angled brows */}
              <line x1="30" y1="21" x2="43" y2="26" stroke="#292C26" strokeWidth="3" strokeLinecap="round" />
              <line x1="70" y1="21" x2="57" y2="26" stroke="#292C26" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : (
            // Default / Dramatic
            <>
              {/* Big round inquisitive eyes */}
              <circle cx="36" cy="30" r="7" fill="#FFFDF8" />
              <circle cx="64" cy="30" r="7" fill="#FFFDF8" />
              <circle cx="36" cy="30" r="4.5" fill="#292C26" />
              <circle cx="64" cy="30" r="4.5" fill="#292C26" />
              <circle cx="34" cy="28" r="1.5" fill="#FFFFFF" />
              <circle cx="62" cy="28" r="1.5" fill="#FFFFFF" />
            </>
          )}

          {/* Frog Mouth */}
          {mood === 'happy' ? (
            <path d="M 40,48 Q 50,56 60,48" fill="none" stroke="#292C26" strokeWidth="2.5" strokeLinecap="round" />
          ) : mood === 'dramatic' ? (
            <ellipse cx="50" cy="50" rx="5" ry="7" fill="#292C26" />
          ) : mood === 'angry' ? (
            <path d="M 40,52 Q 50,46 60,52" fill="none" stroke="#292C26" strokeWidth="2.5" strokeLinecap="round" />
          ) : (
            <line x1="42" y1="48" x2="58" y2="48" stroke="#292C26" strokeWidth="2.5" strokeLinecap="round" />
          )}

          {/* Judge Robe & Collar */}
          <path d="M 28,64 L 72,64 L 76,82 L 24,82 Z" fill="#292C26" />
          {/* White Judicial Collar Jabot */}
          <polygon points="50,64 43,76 57,76" fill="#F5F0E6" stroke="#292C26" strokeWidth="1" />
          <line x1="50" y1="64" x2="50" y2="76" stroke="#292C26" strokeWidth="1" />

          {/* Webbed Hands holding Judge Gavel */}
          {/* Left Hand on bench */}
          <circle cx="28" cy="74" r="4" fill="#688E52" stroke="#292C26" strokeWidth="1.5" />
          {/* Right Hand holding Gavel */}
          <circle cx="72" cy="72" r="4" fill="#688E52" stroke="#292C26" strokeWidth="1.5" />
          {/* Wooden Gavel */}
          <rect x="71" y="62" width="10" height="4" rx="1" fill="#77614D" stroke="#292C26" strokeWidth="1.5" transform="rotate(20 71 62)" />
          <rect x="74" y="64" width="3" height="12" rx="1" fill="#77614D" stroke="#292C26" strokeWidth="1.5" transform="rotate(20 74 64)" />

          {/* Accessories Overlay */}
          {renderAccessories()}
        </svg>
      </div>
    );
  }

  // 2. DRAMATIC CAT JUDGE
  if (species === 'cat') {
    return (
      <div
        onClick={handleClick}
        className={`relative inline-block select-none ${sizeClasses} ${isClickable ? 'cursor-pointer' : ''} ${className}`}
      >
        <svg
          viewBox="0 0 100 100"
          className={`w-full h-full overflow-visible transition-transform duration-200 pixelated ${
            isBouncing ? 'scale-110 -translate-y-2' : ''
          } ${mood === 'dramatic' ? 'animate-waggle' : ''} ${mood === 'happy' ? 'animate-subtle-bounce' : ''}`}
        >
          {/* Shadow */}
          <ellipse cx="50" cy="88" rx="28" ry="6" fill="#292C26" opacity="0.18" />

          {/* Tail swaying in back */}
          <path d="M 72,76 Q 88,68 86,52 Q 84,46 80,48" fill="none" stroke="#D97B48" strokeWidth="6" strokeLinecap="round" />
          <path d="M 72,76 Q 88,68 86,52 Q 84,46 80,48" fill="none" stroke="#292C26" strokeWidth="1.5" strokeLinecap="round" />

          {/* Cat Ears */}
          <polygon points="30,34 38,14 48,30" fill="#D97B48" stroke="#292C26" strokeWidth="2.5" />
          <polygon points="34,30 38,18 44,28" fill="#F4ACB7" />

          <polygon points="70,34 62,14 52,30" fill="#D97B48" stroke="#292C26" strokeWidth="2.5" />
          <polygon points="66,30 62,18 56,28" fill="#F4ACB7" />

          {/* Cat Head & Body */}
          <rect x="28" y="26" width="44" height="42" rx="16" fill="#E88A52" stroke="#292C26" strokeWidth="3" />
          
          {/* Calico White Bib & Cheeks */}
          <ellipse cx="50" cy="54" rx="14" ry="12" fill="#FFF8F0" />
          {/* Ginger forehead marking */}
          <polygon points="46,26 54,26 50,34" fill="#B85522" />

          {/* Whiskers */}
          <line x1="22" y1="46" x2="33" y2="48" stroke="#292C26" strokeWidth="1.5" />
          <line x1="20" y1="52" x2="33" y2="52" stroke="#292C26" strokeWidth="1.5" />
          <line x1="78" y1="46" x2="67" y2="48" stroke="#292C26" strokeWidth="1.5" />
          <line x1="80" y1="52" x2="67" y2="52" stroke="#292C26" strokeWidth="1.5" />

          {/* Tiny Pink Nose */}
          <polygon points="48,46 52,46 50,49" fill="#F4ACB7" stroke="#292C26" strokeWidth="1" />

          {/* Cat Eyes & Mood */}
          {mood === 'sleepy' ? (
            <>
              {/* Sleeping cute slit eyes */}
              <path d="M 34,40 Q 40,43 45,40" fill="none" stroke="#292C26" strokeWidth="3" strokeLinecap="round" />
              <path d="M 55,40 Q 60,43 66,40" fill="none" stroke="#292C26" strokeWidth="3" strokeLinecap="round" />
              <text x="70" y="24" fill="#77614D" fontSize="10" fontFamily="var(--font-pixel)">z</text>
              <text x="78" y="16" fill="#77614D" fontSize="12" fontFamily="var(--font-pixel)">Z</text>
            </>
          ) : mood === 'happy' ? (
            <>
              {/* Happy closed purr eyes */}
              <path d="M 33,39 Q 39,33 45,39" fill="none" stroke="#292C26" strokeWidth="3" strokeLinecap="round" />
              <path d="M 55,39 Q 61,33 67,39" fill="none" stroke="#292C26" strokeWidth="3" strokeLinecap="round" />
              {/* Rosy blush */}
              <circle cx="28" cy="46" r="3.5" fill="#F4ACB7" opacity="0.8" />
              <circle cx="72" cy="46" r="3.5" fill="#F4ACB7" opacity="0.8" />
            </>
          ) : mood === 'suspicious' ? (
            <>
              <circle cx="39" cy="38" r="6" fill="#FFFDF8" />
              <circle cx="61" cy="38" r="6" fill="#FFFDF8" />
              {/* Vertical cat slit pupils */}
              <ellipse cx="40" cy="38" rx="1.5" ry="5" fill="#292C26" />
              <ellipse cx="60" cy="38" rx="1.5" ry="5" fill="#292C26" />
              <line x1="55" y1="31" x2="68" y2="30" stroke="#292C26" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : mood === 'dramatic' ? (
            <>
              {/* Huge dramatic dilated anime pupils */}
              <circle cx="39" cy="37" r="7.5" fill="#292C26" />
              <circle cx="61" cy="37" r="7.5" fill="#292C26" />
              <circle cx="37" cy="35" r="2.5" fill="#FFFFFF" />
              <circle cx="59" cy="35" r="2.5" fill="#FFFFFF" />
              <circle cx="41" cy="39" r="1" fill="#FFFFFF" />
              <circle cx="63" cy="39" r="1" fill="#FFFFFF" />
            </>
          ) : (
            // Regular/Angry
            <>
              <circle cx="39" cy="38" r="6" fill="#FFFDF8" />
              <circle cx="61" cy="38" r="6" fill="#FFFDF8" />
              <circle cx="39" cy="38" r="3.5" fill="#292C26" />
              <circle cx="61" cy="38" r="3.5" fill="#292C26" />
              {mood === 'angry' && (
                <>
                  <line x1="33" y1="31" x2="44" y2="34" stroke="#292C26" strokeWidth="2.5" />
                  <line x1="67" y1="31" x2="56" y2="34" stroke="#292C26" strokeWidth="2.5" />
                </>
              )}
            </>
          )}

          {/* Cat Mouth */}
          {mood === 'happy' ? (
            <path d="M 45,50 Q 48,53 50,50 Q 52,53 55,50" fill="none" stroke="#292C26" strokeWidth="2" strokeLinecap="round" />
          ) : mood === 'dramatic' ? (
            <ellipse cx="50" cy="52" rx="4" ry="5" fill="#292C26" />
          ) : mood === 'angry' ? (
            // Small hiss mouth
            <polygon points="46,50 54,50 50,55" fill="#802020" stroke="#292C26" strokeWidth="1" />
          ) : (
            <path d="M 46,50 Q 48,52 50,50 Q 52,52 54,50" fill="none" stroke="#292C26" strokeWidth="2" strokeLinecap="round" />
          )}

          {/* Judge Robe */}
          <path d="M 28,64 L 72,64 L 76,82 L 24,82 Z" fill="#292C26" />
          {/* Ruffled White Jabot / Cravat */}
          <path d="M 44,64 L 56,64 L 54,76 L 46,76 Z" fill="#FFFDF8" stroke="#292C26" strokeWidth="1" />
          <path d="M 42,67 Q 50,71 58,67" fill="none" stroke="#292C26" strokeWidth="1" />

          {/* White Paws on bench */}
          <ellipse cx="32" cy="74" rx="4.5" ry="3.5" fill="#FFF8F0" stroke="#292C26" strokeWidth="1.5" />
          <ellipse cx="68" cy="74" rx="4.5" ry="3.5" fill="#FFF8F0" stroke="#292C26" strokeWidth="1.5" />

          {/* Accessories Overlay */}
          {renderAccessories()}
        </svg>
      </div>
    );
  }

  // 3. SUSPICIOUS LITTLE DUCK JUDGE
  return (
    <div
      onClick={handleClick}
      className={`relative inline-block select-none ${sizeClasses} ${isClickable ? 'cursor-pointer' : ''} ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full overflow-visible transition-transform duration-200 pixelated ${
          isBouncing ? 'scale-110 -translate-y-2' : ''
        } ${mood === 'dramatic' ? 'animate-waggle' : ''} ${mood === 'happy' ? 'animate-subtle-bounce' : ''}`}
      >
        {/* Shadow */}
        <ellipse cx="50" cy="88" rx="28" ry="6" fill="#292C26" opacity="0.18" />

        {/* Duck Head & Round Body */}
        <circle cx="50" cy="40" r="22" fill="#F4CF48" stroke="#292C26" strokeWidth="3" />
        <rect x="30" y="52" width="40" height="28" rx="14" fill="#E8C034" stroke="#292C26" strokeWidth="3" />

        {/* Feathery tuft on head */}
        <path d="M 50,18 Q 52,12 55,14 Q 51,16 50,18" fill="#F4CF48" stroke="#292C26" strokeWidth="1.5" />

        {/* Duck Wings */}
        <ellipse cx="26" cy="62" rx="6" ry="10" fill="#D8AF28" stroke="#292C26" strokeWidth="2" transform="rotate(-15 26 62)" />
        <ellipse cx="74" cy="62" rx="6" ry="10" fill="#D8AF28" stroke="#292C26" strokeWidth="2" transform="rotate(15 74 62)" />

        {/* Duck Eyes */}
        {mood === 'sleepy' ? (
          <>
            <path d="M 36,36 Q 42,40 48,36" fill="none" stroke="#292C26" strokeWidth="3" strokeLinecap="round" />
            <path d="M 52,36 Q 58,40 64,36" fill="none" stroke="#292C26" strokeWidth="3" strokeLinecap="round" />
            <text x="70" y="24" fill="#77614D" fontSize="10" fontFamily="var(--font-pixel)">z</text>
            <text x="78" y="16" fill="#77614D" fontSize="12" fontFamily="var(--font-pixel)">Z</text>
          </>
        ) : mood === 'happy' ? (
          <>
            <path d="M 36,35 Q 42,29 48,35" fill="none" stroke="#292C26" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 52,35 Q 58,29 64,35" fill="none" stroke="#292C26" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="31" cy="42" r="3.5" fill="#E68A8A" opacity="0.75" />
            <circle cx="69" cy="42" r="3.5" fill="#E68A8A" opacity="0.75" />
          </>
        ) : mood === 'suspicious' ? (
          <>
            {/* Skeptical side-eye */}
            <circle cx="42" cy="35" r="5.5" fill="#FFFDF8" />
            <circle cx="58" cy="35" r="5.5" fill="#FFFDF8" />
            <circle cx="40" cy="35" r="3" fill="#292C26" />
            <circle cx="56" cy="35" r="3" fill="#292C26" />
            <line x1="53" y1="28" x2="64" y2="28" stroke="#292C26" strokeWidth="2.5" />
          </>
        ) : mood === 'angry' ? (
          <>
            <circle cx="42" cy="35" r="5" fill="#FFFDF8" />
            <circle cx="58" cy="35" r="5" fill="#FFFDF8" />
            <circle cx="43" cy="36" r="3" fill="#292C26" />
            <circle cx="57" cy="36" r="3" fill="#292C26" />
            <line x1="36" y1="28" x2="47" y2="32" stroke="#292C26" strokeWidth="3" />
            <line x1="64" y1="28" x2="53" y2="32" stroke="#292C26" strokeWidth="3" />
          </>
        ) : (
          // Normal/Dramatic
          <>
            <circle cx="42" cy="35" r="6" fill="#FFFDF8" />
            <circle cx="58" cy="35" r="6" fill="#FFFDF8" />
            <circle cx="42" cy="35" r="3.5" fill="#292C26" />
            <circle cx="58" cy="35" r="3.5" fill="#292C26" />
            <circle cx="40" cy="33" r="1.5" fill="#FFFFFF" />
            <circle cx="56" cy="33" r="1.5" fill="#FFFFFF" />
          </>
        )}

        {/* Orange Duck Beak */}
        {mood === 'happy' || mood === 'dramatic' ? (
          // Open smiling / quacking beak
          <g>
            <path d="M 38,44 Q 50,40 62,44 Q 50,56 38,44 Z" fill="#E87C28" stroke="#292C26" strokeWidth="2" />
            <ellipse cx="50" cy="46" rx="6" ry="3" fill="#802020" />
          </g>
        ) : (
          // Closed official beak
          <path d="M 38,44 Q 50,41 62,44 Q 50,52 38,44 Z" fill="#E87C28" stroke="#292C26" strokeWidth="2" />
        )}

        {/* Judge Robe */}
        <path d="M 32,64 L 68,64 L 72,82 L 28,82 Z" fill="#292C26" />
        {/* White Judicial Collar */}
        <polygon points="50,64 44,74 56,74" fill="#F5F0E6" stroke="#292C26" strokeWidth="1" />

        {/* Webbed Feet on bench */}
        <path d="M 36,80 L 32,86 L 42,86 Z" fill="#E87C28" stroke="#292C26" strokeWidth="1.5" />
        <path d="M 64,80 L 58,86 L 68,86 Z" fill="#E87C28" stroke="#292C26" strokeWidth="1.5" />

        {/* Accessories Overlay */}
        {renderAccessories()}
      </svg>
    </div>
  );
};
