import React from 'react';

/**
 * RMLogo — Official Federation Emblem
 * Inspired by the FIA (Fédération Internationale de l'Automobile) crest,
 * featuring stylized interlocking "RM" typography, golden laurel wreath,
 * and high-prestige motorsport federation styling.
 */
export default function RMLogo({ size = 42, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: 'drop-shadow(0 0 8px rgba(245, 166, 35, 0.45))', display: 'inline-block', verticalAlign: 'middle' }}
    >
      <defs>
        {/* Gold Metallic Gradient */}
        <linearGradient id="rmGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2A3" />
          <stop offset="30%" stopColor="#F5A623" />
          <stop offset="70%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>

        {/* Shield / Outer Navy Gradient */}
        <linearGradient id="rmNavyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0A0C10" />
        </linearGradient>

        <linearGradient id="rmSilverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
      </defs>

      {/* Outer Shield / Hexagonal Emblem */}
      <circle cx="60" cy="60" r="56" fill="url(#rmNavyGrad)" stroke="url(#rmGoldGrad)" strokeWidth="2.5" />
      <circle cx="60" cy="60" r="51" fill="none" stroke="rgba(245, 166, 35, 0.3)" strokeWidth="1" strokeDasharray="3 3" />

      {/* Stylized Laurel Wreath Leaves (Left) */}
      <g fill="url(#rmGoldGrad)" opacity="0.95">
        <path d="M26 44 C22 48 24 54 28 52 C26 50 25 47 26 44 Z" />
        <path d="M22 56 C18 60 21 66 25 63 C23 61 22 58 22 56 Z" />
        <path d="M24 68 C21 73 25 78 29 74 C26 73 25 70 24 68 Z" />
        <path d="M30 79 C28 84 34 87 37 83 C34 82 32 80 30 79 Z" />
        <path d="M40 88 C38 92 45 94 47 89 C44 89 42 88 40 88 Z" />
      </g>

      {/* Stylized Laurel Wreath Leaves (Right) */}
      <g fill="url(#rmGoldGrad)" opacity="0.95">
        <path d="M94 44 C98 48 96 54 92 52 C94 50 95 47 94 44 Z" />
        <path d="M98 56 C102 60 99 66 95 63 C97 61 98 58 98 56 Z" />
        <path d="M96 68 C99 73 95 78 91 74 C94 73 95 70 96 68 Z" />
        <path d="M90 79 C92 84 86 87 83 83 C86 82 88 80 90 79 Z" />
        <path d="M80 88 C82 92 75 94 73 89 C76 89 78 88 80 88 Z" />
      </g>

      {/* FIA-Style Geometric Ribbon / Globe Lines */}
      <path d="M30 38 Q60 30 90 38" stroke="url(#rmGoldGrad)" strokeWidth="1.2" fill="none" opacity="0.6" />
      <path d="M24 60 Q60 52 96 60" stroke="url(#rmGoldGrad)" strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M30 82 Q60 90 90 82" stroke="url(#rmGoldGrad)" strokeWidth="1.2" fill="none" opacity="0.6" />

      {/* Top Banner Text: FIA Style 'FEDERATION' */}
      <text
        x="60"
        y="26"
        textAnchor="middle"
        fill="#F5A623"
        fontSize="7.5"
        fontWeight="800"
        letterSpacing="2.5"
        fontFamily="'Orbitron', sans-serif"
      >
        COMMISSION
      </text>

      {/* Central FIA-Style Typographic Monogram: 'R' and 'M' */}
      {/* Letter 'R' */}
      <g>
        {/* R Vertical Stem */}
        <path
          d="M 36 40 L 45 40 L 45 74 L 36 74 Z"
          fill="url(#rmSilverGrad)"
        />
        {/* R Loop */}
        <path
          d="M 44 40 L 56 40 C 62 40 65 43 65 49 C 65 54 62 57 56 57 L 44 57 Z"
          fill="url(#rmSilverGrad)"
        />
        <path
          d="M 45 46 L 53 46 C 56 46 57 47 57 49 C 57 51 56 52 53 52 L 45 52 Z"
          fill="#0F172A"
        />
        {/* R Diagonal Leg interlocked with M */}
        <path
          d="M 52 55 L 61 74 L 52 74 L 46 57 L 54 57 Z"
          fill="url(#rmGoldGrad)"
        />
      </g>

      {/* Letter 'M' (Slanted bold architectural cuts like FIA) */}
      <g>
        {/* M Left Stem */}
        <path
          d="M 60 40 L 68 40 L 68 74 L 60 74 Z"
          fill="url(#rmSilverGrad)"
        />
        {/* M Center Diagonal V-Peak */}
        <path
          d="M 68 40 L 76 60 L 73 60 L 81 40 L 87 40 L 79 66 L 73 66 Z"
          fill="url(#rmGoldGrad)"
        />
        {/* M Right Stem */}
        <path
          d="M 82 40 L 90 40 L 90 74 L 82 74 Z"
          fill="url(#rmSilverGrad)"
        />
      </g>

      {/* Bottom Sub-text */}
      <text
        x="60"
        y="100"
        textAnchor="middle"
        fill="#94A3B8"
        fontSize="6.5"
        fontWeight="700"
        letterSpacing="2.2"
        fontFamily="'Rajdhani', sans-serif"
      >
        MOTORSPORT
      </text>

      {/* Gold Star Accents */}
      <polygon points="60,91 61.5,95 65.5,95 62,97.5 63.5,101.5 60,99 56.5,101.5 58,97.5 54.5,95 58.5,95" fill="url(#rmGoldGrad)" transform="scale(0.7) translate(25, 48)" />
    </svg>
  );
}
