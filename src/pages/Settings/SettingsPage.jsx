import React, { useState } from 'react';
import { useRaceManagerStore } from '../../store/useRaceManagerStore.js';
import Icon from '../../components/common/Icon.jsx';

export default function SettingsPage() {
  const { leagueName, commissionerName, resetGame } = useRaceManagerStore();
  const [leagueInput, setLeagueInput] = useState(leagueName);
  const [commInput, setCommInput] = useState(commissionerName);
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    useRaceManagerStore.setState({
      leagueName: leagueInput,
      commissionerName: commInput
    });
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  };

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="rm-page-header">
        <div>
          <h1 className="rm-page-title">
            <Icon name="settings" size={22} style={{ color: 'var(--clr-amber)' }} />
            <span>PENGATURAN & KREDENSIAL PENYELENGGARA</span>
          </h1>
          <p className="rm-page-desc">
            Konfigurasi profil asosiasi, verifikasi status penyimpanan lokal (*Local Storage*), dan manajemen data kejuaraan.
          </p>
        </div>
      </div>

      <div className="rm-grid-2">
        {/* Panel Profil Asosiasi */}
        <div className="rm-card">
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px', color: 'var(--clr-white-pure)' }}>
            IDENTITAS ASOSIASI & KOMISIONER
          </h2>

          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--clr-text-secondary)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                Nama Seri Kejuaraan / Liga
              </label>
              <input
                type="text"
                value={leagueInput}
                onChange={(e) => setLeagueInput(e.target.value)}
                className="rm-input"
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', color: 'var(--clr-text-secondary)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                Nama Komisioner Penyelenggara
              </label>
              <input
                type="text"
                value={commInput}
                onChange={(e) => setCommInput(e.target.value)}
                className="rm-input"
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button type="submit" className="rm-btn rm-btn-primary">
                <Icon name="check" size={14} />
                <span>Simpan Perubahan</span>
              </button>
              {savedMsg && (
                <span style={{ color: '#2ecc71', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Icon name="check" size={12} />
                  <span>Profil Berhasil Disimpan</span>
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Panel Manajemen Data */}
        <div className="rm-card">
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px', color: 'var(--clr-white-pure)' }}>
            STATUS PENYIMPANAN DATA
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: 'var(--clr-bg-elevated)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--clr-border-subtle)' }}>
              <div style={{ fontWeight: 600, fontSize: '13px', color: '#2ecc71', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Icon name="check" size={14} />
                <span>Auto-Save Aktif (Zustand Persist)</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--clr-text-secondary)', marginTop: '4px', lineHeight: '1.5' }}>
                Perubahan regulasi teknis, putusan vonis sidang stewards, dan transaksi kas tersimpan secara otomatis di LocalStorage browser tanpa perlu tombol simpan manual.
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--clr-border-subtle)', paddingTop: '14px' }}>
              <div style={{ fontWeight: 700, fontSize: '13px', color: '#ef4444', marginBottom: '4px' }}>
                Zona Tindakan Kritis: Reset Data Game
              </div>
              <div style={{ fontSize: '12px', color: 'var(--clr-text-muted)', marginBottom: '10px' }}>
                Tindakan ini akan mengembalikan seluruh kas asosiasi, grid tim, dan regulasi ke konfigurasi awal kejuaraan baru.
              </div>
              <button
                type="button"
                className="rm-btn rm-btn-danger"
                onClick={() => {
                  if (window.confirm('Yakin ingin mereset seluruh data Race Manager ke pengaturan awal?')) {
                    resetGame();
                  }
                }}
              >
                <Icon name="x" size={14} />
                <span>Reset Data Game ke Awal</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
