import React from 'react';
import { useRaceManagerStore } from '../../store/useRaceManagerStore.js';
import Icon from '../../components/common/Icon.jsx';

export default function CarDriverSpecsPage() {
  const { characteristics, updateCharacteristic, teams } = useRaceManagerStore();

  const allDrivers = teams.flatMap(t => t.drivers.map(d => ({ ...d, teamName: t.name, teamColor: t.color })));

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="rm-page-header">
        <div>
          <h1 className="rm-page-title">
            <Icon name="car" size={22} style={{ color: 'var(--clr-amber)' }} />
            <span>KARAKTERISTIK KELAS MOBIL & STANDAR PEMBALAP</span>
          </h1>
          <p className="rm-page-desc">
            Parameter kesetaraan performa mobil sasis, standar keselamatan kokpit, serta ambang batas poin Superlicense resmi bagi pembalap.
          </p>
        </div>
        <div>
          <span className="rm-tag rm-tag-info">Kategori Premier Tier</span>
        </div>
      </div>

      <div className="rm-grid-2" style={{ marginBottom: '20px' }}>
        {/* Karakteristik Mobil */}
        <div className="rm-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', borderBottom: '1px solid var(--clr-border-subtle)', paddingBottom: '10px' }}>
            <Icon name="specs" size={18} style={{ color: 'var(--clr-amber)' }} />
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--clr-white-pure)' }}>
              DISPARITAS & KESELAMATAN KENDARAAN
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--clr-text-secondary)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                Tingkat Disparitas Performa Mobil
              </label>
              <select
                value={characteristics.carDisparity}
                onChange={(e) => updateCharacteristic('carDisparity', e.target.value)}
                className="rm-select"
              >
                <option value="Spec-Series">Spec-Series — Sasis & aero identik (Kemenangan murni bergantung pada skill pembalap)</option>
                <option value="Medium">Medium Disparity — Sasis bebas dalam batasan ketat (Kombinasi mobil kompetitif & pembalap)</option>
                <option value="Open Engineering">Open Engineering — Kebebasan riset luas (Tim dengan insinyur terbaik mendominasi)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', color: 'var(--clr-text-secondary)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                Standar Keselamatan Kokpit & Sasis
              </label>
              <select
                value={characteristics.safetyStandard}
                onChange={(e) => updateCharacteristic('safetyStandard', e.target.value)}
                className="rm-select"
              >
                <option value="FIA Grade 1 Halo & Titanium Cell">Grade 1: Pelindung Halo Titanium + Sel Bahan Bakar Kevlar</option>
                <option value="Reinforced Cockpit Standard">Grade 2: Penguat Kokpit Standar + Uji Tabrak 50G</option>
                <option value="Classic Open Cockpit">Heritage Grade: Kokpit Terbuka Tanpa Halo</option>
              </select>
            </div>
          </div>
        </div>

        {/* Kriteria Pembalap */}
        <div className="rm-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', borderBottom: '1px solid var(--clr-border-subtle)', paddingBottom: '10px' }}>
            <Icon name="teams" size={18} style={{ color: '#38bdf8' }} />
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--clr-white-pure)' }}>
              LISENSI PEMBALAP (FIA SUPERLICENSE)
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', color: 'var(--clr-text-secondary)', fontWeight: 600 }}>Ambang Batas Poin Superlicense:</span>
                <span style={{ fontWeight: 700, color: 'var(--clr-amber)', fontFamily: 'var(--font-heading)', fontSize: '15px', fontFeatureSettings: "'tnum' 1" }}>
                  {characteristics.driverSuperlicenseThreshold} Poin
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="50"
                step="5"
                value={characteristics.driverSuperlicenseThreshold}
                onChange={(e) => updateCharacteristic('driverSuperlicenseThreshold', Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--clr-amber)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--clr-text-muted)' }}>
                <span>20 Poin (Banyak Talenta Muda / Pay-Drivers)</span>
                <span>50 Poin (Hanya Pembalap Elit Dunia)</span>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', color: 'var(--clr-text-secondary)', fontWeight: 600 }}>Usia Minimum Pembalap:</span>
                <span style={{ fontWeight: 700, color: '#38bdf8', fontFamily: 'var(--font-heading)', fontSize: '15px', fontFeatureSettings: "'tnum' 1" }}>
                  {characteristics.minDriverAge} Tahun
                </span>
              </div>
              <input
                type="range"
                min="16"
                max="21"
                step="1"
                value={characteristics.minDriverAge}
                onChange={(e) => updateCharacteristic('minDriverAge', Number(e.target.value))}
                style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Roster Pembalap */}
      <div className="rm-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--clr-white-pure)' }}>
            DATABASE PEMBALAP TERDAFTAR ({allDrivers.length} PEMBALAP)
          </h2>
          <span className="rm-tag rm-tag-success">Superlicense Terverifikasi</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '12px'
          }}
        >
          {allDrivers.map((driver) => (
            <div
              key={driver.id}
              style={{
                background: 'var(--clr-bg-elevated)',
                border: '1px solid var(--clr-border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--clr-white-pure)' }}>{driver.name}</div>
                <span className="rm-tag rm-tag-warning" style={{ fontSize: '11px', fontFeatureSettings: "'tnum' 1" }}>
                  Skill: {driver.skill}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--clr-text-secondary)' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: driver.teamColor }} />
                <span>{driver.teamName}</span>
                <span>• {driver.nationality}</span>
              </div>

              <div style={{ fontSize: '11px', color: 'var(--clr-text-muted)', fontFeatureSettings: "'tnum' 1" }}>
                Gaji Kontrak: ${(driver.salary / 1_000_000).toFixed(1)}M / musim
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
