import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRaceManagerStore } from '../../store/useRaceManagerStore.js';
import Icon from '../../components/common/Icon.jsx';

export default function DashboardPage() {
  const {
    leagueName,
    circuits,
    selectedCircuitId,
    raceSetup,
    setRaceSetup,
    liveRace,
    startGrandPrix,
    tickLiveRace,
    tickRaceSecond,
    setSimSpeed,
    setSafetyCar,
    resumeFromRedFlag,
    callRedFlagFinish,
    resolveLiveIncident,
    exitRaceView,
    togglePauseRace,
    teams
  } = useRaceManagerStore();

  const [selectedSector, setSelectedSector] = useState(1);
  const selectedCircuit = circuits.find(c => c.id === (raceSetup.circuitId || selectedCircuitId)) || circuits[0];

  // Auto-tick live race timer per 1 detik (1000ms) untuk simulasi realistis > 1 menit per lap
  useEffect(() => {
    if (!liveRace.isRacing || liveRace.isFinished || liveRace.isPaused) return;

    const timer = setInterval(() => {
      tickRaceSecond(1);
    }, 1000);

    return () => clearInterval(timer);
  }, [liveRace.isRacing, liveRace.isFinished, liveRace.isPaused, tickRaceSecond]);

  // ─────────────────────────────────────────────────────────────
  // TAMPILAN 1: POST-RACE CLASSIFICATION & FINANCIAL PAYOUT
  // ─────────────────────────────────────────────────────────────
  if (liveRace.isFinished && liveRace.podium) {
    const fmt = (num) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);

    return (
      <div className="animate-fadeIn" style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
        <div className="rm-card" style={{ padding: '36px 32px', borderColor: 'var(--clr-amber)' }}>
          <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(245, 166, 35, 0.1)', borderRadius: 'var(--radius-full)', color: 'var(--clr-amber)', marginBottom: '12px' }}>
            <Icon name="trophy" size={32} />
          </div>
          
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--clr-white-pure)', letterSpacing: '0.04em' }}>
            HASIL RESMI GRAND PRIX {liveRace.circuit?.name.toUpperCase()}
          </h1>
          <p style={{ color: 'var(--clr-text-secondary)', fontSize: '14px', marginTop: '4px' }}>
            Sesi kejuaraan selesai diawasi oleh panel komisioner dan pengawas balap.
          </p>

          {/* Podium P1, P2, P3 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              margin: '28px 0',
              alignItems: 'flex-end'
            }}
          >
            {/* P2 */}
            <div style={{ background: 'var(--clr-bg-elevated)', padding: '18px 16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--clr-border-default)' }}>
              <span className="rm-tag" style={{ background: 'rgba(148, 163, 184, 0.15)', color: '#94a3b8', marginBottom: '8px' }}>
                POSISI 2
              </span>
              <div style={{ fontSize: '17px', fontWeight: 700, color: 'var(--clr-white-pure)' }}>{liveRace.podium[1]?.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--clr-text-muted)' }}>{liveRace.podium[1]?.teamName}</div>
            </div>

            {/* P1 Winner */}
            <div
              style={{
                background: 'var(--clr-bg-surface)',
                padding: '24px 18px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--clr-amber)'
              }}
            >
              <span className="rm-tag rm-tag-warning" style={{ marginBottom: '8px' }}>
                JUARA GRAND PRIX
              </span>
              <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--clr-white-pure)', marginTop: '2px' }}>
                {liveRace.podium[0]?.name}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--clr-amber)' }}>{liveRace.podium[0]?.teamName}</div>
            </div>

            {/* P3 */}
            <div style={{ background: 'var(--clr-bg-elevated)', padding: '18px 16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--clr-border-default)' }}>
              <span className="rm-tag" style={{ background: 'rgba(217, 119, 6, 0.15)', color: '#d97706', marginBottom: '8px' }}>
                POSISI 3
              </span>
              <div style={{ fontSize: '17px', fontWeight: 700, color: 'var(--clr-white-pure)' }}>{liveRace.podium[2]?.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--clr-text-muted)' }}>{liveRace.podium[2]?.teamName}</div>
            </div>
          </div>

          {/* Hadiah Pemasukan Asosiasi */}
          <div
            style={{
              background: 'rgba(46, 204, 113, 0.08)',
              border: '1px solid rgba(46, 204, 113, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 20px',
              marginBottom: '24px',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ fontSize: '11px', color: 'var(--clr-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Pendapatan Bersih Penyelenggara
              </div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#2ecc71', fontFamily: 'var(--font-heading)', fontFeatureSettings: "'tnum' 1" }}>
                +{fmt(liveRace.financialReward)}
              </div>
            </div>
            <div style={{ textAlign: 'left', fontSize: '12px', color: 'var(--clr-text-secondary)', lineHeight: '1.6' }}>
              <div>• Biaya Izin Tuan Rumah: $4,500,000</div>
              <div>• Bagi Hasil Tiket Penonton: $2,800,000</div>
              <div>• Bonus Distribusi Hak Siar: $3,200,000</div>
            </div>
          </div>

          <button className="rm-btn rm-btn-primary" onClick={exitRaceView} style={{ padding: '10px 24px' }}>
            <Icon name="check" size={16} />
            <span>Selesaikan Seri & Kembali ke Race Control</span>
          </button>
        </div>
      </div>
    );
  }

  // Helper format durasi detik ke MM:SS
  const formatLapTime = (sec) => {
    const s = Math.max(0, Math.floor(sec || 0));
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  // ─────────────────────────────────────────────────────────────
  // TAMPILAN 2: LIVE RACE CONTROL ROOM (SEDANG BALAPAN)
  // ─────────────────────────────────────────────────────────────
  if (liveRace.isRacing) {
    const activeIncident = liveRace.incidentsQueue[0];
    const timeRemainingSec = Math.max(0, Math.round((liveRace.lapDuration || 72) - (liveRace.lapElapsed || 0)));

    return (
      <div className="animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Top Control Banner */}
        <div className="rm-race-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>{liveRace.circuit?.flag}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 900, color: 'var(--clr-white-pure)' }}>
                  {liveRace.circuit?.name.toUpperCase()}
                </span>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--clr-text-secondary)' }}>
                Layout: {raceSetup.layoutName} • Kondisi: {liveRace.weather}
              </span>
            </div>
          </div>

          {/* Lap Counter & Real-Time Progress Timer (>1 Menit per Lap) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '220px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--clr-amber)', fontFamily: 'var(--font-heading)', fontFeatureSettings: "'tnum' 1" }}>
                LAP {liveRace.lap}
              </span>
              <span style={{ fontSize: '15px', color: 'var(--clr-text-muted)' }}>/ {liveRace.totalLaps}</span>
            </div>

            {/* Lap Timer Progress & Countdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontFamily: 'var(--font-heading)', fontFeatureSettings: "'tnum' 1", color: 'var(--clr-text-secondary)', marginTop: '2px' }}>
              <Icon name="clock" size={13} style={{ color: 'var(--clr-amber)' }} />
              <span>{formatLapTime(liveRace.lapElapsed)} / {formatLapTime(liveRace.lapDuration)}</span>
              <span style={{ fontSize: '11px', color: timeRemainingSec <= 15 ? '#ef4444' : 'var(--clr-text-muted)', fontWeight: timeRemainingSec <= 15 ? 700 : 500 }}>
                (Sisa {timeRemainingSec}s)
              </span>
            </div>

            {/* Progress Bar Lap */}
            <div style={{ width: '100%', height: '5px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden', marginTop: '6px' }}>
              <div
                style={{
                  width: `${Math.min(100, Math.max(0, ((liveRace.lapElapsed || 0) / (liveRace.lapDuration || 72)) * 100))}%`,
                  height: '100%',
                  background: liveRace.safetyCar === 'Safety Car' ? '#ef4444' : liveRace.safetyCar === 'Virtual Safety Car' ? 'var(--clr-amber)' : '#38bdf8',
                  transition: 'width 0.9s linear'
                }}
              />
            </div>
          </div>

          {/* Flag Indicator & Pace */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div
              className={`rm-flag-indicator ${
                liveRace.safetyCar === 'Green Flag'
                  ? 'rm-flag-green'
                  : liveRace.safetyCar === 'Red Flag'
                  ? 'rm-flag-red'
                  : liveRace.safetyCar === 'Virtual Safety Car'
                  ? 'rm-flag-vsc'
                  : liveRace.safetyCar === 'Safety Car'
                  ? 'rm-flag-sc'
                  : liveRace.safetyCar?.startsWith('Double Yellow')
                  ? 'rm-flag-double-yellow'
                  : 'rm-flag-yellow'
              }`}
            >
              <Icon name="flag" size={14} />
              <span>{liveRace.safetyCar}</span>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--clr-text-muted)', fontFamily: 'var(--font-heading)', letterSpacing: '0.02em' }}>
              {liveRace.safetyCar === 'Green Flag' && `Pace: Normal (~${liveRace.lapDuration || 72}s/lap)`}
              {liveRace.safetyCar === 'Red Flag' && `🔴 SESI DITANGGUHKAN (Mobil di Jalur Pit)`}
              {liveRace.safetyCar === 'Virtual Safety Car' && `Pace: VSC Delta (~${liveRace.lapDuration || 105}s Lebih Pelan)`}
              {liveRace.safetyCar === 'Safety Car' && `Pace: SC Konvoi (~${liveRace.lapDuration || 135}s Sangat Pelan)`}
              {liveRace.safetyCar?.startsWith('Double Yellow') && `Pace: Bahaya Besar (~${liveRace.lapDuration}s Pelan)`}
              {liveRace.safetyCar?.startsWith('Yellow Flag') && `Pace: Kuning Sektor (~${liveRace.lapDuration}s)`}
            </span>
          </div>

          {/* Simulation Speed & Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Speed Multipliers */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'var(--clr-bg-elevated)',
                borderRadius: 'var(--radius-md)',
                padding: '2px',
                border: '1px solid var(--clr-border-subtle)'
              }}
            >
              {[1, 2, 4].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setSimSpeed(spd)}
                  style={{
                    background: (liveRace.simSpeed || 1) === spd ? 'var(--clr-blue-primary)' : 'transparent',
                    color: (liveRace.simSpeed || 1) === spd ? '#ffffff' : 'var(--clr-text-secondary)',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    padding: '4px 8px',
                    fontSize: '11px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-heading)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  title={spd === 1 ? 'Kecepatan Realistis (>1 menit per lap)' : `Percepat simulasi ${spd}x`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            <button className="rm-btn rm-btn-outline" onClick={togglePauseRace} title="Jeda waktu agar leluasa berpikir">
              <Icon name={liveRace.isPaused ? 'play' : 'pause'} size={14} />
              <span>{liveRace.isPaused ? 'Lanjutkan' : 'Jeda'}</span>
            </button>
            <button className="rm-btn rm-btn-outline" onClick={tickLiveRace} title="Lewati / Majukan 1 Lap Langsung">
              <Icon name="fast-forward" size={14} />
              <span>+1 Lap</span>
            </button>
            <button
              className="rm-btn rm-btn-danger"
              onClick={() => {
                if (window.confirm('Hentikan paksa sesi Grand Prix ini (Keluar)?')) {
                  exitRaceView();
                }
              }}
            >
              <Icon name="x" size={14} />
              <span>Abort</span>
            </button>
          </div>
        </div>

        {/* Panel Interaktif Khusus: Saat Red Flag (Session Stop) Aktif */}
        {liveRace.safetyCar === 'Red Flag' && (
          <div
            style={{
              background: 'rgba(220, 38, 38, 0.08)',
              border: '2px solid #dc2626',
              borderRadius: 'var(--radius-lg)',
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
              boxShadow: '0 4px 14px rgba(220, 38, 38, 0.2)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#dc2626' }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: '15px', color: '#dc2626', fontFamily: 'var(--font-heading)' }}>
                  🔴 BENDERA MERAH (RED FLAG) — SESI BALAPAN DITANGGUHKAN
                </div>
                <div style={{ fontSize: '12px', color: 'var(--clr-text-secondary)', marginTop: '2px' }}>
                  Seluruh mobil berada di jalur pit. Waktu balapan dihentikan. Tentukan kelanjutan sesi:
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                className="rm-btn"
                onClick={() => resumeFromRedFlag('Green Flag')}
                style={{ fontSize: '13px', padding: '8px 14px', background: '#16a34a', color: '#ffffff', borderColor: '#16a34a' }}
                title="Mulai kembali balapan dengan Standing Restart di trek bersih"
              >
                <Icon name="play" size={14} />
                <span>Standing Restart (Green Flag)</span>
              </button>

              <button
                className="rm-btn"
                onClick={() => resumeFromRedFlag('Safety Car')}
                style={{ fontSize: '13px', padding: '8px 14px', background: 'rgba(245, 166, 35, 0.15)', borderColor: 'var(--clr-amber)', color: 'var(--clr-amber)' }}
                title="Mulai kembali balapan berbaris di belakang Safety Car"
              >
                <Icon name="flag" size={14} />
                <span>Rolling Restart (Behind SC)</span>
              </button>

              <button
                className="rm-btn rm-btn-danger"
                onClick={() => {
                  if (window.confirm('Sahkan klasifikasi posisi saat ini dan nyatakan balapan selesai secara resmi?')) {
                    callRedFlagFinish();
                  }
                }}
                style={{ fontSize: '13px', padding: '8px 14px' }}
                title="Akhiri balapan permanen dan bagikan hadiah poin/keuangan"
              >
                <Icon name="trophy" size={14} />
                <span>Sahkan Hasil & Akhiri GP</span>
              </button>
            </div>
          </div>
        )}

        {/* Action Panel Race Director: Flag Toggles (Yellow, Double Yellow per Sector, VSC, SC, Red Flag) */}
        <div
          style={{
            background: 'var(--clr-bg-card)',
            border: '1px solid var(--clr-border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--clr-text-secondary)' }}>
              <Icon name="flag" size={16} />
              <span>KONTROL BENDERA RACE DIRECTOR:</span>
            </div>

            {/* Pemilih Sektor Aktif untuk Bendera Kuning */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'var(--clr-bg-elevated)',
                borderRadius: 'var(--radius-sm)',
                padding: '2px',
                border: '1px solid var(--clr-border-subtle)'
              }}
              title="Pilih sektor lintasan untuk menerapkan Yellow Flag atau Double Yellow"
            >
              {[1, 2, 3].map((sec) => (
                <button
                  key={sec}
                  onClick={() => setSelectedSector(sec)}
                  style={{
                    background: selectedSector === sec ? 'var(--clr-amber)' : 'transparent',
                    color: selectedSector === sec ? '#0a0c10' : 'var(--clr-text-secondary)',
                    border: 'none',
                    borderRadius: '3px',
                    padding: '2px 8px',
                    fontSize: '11px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-heading)',
                    cursor: 'pointer'
                  }}
                >
                  S{sec}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {/* 1. Green Flag */}
            <button
              className="rm-btn rm-btn-outline"
              onClick={() => setSafetyCar('Green Flag')}
              style={{
                borderColor: liveRace.safetyCar === 'Green Flag' ? '#16a34a' : 'var(--clr-border-default)',
                color: liveRace.safetyCar === 'Green Flag' ? '#16a34a' : 'inherit',
                fontSize: '12px',
                padding: '5px 10px'
              }}
              title="Lintasan bersih, balapan kecepatan penuh tanpa larangan overtake"
            >
              🟢 Green Flag (Normal)
            </button>

            {/* 2. Single Yellow Flag per Sektor */}
            <button
              className="rm-btn rm-btn-outline"
              onClick={() => setSafetyCar(`Yellow Flag (Sector ${selectedSector})`)}
              style={{
                borderColor: liveRace.safetyCar === `Yellow Flag (Sector ${selectedSector})` ? '#d97706' : 'var(--clr-border-default)',
                color: liveRace.safetyCar === `Yellow Flag (Sector ${selectedSector})` ? '#d97706' : 'inherit',
                fontSize: '12px',
                padding: '5px 10px'
              }}
              title={`Kibarkan bendera kuning di Sektor ${selectedSector}: pembalap dilarang menyalip di sektor ini`}
            >
              🟡 Yellow Flag S{selectedSector}
            </button>

            {/* 3. Double Yellow Flag per Sektor */}
            <button
              className="rm-btn rm-btn-outline"
              onClick={() => setSafetyCar(`Double Yellow (Sector ${selectedSector})`)}
              style={{
                borderColor: liveRace.safetyCar === `Double Yellow (Sector ${selectedSector})` ? '#b45309' : 'var(--clr-border-default)',
                color: liveRace.safetyCar === `Double Yellow (Sector ${selectedSector})` ? '#b45309' : 'inherit',
                fontSize: '12px',
                padding: '5px 10px',
                fontWeight: 700
              }}
              title={`Kibarkan bendera kuning ganda di Sektor ${selectedSector}: bahaya besar / evakuasi di lintasan!`}
            >
              ⚠️ Double Yellow S{selectedSector}
            </button>

            {/* 4. Virtual Safety Car */}
            <button
              className="rm-btn rm-btn-outline"
              onClick={() => setSafetyCar('Virtual Safety Car')}
              style={{
                borderColor: liveRace.safetyCar === 'Virtual Safety Car' ? 'var(--clr-amber)' : 'var(--clr-border-default)',
                color: liveRace.safetyCar === 'Virtual Safety Car' ? 'var(--clr-amber)' : 'inherit',
                fontSize: '12px',
                padding: '5px 10px'
              }}
              title="Virtual Safety Car: Kecepatan delta dibatasi di seluruh lintasan"
            >
              ⚡ VSC
            </button>

            {/* 5. Full Safety Car */}
            <button
              className="rm-btn rm-btn-outline"
              onClick={() => setSafetyCar('Safety Car')}
              style={{
                borderColor: liveRace.safetyCar === 'Safety Car' ? '#dc2626' : 'var(--clr-border-default)',
                color: liveRace.safetyCar === 'Safety Car' ? '#dc2626' : 'inherit',
                fontSize: '12px',
                padding: '5px 10px'
              }}
              title="Full Safety Car: Mobil pemandu turun ke trek, barisan merapat konvoi"
            >
              🛡️ Safety Car (SC)
            </button>

            {/* 6. Red Flag (Session Stop) */}
            <button
              className="rm-btn rm-btn-danger"
              onClick={() => setSafetyCar('Red Flag')}
              style={{
                fontSize: '12px',
                padding: '5px 12px',
                fontWeight: 700
              }}
              title="Kibarkan Red Flag: Tangguhkan balapan seketika, seluruh mobil masuk pit lane"
            >
              🔴 Red Flag (Session Stop)
            </button>
          </div>
        </div>

        {/* 2 Kolom: Live Leaderboard vs Evaluasi Insiden */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: '16px' }}>
          {/* Kolom Kiri: Live Grid Leaderboard */}
          <div className="rm-table-wrapper">
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--clr-border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: '14px', fontFamily: 'var(--font-heading)', color: 'var(--clr-white-pure)' }}>
                TELEMETRI GRID (12 MOBIL)
              </div>
              <span className="rm-tag rm-tag-success" style={{ fontSize: '10px' }}>
                Transponder Aktif
              </span>
            </div>

            <table className="rm-table">
              <thead>
                <tr>
                  <th style={{ width: '45px' }}>Pos</th>
                  <th>Pembalap</th>
                  <th>Tim</th>
                  <th>Ban</th>
                  <th>Kondisi</th>
                  <th>Gap</th>
                  <th>Penalti</th>
                </tr>
              </thead>
              <tbody>
                {liveRace.drivers.map((d) => (
                  <tr key={d.id} style={{ opacity: d.dnf ? 0.4 : 1 }}>
                    <td style={{ fontWeight: 800, fontFamily: 'var(--font-heading)', color: d.position === 1 ? 'var(--clr-amber)' : 'var(--clr-white-pure)' }}>
                      P{d.position}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--clr-white-pure)' }}>{d.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--clr-text-muted)' }}>{d.nationality}</div>
                    </td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: d.teamColor }} />
                        <span style={{ fontSize: '12px', color: 'var(--clr-text-secondary)' }}>{d.teamName}</span>
                      </span>
                    </td>
                    <td>
                      <span
                        className="rm-tag"
                        style={{
                          background: d.tyre === 'Soft' ? 'rgba(239, 68, 68, 0.12)' : d.tyre === 'Medium' ? 'rgba(245, 166, 35, 0.12)' : 'rgba(56, 189, 248, 0.12)',
                          color: d.tyre === 'Soft' ? '#ef4444' : d.tyre === 'Medium' ? 'var(--clr-amber)' : '#38bdf8'
                        }}
                      >
                        {d.tyre}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '12px', color: d.tyreWear > 40 ? '#2ecc71' : '#ef4444', fontWeight: 600 }}>
                        {d.tyreWear}%
                      </span>
                    </td>
                    <td style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '13px' }}>
                      {d.position === 1 ? 'LEADER' : `+${d.gapToLeader}s`}
                    </td>
                    <td>
                      {d.penaltySeconds > 0 ? (
                        <span className="rm-tag rm-tag-danger">+{d.penaltySeconds}s</span>
                      ) : (
                        <span style={{ color: 'var(--clr-text-muted)', fontSize: '12px' }}>-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Kolom Kanan: Evaluasi Insiden & Vonis Stewards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Box Kasus Insiden yang Sedang Menunggu Vonis */}
            {activeIncident ? (
              <div
                className="rm-card"
                style={{
                  border: '1px solid #ef4444',
                  background: 'rgba(239, 68, 68, 0.04)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="rm-tag rm-tag-danger">
                    <Icon name="alert-triangle" size={12} />
                    <span>INVESTIGASI LAP {activeIncident.lap}</span>
                  </span>
                  <span style={{ fontSize: '11px', color: timeRemainingSec <= 15 ? '#ef4444' : 'var(--clr-amber)', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                    ⏱ Sisa Waktu Putusan: {timeRemainingSec}s (atau klik "Jeda")
                  </span>
                </div>

                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--clr-white-pure)', marginBottom: '6px', fontFamily: 'var(--font-heading)' }}>
                  {activeIncident.title}
                </div>

                <p style={{ fontSize: '12px', color: 'var(--clr-text-secondary)', lineHeight: '1.5', marginBottom: '14px', background: 'var(--clr-bg-elevated)', padding: '10px 12px', borderRadius: 'var(--radius-sm)' }}>
                  {activeIncident.desc}
                </p>

                <div style={{ fontSize: '11px', color: 'var(--clr-amber)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
                  PILIH TINDAKAN RESMI STEWARDS:
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <button
                    className="rm-btn rm-btn-outline"
                    onClick={() => resolveLiveIncident(activeIncident.id, 'no_action')}
                    style={{ justifyContent: 'flex-start', padding: '8px 12px', fontSize: '13px' }}
                  >
                    <Icon name="check" size={14} />
                    <span><strong>No Further Action</strong> — Insiden Balap Normal</span>
                  </button>

                  <button
                    className="rm-btn rm-btn-outline"
                    onClick={() => resolveLiveIncident(activeIncident.id, 'time_penalty_5s')}
                    style={{ justifyContent: 'flex-start', padding: '8px 12px', fontSize: '13px', borderColor: 'rgba(245, 166, 35, 0.4)', color: 'var(--clr-amber)' }}
                  >
                    <Icon name="clock" size={14} />
                    <span><strong>Penalti +5 Detik</strong> untuk Pelanggar</span>
                  </button>

                  <button
                    className="rm-btn rm-btn-outline"
                    onClick={() => resolveLiveIncident(activeIncident.id, 'stop_go_10s')}
                    style={{ justifyContent: 'flex-start', padding: '8px 12px', fontSize: '13px', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#ef4444' }}
                  >
                    <Icon name="x" size={14} />
                    <span><strong>Penalti 10s Stop & Go</strong></span>
                  </button>

                  <button
                    className="rm-btn rm-btn-danger"
                    onClick={() => resolveLiveIncident(activeIncident.id, 'deploy_sc')}
                    style={{ justifyContent: 'flex-start', padding: '8px 12px', fontSize: '13px' }}
                  >
                    <Icon name="flag" size={14} />
                    <span><strong>Keluarkan Full Safety Car (SC)</strong></span>
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="rm-card"
                style={{
                  textAlign: 'center',
                  padding: '24px 16px',
                  background: 'var(--clr-bg-card)',
                  borderStyle: 'dashed'
                }}
              >
                <Icon name="check" size={24} style={{ color: '#2ecc71', marginBottom: '6px' }} />
                <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--clr-white-pure)' }}>Lintasan Bersih</div>
                <div style={{ fontSize: '12px', color: 'var(--clr-text-muted)', marginTop: '2px' }}>
                  Tidak ada insiden yang dilaporkan. Sektor balapan terpantau aman.
                </div>
              </div>
            )}

            {/* Riwayat Putusan Stewards */}
            <div className="rm-card">
              <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '10px', color: 'var(--clr-white-pure)' }}>
                LOG KEPUTUSAN STEWARDS
              </div>

              {liveRace.incidentHistory.length === 0 ? (
                <div style={{ fontSize: '12px', color: 'var(--clr-text-muted)' }}>Belum ada putusan insiden di seri ini.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '200px', overflowY: 'auto' }}>
                  {liveRace.incidentHistory.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '6px 10px',
                        background: 'var(--clr-bg-elevated)',
                        borderLeft: '2px solid var(--clr-amber)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '11px'
                      }}
                    >
                      <div style={{ fontWeight: 700, color: 'var(--clr-white-pure)' }}>Lap {item.lap}: {item.title}</div>
                      <div style={{ color: 'var(--clr-text-secondary)', marginTop: '2px' }}>{item.decisionLog}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // TAMPILAN 3: RACE CONTROL HQ (SETUP GRAND PRIX & BRIEFING)
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="animate-fadeIn">
      {/* Page Header */}
      <div className="rm-page-header">
        <div>
          <h1 className="rm-page-title">
            <Icon name="race-control" size={22} style={{ color: 'var(--clr-amber)' }} />
            <span>RACE CONTROL EXECUTIVE HQ</span>
          </h1>
          <p className="rm-page-desc">
            Pusat komando penyelenggara kejuaraan <strong>{leagueName}</strong>. Atur konfigurasi seri Grand Prix, verifikasi grid, dan pimpin jalannya balapan.
          </p>
        </div>
        <div>
          <span className="rm-tag rm-tag-success">Grid Siap Balap</span>
        </div>
      </div>

      {/* Hero Grand Prix Setup Card */}
      <div
        className="rm-card"
        style={{
          padding: '24px',
          marginBottom: '20px',
          background: 'var(--clr-bg-surface)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="rm-tag rm-tag-warning" style={{ marginBottom: '6px' }}>
              SERI GRAND PRIX BERIKUTNYA
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px' }}>{selectedCircuit.flag}</span>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--clr-white-pure)', fontFamily: 'var(--font-heading)' }}>
                {selectedCircuit.name}
              </h2>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--clr-text-secondary)', marginTop: '2px' }}>
              {selectedCircuit.location}, {selectedCircuit.country} • {selectedCircuit.grade}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Link to="/circuits" className="rm-btn rm-btn-outline">
              <Icon name="globe" size={15} />
              <span>Ganti Sirkuit ({circuits.length})</span>
            </Link>

            {/* Exactly 1 Primary Action (Section 5.1 design.md) */}
            <button className="rm-btn rm-btn-primary" onClick={startGrandPrix} style={{ padding: '10px 22px' }}>
              <Icon name="play" size={15} />
              <span>MULAI BALAPAN (START GRAND PRIX)</span>
            </button>
          </div>
        </div>

        {/* Configuration Bars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid var(--clr-border-subtle)'
          }}
        >
          {/* Pilih Layout */}
          <div>
            <label style={{ fontSize: '11px', color: 'var(--clr-text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '6px', fontWeight: 700 }}>
              Layout Sirkuit
            </label>
            <select
              value={raceSetup.layoutName}
              onChange={(e) => setRaceSetup({ layoutName: e.target.value })}
              className="rm-select"
            >
              {selectedCircuit.layouts.map((l, idx) => (
                <option key={idx} value={l.name}>
                  {l.name} ({l.lengthKm} km)
                </option>
              ))}
            </select>
          </div>

          {/* Kondisi Cuaca */}
          <div>
            <label style={{ fontSize: '11px', color: 'var(--clr-text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '6px', fontWeight: 700 }}>
              Kondisi Cuaca
            </label>
            <select
              value={raceSetup.weather}
              onChange={(e) => setRaceSetup({ weather: e.target.value })}
              className="rm-select"
            >
              <option value="Dry">Kering (Dry / High Grip)</option>
              <option value="Wet">Basah (Wet / Licin)</option>
              <option value="Dynamic">Berubah-ubah (Variable)</option>
            </select>
          </div>

          {/* Jumlah Lap */}
          <div>
            <label style={{ fontSize: '11px', color: 'var(--clr-text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '6px', fontWeight: 700 }}>
              Jarak Balapan: <span style={{ color: 'var(--clr-amber)' }}>{raceSetup.totalLaps} Laps</span>
            </label>
            <input
              type="range"
              min="10"
              max="35"
              step="5"
              value={raceSetup.totalLaps}
              onChange={(e) => setRaceSetup({ totalLaps: Number(e.target.value) })}
              style={{ width: '100%', accentColor: 'var(--clr-amber)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--clr-text-muted)' }}>
              <span>10 Laps (Sprint)</span>
              <span>20 Laps (Standard)</span>
              <span>35 Laps (Endurance)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Tim Preview & Panduan Komisioner */}
      <div className="rm-grid-2">
        {/* Kolom Kiri: Grid Start Tim */}
        <div className="rm-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--clr-white-pure)' }}>
              GRID TIM TERDAFTAR ({teams.filter(t => t.licenseActive).length} TIM AKTIF)
            </h2>
            <Link to="/teams" style={{ fontSize: '12px', color: 'var(--clr-amber)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>Kelola Tim</span>
              <Icon name="arrow-right" size={12} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {teams.map(team => (
              <div
                key={team.id}
                style={{
                  background: 'var(--clr-bg-elevated)',
                  border: '1px solid var(--clr-border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '9px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '3px', height: '26px', background: team.color, borderRadius: '2px' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--clr-white-pure)' }}>{team.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--clr-text-muted)' }}>
                      Pembalap: {team.drivers.map(d => d.name).join(' • ')}
                    </div>
                  </div>
                </div>

                <div>
                  <span className={`rm-tag ${team.licenseActive ? 'rm-tag-success' : 'rm-tag-danger'}`} style={{ fontSize: '10px' }}>
                    {team.licenseActive ? 'Siap' : 'Dibekukan'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Panduan Komisioner */}
        <div className="rm-card">
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px', color: 'var(--clr-white-pure)' }}>
            PROTOKOL PENGAWAS BALAP (RACE DIRECTOR)
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', lineHeight: '1.5', color: 'var(--clr-text-secondary)' }}>
            <div style={{ background: 'var(--clr-bg-elevated)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', borderLeft: '2px solid #2ecc71' }}>
              <strong style={{ color: 'var(--clr-white-pure)' }}>1. Memulai Sesi:</strong> Klik tombol mulai balapan untuk membuka konsol Race Control. Seluruh transponder mobil akan tersambung secara live.
            </div>

            <div style={{ background: 'var(--clr-bg-elevated)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', borderLeft: '2px solid var(--clr-amber)' }}>
              <strong style={{ color: 'var(--clr-white-pure)' }}>2. Vonis Insiden & Penalti:</strong> Bila pengawas teknis mendeteksi benturan, pemotongan chicane, atau unsafe release, kamu bertindak menjatuhkan vonis No Action, +5s, 10s Stop & Go, atau Safety Car.
            </div>

            <div style={{ background: 'var(--clr-bg-elevated)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', borderLeft: '2px solid #ef4444' }}>
              <strong style={{ color: 'var(--clr-white-pure)' }}>3. Intervensi Keselamatan:</strong> Aktifkan Virtual Safety Car (VSC) atau Full Safety Car (SC) saat puing menghalangi lintasan untuk menetralkan kecepatan mobil.
            </div>

            <div style={{ background: 'var(--clr-bg-elevated)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', borderLeft: '2px solid #38bdf8' }}>
              <strong style={{ color: 'var(--clr-white-pure)' }}>4. Pendapatan Hak Siar & Tiket:</strong> Begitu bendera finis dikibarkan, asosiasi mencairkan pendapatan izin sirkuit dan penjualan tiket resmi.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
