import React, { useState } from 'react';
import { useRaceManagerStore } from '../../store/useRaceManagerStore.js';
import Icon from '../../components/common/Icon.jsx';

export default function TeamsPage() {
  const { teams, funds, buyTeam, sellTeam, toggleTeamLicense } = useRaceManagerStore();
  const [selectedTeam, setSelectedTeam] = useState(null);

  const activeTeam = selectedTeam || teams[0];

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="rm-page-header">
        <div>
          <h1 className="rm-page-title">
            <Icon name="teams" size={22} style={{ color: 'var(--clr-amber)' }} />
            <span>GRID TIM BALAP & BURSA FRANCHISE</span>
          </h1>
          <p className="rm-page-desc">
            Manajemen izin slot waralaba (*franchise license*), valuasi tim kompetitor, serta transaksi kepemilikan tim balap di grid.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="rm-tag rm-tag-success">{teams.filter(t => t.licenseActive).length} Slot Berlisensi</span>
          <span className="rm-tag rm-tag-warning">{teams.filter(t => t.forSale).length} Tersedia di Bursa</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
        {/* Kolom Kiri: Daftar Tim */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {teams.map(team => {
            const isSelected = activeTeam.id === team.id;
            return (
              <div
                key={team.id}
                onClick={() => setSelectedTeam(team)}
                className="rm-card"
                style={{
                  cursor: 'pointer',
                  borderColor: isSelected ? 'var(--clr-amber)' : 'var(--clr-border-subtle)',
                  background: isSelected ? 'rgba(245, 166, 35, 0.04)' : 'var(--clr-bg-card)',
                  padding: '14px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '4px', height: '38px', background: team.color, borderRadius: '2px' }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 700, fontSize: '15px', color: 'var(--clr-white-pure)' }}>{team.name}</span>
                      {team.isOwnedByPlayer && (
                        <span className="rm-tag rm-tag-warning" style={{ fontSize: '9px' }}>MILIK ASOSIASI</span>
                      )}
                      {!team.licenseActive && (
                        <span className="rm-tag rm-tag-danger" style={{ fontSize: '9px' }}>LISENSI DIBEKUKAN</span>
                      )}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--clr-text-secondary)', marginTop: '2px' }}>
                      Asal: {team.country} • Anggaran: ${(team.budget / 1_000_000).toFixed(0)}M / musim
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '10px', color: 'var(--clr-text-muted)', textTransform: 'uppercase' }}>Valuasi Waralaba</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#2ecc71', fontFeatureSettings: "'tnum' 1" }}>
                    ${(team.valuation / 1_000_000).toFixed(0)}M
                  </div>
                  {team.forSale && !team.isOwnedByPlayer && (
                    <span style={{ fontSize: '11px', color: 'var(--clr-amber)', fontWeight: 600, fontFeatureSettings: "'tnum' 1" }}>
                      Bursa: ${(team.askingPrice / 1_000_000).toFixed(0)}M
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Kolom Kanan: Rincian & Aksi Tim */}
        {activeTeam && (
          <div className="rm-card" style={{ position: 'sticky', top: '88px', height: 'fit-content' }}>
            <div style={{ borderBottom: '1px solid var(--clr-border-subtle)', paddingBottom: '14px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--clr-white-pure)' }}>{activeTeam.name}</h2>
                  <div style={{ fontSize: '12px', color: 'var(--clr-text-secondary)', marginTop: '2px' }}>
                    Kepemilikan: <strong style={{ color: 'var(--clr-text-primary)' }}>{activeTeam.owner}</strong>
                  </div>
                </div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: activeTeam.color }} />
              </div>
            </div>

            {/* Metrik Performa */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', color: 'var(--clr-text-muted)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 700 }}>
                Indeks Performa Teknis
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                <div style={{ background: 'var(--clr-bg-elevated)', padding: '8px 10px', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--clr-text-secondary)' }}>Mesin</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--clr-amber)', fontFeatureSettings: "'tnum' 1" }}>{activeTeam.performance.engine} / 100</div>
                </div>
                <div style={{ background: 'var(--clr-bg-elevated)', padding: '8px 10px', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--clr-text-secondary)' }}>Aerodinamika</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#38bdf8', fontFeatureSettings: "'tnum' 1" }}>{activeTeam.performance.aero} / 100</div>
                </div>
                <div style={{ background: 'var(--clr-bg-elevated)', padding: '8px 10px', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--clr-text-secondary)' }}>Reliability</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#2ecc71', fontFeatureSettings: "'tnum' 1" }}>{activeTeam.performance.reliability} / 100</div>
                </div>
                <div style={{ background: 'var(--clr-bg-elevated)', padding: '8px 10px', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--clr-text-secondary)' }}>Sasis</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#a855f7', fontFeatureSettings: "'tnum' 1" }}>{activeTeam.performance.chassis} / 100</div>
                </div>
              </div>
            </div>

            {/* Pembalap */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', color: 'var(--clr-text-muted)', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 700 }}>
                Susunan Pembalap
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {activeTeam.drivers.map((d, idx) => (
                  <div key={d.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'var(--clr-bg-elevated)',
                    padding: '7px 10px',
                    borderRadius: 'var(--radius-sm)'
                  }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--clr-white-pure)' }}>#{idx + 1} {d.name} ({d.nationality})</span>
                    <span style={{ fontSize: '12px', color: 'var(--clr-amber)', fontFeatureSettings: "'tnum' 1" }}>Rating: {d.skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tombol Aksi */}
            <div style={{ borderTop: '1px solid var(--clr-border-subtle)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activeTeam.forSale && !activeTeam.isOwnedByPlayer && (
                <button
                  className="rm-btn rm-btn-primary"
                  onClick={() => buyTeam(activeTeam.id)}
                  disabled={funds < activeTeam.askingPrice}
                  style={{ width: '100%', opacity: funds < activeTeam.askingPrice ? 0.6 : 1 }}
                >
                  <Icon name="dollar" size={14} />
                  <span>Akuisisi Tim Ini (${(activeTeam.askingPrice / 1_000_000).toFixed(0)}M)</span>
                </button>
              )}

              {activeTeam.isOwnedByPlayer && (
                <button
                  className="rm-btn rm-btn-outline"
                  onClick={() => sellTeam(activeTeam.id)}
                  style={{ width: '100%', borderColor: '#2ecc71', color: '#2ecc71' }}
                >
                  <span>Divestasi Tim (${(activeTeam.valuation * 1.1 / 1_000_000).toFixed(0)}M)</span>
                </button>
              )}

              <button
                className={`rm-btn ${activeTeam.licenseActive ? 'rm-btn-danger' : 'rm-btn-primary'}`}
                onClick={() => toggleTeamLicense(activeTeam.id)}
                style={{ width: '100%' }}
              >
                {activeTeam.licenseActive ? (
                  <>
                    <Icon name="x" size={14} />
                    <span>Bekukan Lisensi Partisipasi</span>
                  </>
                ) : (
                  <>
                    <Icon name="check" size={14} />
                    <span>Pulihkan Lisensi Partisipasi</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
