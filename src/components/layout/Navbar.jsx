import React from 'react';
import { NavLink } from 'react-router-dom';
import { useRaceManagerStore } from '../../store/useRaceManagerStore.js';
import RMLogo from '../common/RMLogo.jsx';
import Icon from '../common/Icon.jsx';

export default function Navbar() {
  const { funds, reputation, issues, liveRace } = useRaceManagerStore();

  const activeIssuesCount = issues.filter(i => i.status === 'investigating').length;

  const fmt = (num) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(num);

  const navLinks = [
    { to: '/', label: 'Race Control HQ', iconName: 'race-control' },
    { to: '/circuits', label: 'Lokasi Sirkuit', iconName: 'globe' },
    { to: '/regulations', label: 'Buku Regulasi', iconName: 'book' },
    { to: '/car-driver-specs', label: 'Karakteristik & Spek', iconName: 'car' },
    { to: '/teams', label: 'Grid Tim & Bursa', iconName: 'teams' },
    { to: '/investigations', label: 'Scrutineering', iconName: 'scrutineering', badge: activeIssuesCount > 0 ? activeIssuesCount : null },
    { to: '/finance', label: 'Finansial Liga', iconName: 'finance' },
    { to: '/settings', label: 'Pengaturan', iconName: 'settings' },
  ];

  return (
    <header className="rm-header-topbar">
      <div className="rm-topbar-inner">
        {/* Logo & Brand (FIA-Inspired Crest) */}
        <NavLink to="/" className="rm-topbar-brand">
          <RMLogo size={42} />
          <div className="rm-brand-text-block">
            <span className="rm-brand-title">RACE MANAGER</span>
            <span className="rm-brand-sub">World Motorsport Commission</span>
          </div>
        </NavLink>

        {/* Horizontal Navigation Menu */}
        <nav className="rm-top-nav">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `rm-top-navlink ${isActive ? 'active' : ''}`}
              title={item.label}
            >
              <span className="rm-nav-icon-wrap">
                <Icon name={item.iconName} size={16} />
                {item.badge && <span className="rm-nav-badge">{item.badge}</span>}
              </span>
              <span className="rm-nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Right League Metrics & Live Status */}
        <div className="rm-topbar-stats">
          {liveRace.isRacing && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                color: '#ef4444',
                fontWeight: 700,
                fontSize: '12px',
                fontFamily: 'var(--font-heading)'
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
              <span>LIVE GP: LAP {liveRace.lap}/{liveRace.totalLaps}</span>
            </div>
          )}

          {/* Kas Asosiasi */}
          <div className="rm-stat-chip">
            <Icon name="dollar" size={15} style={{ color: '#2ecc71' }} />
            <div>
              <div className="rm-stat-chip-label">Kas Asosiasi</div>
              <div className="rm-stat-chip-val" style={{ color: '#2ecc71' }}>
                {fmt(funds)}
              </div>
            </div>
          </div>

          {/* Integritas */}
          <div className="rm-stat-chip">
            <Icon name="shield" size={15} style={{ color: reputation >= 75 ? '#38bdf8' : '#ef4444' }} />
            <div>
              <div className="rm-stat-chip-label">Integritas</div>
              <div className="rm-stat-chip-val" style={{ color: reputation >= 75 ? '#38bdf8' : '#ef4444' }}>
                {reputation}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
