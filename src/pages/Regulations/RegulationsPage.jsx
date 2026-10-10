import React, { useState } from 'react';
import { useRaceManagerStore } from '../../store/useRaceManagerStore.js';
import Icon from '../../components/common/Icon.jsx';

export default function RegulationsPage() {
  const { regulations, updateRegulation } = useRaceManagerStore();
  const [activeTab, setActiveTab] = useState('powertrain'); // 'powertrain', 'aero', 'finance', 'sporting'

  // Presets Cepat Filosofi Regulasi
  const applyPreset = (presetName) => {
    if (presetName === 'open_freedom') {
      updateRegulation('engineFormula', 'Open Formula (BoP Equivalent)');
      updateRegulation('rpmLimit', 'Tanpa Batas RPM (Unlimited Free RPM)');
      updateRegulation('fuelFlowLimitKgH', 140);
      updateRegulation('fuelType', 'Formula Bebas Tanpa Batas / Aditif Terbuka');
      updateRegulation('ersHybridSystem', 'Bebas KERS Unlimited (>350 kW)');
      updateRegulation('refuelingPermitted', true);
      updateRegulation('aeroConcept', 'Open Aero Freedom (Inovasi Terbuka)');
      updateRegulation('aeroActiveWings', 'Active Aerodynamics Bebas (Depan & Belakang Dinamis)');
      updateRegulation('flexiWingToleranceMm', 18);
      updateRegulation('costCapModel', 'Soft Cost Cap + Luxury Tax (Fleksibel)');
      updateRegulation('budgetCapMillions', 200);
      updateRegulation('balanceOfPerformance', 'Success Ballast (+15kg per Menang)');
      updateRegulation('tireSupplierRule', 'Open Tire War (Multi-Brand Michelin vs Pirelli)');
      updateRegulation('activeSuspensionAllowed', true);
    } else if (presetName === 'fia_modern') {
      updateRegulation('engineFormula', 'Hybrid-Turbo V6 (1.6L)');
      updateRegulation('rpmLimit', '15,000 RPM (Standar Kompetisi)');
      updateRegulation('fuelFlowLimitKgH', 100);
      updateRegulation('fuelType', '100% Sustainable E-Fuel (Zero Net Fossil)');
      updateRegulation('ersHybridSystem', 'Standar 160 kW MGU-K');
      updateRegulation('refuelingPermitted', false);
      updateRegulation('aeroConcept', 'Ground Effect Venturi (Minim Dirty Air)');
      updateRegulation('aeroActiveWings', 'Hanya DRS Belakang (Gap <1.0s)');
      updateRegulation('flexiWingToleranceMm', 6);
      updateRegulation('minCarWeightKg', 798);
      updateRegulation('costCapModel', 'Hard Cost Cap (Ketat)');
      updateRegulation('budgetCapMillions', 135);
      updateRegulation('balanceOfPerformance', 'Tanpa BoP (Kebebasan Murni)');
      updateRegulation('tireSupplierRule', 'Single Supplier (Pirelli-style)');
      updateRegulation('activeSuspensionAllowed', false);
    } else if (presetName === 'classic_v10') {
      updateRegulation('engineFormula', 'Naturally Aspirated V10 (3.0L)');
      updateRegulation('rpmLimit', '18,000 RPM (Screaming High-Rev)');
      updateRegulation('fuelFlowLimitKgH', 130);
      updateRegulation('fuelType', 'Standard Racing Fuel (102 RON)');
      updateRegulation('ersHybridSystem', 'Dilarang (Pure ICE Murni)');
      updateRegulation('refuelingPermitted', true);
      updateRegulation('aeroConcept', 'Flat Bottom Klasik + High Wings');
      updateRegulation('aeroActiveWings', 'Dilarang Sayap Bergerak (Statis)');
      updateRegulation('flexiWingToleranceMm', 10);
      updateRegulation('minCarWeightKg', 690);
      updateRegulation('costCapModel', 'Open Spending (Bebas Belanja Konglomerat)');
      updateRegulation('balanceOfPerformance', 'Tanpa BoP (Kebebasan Murni)');
      updateRegulation('tireSupplierRule', 'Open Tire War (Multi-Brand Michelin vs Pirelli)');
      updateRegulation('activeSuspensionAllowed', false);
    } else if (presetName === 'sustainable') {
      updateRegulation('engineFormula', 'Hybrid-Turbo V6 (1.6L)');
      updateRegulation('fuelType', '100% Sustainable E-Fuel (Zero Net Fossil)');
      updateRegulation('ersHybridSystem', 'Bebas KERS Unlimited (>350 kW)');
      updateRegulation('refuelingPermitted', false);
      updateRegulation('costCapModel', 'Soft Cost Cap + Luxury Tax (Fleksibel)');
      updateRegulation('budgetCapMillions', 120);
      updateRegulation('tireSupplierRule', 'Single Supplier Bebas Kompon');
    }
  };

  // Kalkulasi Indeks Dampak Regulasi
  const isOpenFormula = regulations.engineFormula?.includes('Open') || regulations.engineFormula?.includes('Bebas');
  const isV10 = regulations.engineFormula?.includes('V10') || regulations.rpmLimit?.includes('18,000') || regulations.rpmLimit?.includes('Tanpa');
  const isGroundEffect = regulations.aeroConcept?.includes('Ground Effect');
  const isRefueling = regulations.refuelingPermitted;

  const fanExcitement = Math.min(99, 70 + (isV10 ? 15 : 0) + (isRefueling ? 6 : 0) + (isOpenFormula ? 8 : 0));
  const overtakePotential = isGroundEffect ? 'Sangat Tinggi (Dirty Air Minim)' : regulations.aeroActiveWings?.includes('Active') ? 'Tinggi (Active Aero)' : 'Moderat';
  const loopholeRisk = (regulations.flexiWingToleranceMm || 8) > 12 ? 'Tinggi (Banyak Celah Aero)' : (regulations.costCapModel?.includes('Luxury') ? 'Moderat' : 'Terkontrol');

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="rm-page-header">
        <div>
          <h1 className="rm-page-title">
            <Icon name="book" size={22} style={{ color: 'var(--clr-blue-primary)' }} />
            <span>BUKU KETETAPAN REGULASI DUNIA (TECHNICAL & SPORTING CODE)</span>
          </h1>
          <p className="rm-page-desc">
            Sebagai World Motorsport Commissioner, kamu memiliki wewenang penuh menetapkan arsitektur mesin, kebebasan aerodinamika, model pembatasan anggaran, dan format sportivitas liga. Aturan tidak kaku dan dapat disesuaikan secara fleksibel.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="rm-tag rm-tag-info">Ketetapan Musim {1}</span>
        </div>
      </div>

      {/* Preset Filosofi Cepat */}
      <div
        className="rm-card"
        style={{
          marginBottom: '20px',
          background: 'var(--clr-bg-card)',
          border: '1px solid var(--clr-border-subtle)',
          padding: '14px 18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icon name="sliders" size={16} style={{ color: 'var(--clr-blue-primary)' }} />
          <span style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--clr-text-primary)' }}>
            PRESET FILOSOFI REGULASI CEPAT:
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            className="rm-btn rm-btn-outline"
            style={{ fontSize: '12px', padding: '6px 12px' }}
            onClick={() => applyPreset('open_freedom')}
            title="Formula terbuka: Tim bebas membawa mesin apa saja dengan sistem Balance of Performance (BoP)"
          >
            🚀 Open Formula & Inovasi Bebas
          </button>
          <button
            className="rm-btn rm-btn-outline"
            style={{ fontSize: '12px', padding: '6px 12px' }}
            onClick={() => applyPreset('fia_modern')}
            title="Standar FIA modern: Hybrid 1.6L Turbo, Hard Cost Cap, dan pengawasan ketat"
          >
            🛡️ FIA Standar Hybrid & Cost Cap
          </button>
          <button
            className="rm-btn rm-btn-outline"
            style={{ fontSize: '12px', padding: '6px 12px' }}
            onClick={() => applyPreset('classic_v10')}
            title="Era keemasan: Suara V10 18,000 RPM, pengisian bahan bakar bebas, belanja bebas"
          >
            🔊 Era Klasik V10 Screamer
          </button>
          <button
            className="rm-btn rm-btn-outline"
            style={{ fontSize: '12px', padding: '6px 12px' }}
            onClick={() => applyPreset('sustainable')}
            title="Fokus bahan bakar sintetis ramah lingkungan E-Fuel & energi hibrida tinggi"
          >
            ⚡ E-Fuel & Eco-Tech
          </button>
        </div>
      </div>

      {/* Baris Ringkasan Dampak Regulasi */}
      <div className="rm-grid-4" style={{ marginBottom: '20px' }}>
        <div className="rm-stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--clr-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
            <Icon name="trophy" size={13} style={{ color: 'var(--clr-blue-primary)' }} />
            <span>Indeks Antusiasme Fans</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--clr-blue-primary)' }}>
            {fanExcitement}% Rating
          </div>
          <div style={{ fontSize: '11px', color: 'var(--clr-text-muted)' }}>
            {isV10 ? 'Fans tergila-gila dengan suara raungan mesin' : 'Tontonan stabil dan kompetitif'}
          </div>
        </div>

        <div className="rm-stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--clr-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
            <Icon name="car" size={13} style={{ color: '#16a34a' }} />
            <span>Peluang Aksi Menyalip</span>
          </div>
          <div style={{ fontSize: '16px', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#16a34a' }}>
            {overtakePotential}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--clr-text-muted)' }}>
            Dipengaruhi konsep ground effect & regulasi sayap
          </div>
        </div>

        <div className="rm-stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--clr-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
            <Icon name="finance" size={13} style={{ color: '#d97706' }} />
            <span>Model Batasan Finansial</span>
          </div>
          <div style={{ fontSize: '15px', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--clr-text-primary)' }}>
            {regulations.costCapModel || 'Soft Cost Cap'}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--clr-text-muted)' }}>
            Plafon: ${regulations.budgetCapMillions}M / Musim
          </div>
        </div>

        <div className="rm-stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--clr-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
            <Icon name="alert-triangle" size={13} style={{ color: loopholeRisk.includes('Tinggi') ? '#dc2626' : '#2563eb' }} />
            <span>Potensi Celah Regulasi</span>
          </div>
          <div style={{ fontSize: '16px', fontWeight: 800, fontFamily: 'var(--font-heading)', color: loopholeRisk.includes('Tinggi') ? '#dc2626' : '#2563eb' }}>
            {loopholeRisk}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--clr-text-muted)' }}>
            Toleransi kelenturan & ketegasan scrutineering
          </div>
        </div>
      </div>

      {/* Tabs Kategori Regulasi */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '2px solid var(--clr-border-subtle)',
          marginBottom: '20px',
          paddingBottom: '2px'
        }}
      >
        {[
          { id: 'powertrain', label: '1. Powertrain & Mesin', icon: 'zap' },
          { id: 'aero', label: '2. Aerodinamika & Sasis', icon: 'car' },
          { id: 'finance', label: '3. Anggaran, Cost Cap & BoP', icon: 'finance' },
          { id: 'sporting', label: '4. Format Balapan & Ban', icon: 'flag' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              border: 'none',
              background: 'transparent',
              fontFamily: 'var(--font-heading)',
              fontSize: '14px',
              fontWeight: activeTab === tab.id ? 700 : 600,
              color: activeTab === tab.id ? 'var(--clr-blue-primary)' : 'var(--clr-text-secondary)',
              borderBottom: activeTab === tab.id ? '3px solid var(--clr-blue-primary)' : '3px solid transparent',
              cursor: 'pointer',
              marginBottom: '-2px',
              transition: 'all 0.15s ease'
            }}
          >
            <Icon name={tab.icon} size={15} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── KONTEN TAB 1: POWERTRAIN & MESIN ── */}
      {activeTab === 'powertrain' && (
        <div className="rm-grid-2">
          <div className="rm-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', borderBottom: '1px solid var(--clr-border-subtle)', paddingBottom: '10px' }}>
              <Icon name="car" size={18} style={{ color: 'var(--clr-blue-primary)' }} />
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--clr-white-pure)' }}>
                ARSITEKTUR & FORMULA MESIN UTAMA
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--clr-text-secondary)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                  Formula Mesin & Derajat Kebebasan Pabrikan
                </label>
                <select
                  value={regulations.engineFormula}
                  onChange={(e) => updateRegulation('engineFormula', e.target.value)}
                  className="rm-select"
                >
                  <option value="Open Formula (BoP Equivalent)">
                    🚀 Formula Terbuka (Open BoP) — Pabrikan bebas memilih V6, V8, V10, atau Turbo dengan regulasi Balance of Performance
                  </option>
                  <option value="Hybrid-Turbo V6 (1.6L)">
                    🔋 Hybrid-Turbo V6 (1.6L) — Standar efisiensi F1 modern, sistem MGU-K ganda
                  </option>
                  <option value="Naturally Aspirated V10 (3.0L)">
                    🔊 Naturally Aspirated V10 (3.0L) — Suara klasik menggelegar, tanpa turbo, kepuasan fans +30%
                  </option>
                  <option value="Twin-Turbo V8 (4.0L)">
                    ⚡ Twin-Turbo V8 (4.0L) — Torsi brutal, kecepatan garis lurus tertinggi
                  </option>
                  <option value="Turbocharged Inline-4 (2.0L)">
                    🌱 Compact Turbo I4 (2.0L) — Mesin ringan, biaya perakitan murah untuk tim independen
                  </option>
                  <option value="Full Electric E-Drive">
                    ⚡ All-Electric Dual-Motor — Nol emisi bahan bakar, akselerasi instan
                  </option>
                </select>
                <span style={{ fontSize: '11px', color: 'var(--clr-text-muted)', marginTop: '4px', display: 'block' }}>
                  Tidak mengunci tim ke satu jenis mesin kaku bila memilih opsi Formula Terbuka (Open BoP).
                </span>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--clr-text-secondary)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                  Batas Putaran Mesin Maksimum (RPM Limit)
                </label>
                <select
                  value={regulations.rpmLimit || '15,000 RPM (Standar Kompetisi)'}
                  onChange={(e) => updateRegulation('rpmLimit', e.target.value)}
                  className="rm-select"
                >
                  <option value="12,000 RPM (Ekonomis & Tahan Banting)">12,000 RPM — Hemat bahan bakar, keausan mesin rendah, murah</option>
                  <option value="15,000 RPM (Standar Kompetisi)">15,000 RPM — Standar kejuaraan dunia modern saat ini</option>
                  <option value="18,000 RPM (Screaming High-Rev)">18,000 RPM — Raungan rpm tinggi agresif, keausan mesin meningkat</option>
                  <option value="Tanpa Batas RPM (Unlimited Free RPM)">Tanpa Batas RPM (Unlimited) — Tim bebas memeras batas metalurgi mesin</option>
                </select>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--clr-text-secondary)', fontWeight: 600 }}>
                    Batas Aliran Bahan Bakar (Fuel Flow Rate Limit):
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--clr-blue-primary)', fontFamily: 'var(--font-heading)', fontFeatureSettings: "'tnum' 1" }}>
                    {regulations.fuelFlowLimitKgH ? `${regulations.fuelFlowLimitKgH} kg/jam` : 'Bebas / Unlimited'}
                  </span>
                </div>
                <input
                  type="range"
                  min="85"
                  max="145"
                  step="5"
                  value={regulations.fuelFlowLimitKgH || 105}
                  onChange={(e) => updateRegulation('fuelFlowLimitKgH', Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--clr-blue-primary)', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--clr-text-muted)' }}>
                  <span>85 kg/h (Sangat Irit)</span>
                  <span>105 kg/h (Standar FIA)</span>
                  <span>145 kg/h (Tenaga Maksimal)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rm-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', borderBottom: '1px solid var(--clr-border-subtle)', paddingBottom: '10px' }}>
              <Icon name="zap" size={18} style={{ color: '#16a34a' }} />
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--clr-white-pure)' }}>
                BAHAN BAKAR & SISTEM HIBRIDA (ERS)
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--clr-text-secondary)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                  Standar Bahan Bakar Kejuaraan
                </label>
                <select
                  value={regulations.fuelType || '100% Sustainable E-Fuel (Zero Net Fossil)'}
                  onChange={(e) => updateRegulation('fuelType', e.target.value)}
                  className="rm-select"
                >
                  <option value="100% Sustainable E-Fuel (Zero Net Fossil)">100% Sustainable E-Fuel — Nol emisi fosil, menarik sponsor korporat global</option>
                  <option value="Standard Racing Fuel (102 RON)">Bahan Bakar Balap Standar 102 RON — Bensin murni performa tinggi</option>
                  <option value="Formula Bebas Tanpa Batas / Aditif Terbuka">Formula Kimiawi Bebas — Tim bebas meracik zat aditif oktan sendiri</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--clr-text-secondary)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                  Regulasi Sistem Pemulihan Energi (ERS / KERS)
                </label>
                <select
                  value={regulations.ersHybridSystem || 'Standar 160 kW MGU-K'}
                  onChange={(e) => updateRegulation('ersHybridSystem', e.target.value)}
                  className="rm-select"
                >
                  <option value="Dilarang (Pure ICE Murni)">Dilarang — Murni mesin pembakaran internal tanpa motor listrik</option>
                  <option value="Standar 160 kW MGU-K">Standar 160 kW (214 HP) — Bantuan dorongan motor listrik terstandarisasi</option>
                  <option value="Bebas KERS Unlimited (&gt;350 kW)">Bebas / Unlimited KERS (&gt;350 kW) — Motor listrik tenaga tinggi bebas dikembangkan</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: '1px solid var(--clr-border-subtle)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--clr-white-pure)' }}>Refueling Saat Pit Stop</div>
                  <div style={{ fontSize: '12px', color: 'var(--clr-text-muted)' }}>
                    Memperbolehkan pengisian bahan bakar saat pit stop menambah variasi strategi namun meningkatkan risiko keselamatan.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={regulations.refuelingPermitted || false}
                  onChange={(e) => updateRegulation('refuelingPermitted', e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--clr-blue-primary)', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── KONTEN TAB 2: AERODINAMIKA & SASIS ── */}
      {activeTab === 'aero' && (
        <div className="rm-grid-2">
          <div className="rm-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', borderBottom: '1px solid var(--clr-border-subtle)', paddingBottom: '10px' }}>
              <Icon name="car" size={18} style={{ color: 'var(--clr-blue-primary)' }} />
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--clr-white-pure)' }}>
                FILOSOFI AERODINAMIKA & SAYAP
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--clr-text-secondary)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                  Konsep Lantai & Venturi Tunnels
                </label>
                <select
                  value={regulations.aeroConcept}
                  onChange={(e) => updateRegulation('aeroConcept', e.target.value)}
                  className="rm-select"
                >
                  <option value="Ground Effect Venturi (Minim Dirty Air)">
                    Ground Effect Venturi — Mengisap mobil ke aspal melalui lantai, turbulensi belakang sangat minim
                  </option>
                  <option value="Flat Bottom Klasik + High Wings">
                    Flat Bottom Klasik — Mengandalkan sayap atas besar, downforce tinggi namun dirty air tebal
                  </option>
                  <option value="Open Aero Freedom (Inovasi Terbuka)">
                    Inovasi Aerodinamika Terbuka — Tim bebas mendesain diffuser bertingkat, bargeboard, dan vortex generator
                  </option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--clr-text-secondary)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                  Regulasi Aerodinamika Aktif (Active Aero)
                </label>
                <select
                  value={regulations.aeroActiveWings || 'Hanya DRS Belakang (Gap <1.0s)'}
                  onChange={(e) => updateRegulation('aeroActiveWings', e.target.value)}
                  className="rm-select"
                >
                  <option value="Dilarang Sayap Bergerak (Statis)">Dilarang — Sayap harus statis dan kaku 100% tanpa bagian bergerak</option>
                  <option value="Hanya DRS Belakang (Gap <1.0s)">DRS Terbatas — Sayap belakang hanya boleh terbuka di zona resmi jika jarak &lt;1.0s</option>
                  <option value="Active Aerodynamics Bebas (Depan & Belakang Dinamis)">
                    Active Aero Bebas — Flap sayap depan dan belakang otomatis menyesuaikan sudut saat pengereman dan trek lurus
                  </option>
                </select>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--clr-text-secondary)', fontWeight: 600 }}>
                    Toleransi Kelenturan Sayap (Flexi-Wing Elasticity):
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--clr-blue-primary)', fontFamily: 'var(--font-heading)', fontFeatureSettings: "'tnum' 1" }}>
                    Maks {regulations.flexiWingToleranceMm || 8} mm
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="25"
                  step="1"
                  value={regulations.flexiWingToleranceMm || 8}
                  onChange={(e) => updateRegulation('flexiWingToleranceMm', Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--clr-blue-primary)', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--clr-text-muted)' }}>
                  <span>2 mm (Uji Statis Ultra Ketat)</span>
                  <span>8 mm (Standar)</span>
                  <span>25 mm (Celah Aero Fleksibel Bebas)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rm-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', borderBottom: '1px solid var(--clr-border-subtle)', paddingBottom: '10px' }}>
              <Icon name="sliders" size={18} style={{ color: '#d97706' }} />
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--clr-white-pure)' }}>
                SASIS, BOBOT & ELEKTRONIK KONTROL
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--clr-text-secondary)', fontWeight: 600 }}>
                    Ambang Bobot Minimum Mobil (Termasuk Driver):
                  </span>
                  <span style={{ fontWeight: 700, color: '#d97706', fontFamily: 'var(--font-heading)', fontSize: '15px', fontFeatureSettings: "'tnum' 1" }}>
                    {regulations.minCarWeightKg} kg
                  </span>
                </div>
                <input
                  type="range"
                  min="660"
                  max="850"
                  step="2"
                  value={regulations.minCarWeightKg}
                  onChange={(e) => updateRegulation('minCarWeightKg', Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#d97706', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--clr-text-muted)' }}>
                  <span>660 kg (Lincah & Ringan)</span>
                  <span>798 kg (Standar Halo Titanium)</span>
                  <span>850 kg (Struktur Tambahan)</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: '1px solid var(--clr-border-subtle)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--clr-white-pure)' }}>Suspensi Aktif (Computerized Active Suspension)</div>
                  <div style={{ fontSize: '12px', color: 'var(--clr-text-muted)' }}>
                    Sistem hidrolik terkomputerisasi yang menjaga ground clearance mobil tetap sempurna di semua tikungan.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={regulations.activeSuspensionAllowed || false}
                  onChange={(e) => updateRegulation('activeSuspensionAllowed', e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--clr-blue-primary)', cursor: 'pointer' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: '1px solid var(--clr-border-subtle)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--clr-white-pure)' }}>Bantuan Traksi Elektronik (Traction Control)</div>
                  <div style={{ fontSize: '12px', color: 'var(--clr-text-muted)' }}>
                    Mencegah ban spin saat keluar tikungan. Mempermudah pembalap pemula namun mengurangi manuver drift terampil.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={regulations.tractionControlAllowed || false}
                  onChange={(e) => updateRegulation('tractionControlAllowed', e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--clr-blue-primary)', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── KONTEN TAB 3: ANGGARAN, COST CAP & BOP ── */}
      {activeTab === 'finance' && (
        <div className="rm-grid-2">
          <div className="rm-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', borderBottom: '1px solid var(--clr-border-subtle)', paddingBottom: '10px' }}>
              <Icon name="finance" size={18} style={{ color: 'var(--clr-blue-primary)' }} />
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--clr-white-pure)' }}>
                MODEL BATASAN ANGGARAN (COST CAP)
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--clr-text-secondary)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                  Filosofi Pembatasan Finansial Liga
                </label>
                <select
                  value={regulations.costCapModel || 'Soft Cost Cap + Luxury Tax (Fleksibel)'}
                  onChange={(e) => updateRegulation('costCapModel', e.target.value)}
                  className="rm-select"
                >
                  <option value="Hard Cost Cap (Ketat)">
                    Hard Cost Cap — Batas keras mutlak. Kelebihan belanja di atas limit berujung diskualifikasi poin
                  </option>
                  <option value="Soft Cost Cap + Luxury Tax (Fleksibel)">
                    Soft Cost Cap + Luxury Tax — Tim kaya boleh melebihi batas, namun wajib membayar pajak denda 150% yang disetor ke kas liga
                  </option>
                  <option value="Open Spending (Bebas Belanja Konglomerat)">
                    Open Spending — Bebas tanpa batasan anggaran sama sekali. Siapa yang paling kaya memenangkan riset
                  </option>
                </select>
                <span style={{ fontSize: '11px', color: 'var(--clr-text-muted)', marginTop: '4px', display: 'block' }}>
                  Model Soft Cost Cap memberi kebebasan tim berbelanja sambil memperkaya kas liga.
                </span>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--clr-text-secondary)', fontWeight: 600 }}>
                    Nominal Batas Anggaran Operasional Tim:
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--clr-blue-primary)', fontFamily: 'var(--font-heading)', fontSize: '16px', fontFeatureSettings: "'tnum' 1" }}>
                    ${regulations.budgetCapMillions} Juta / Musim
                  </span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="280"
                  step="5"
                  value={regulations.budgetCapMillions}
                  onChange={(e) => updateRegulation('budgetCapMillions', Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--clr-blue-primary)', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--clr-text-muted)' }}>
                  <span>$80M (Papan Bawah Seimbang)</span>
                  <span>$135M (Standar FIA)</span>
                  <span>$280M (Bebas Belanja Besar)</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: '1px solid var(--clr-border-subtle)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--clr-white-pure)' }}>Pengecualian Gaji Pembalap dari Cost Cap</div>
                  <div style={{ fontSize: '12px', color: 'var(--clr-text-muted)' }}>
                    Bila dicentang, gaji pembalap bintang tidak memakan jatah riset dan pengembangan sasis mobil.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={regulations.excludeDriverSalaries !== false}
                  onChange={(e) => updateRegulation('excludeDriverSalaries', e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--clr-blue-primary)', cursor: 'pointer' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: '1px solid var(--clr-border-subtle)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--clr-white-pure)' }}>Pengecualian R&D Powertrain Mesin</div>
                  <div style={{ fontSize: '12px', color: 'var(--clr-text-muted)' }}>
                    Pabrikan mesin boleh mengembangkan teknologi mesin ramah lingkungan tanpa tercekik aturan cost cap.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={regulations.excludeEngineRnD || false}
                  onChange={(e) => updateRegulation('excludeEngineRnD', e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--clr-blue-primary)', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>

          <div className="rm-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', borderBottom: '1px solid var(--clr-border-subtle)', paddingBottom: '10px' }}>
              <Icon name="shield" size={18} style={{ color: '#16a34a' }} />
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--clr-white-pure)' }}>
                PENYEIMBANG PERFORMA (BOP & SUCCESS BALLAST)
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--clr-text-secondary)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                  Kebijakan Penyetaraan Performa (Balance of Performance)
                </label>
                <select
                  value={regulations.balanceOfPerformance || 'Success Ballast (+15kg per Menang)'}
                  onChange={(e) => updateRegulation('balanceOfPerformance', e.target.value)}
                  className="rm-select"
                >
                  <option value="Tanpa BoP (Kebebasan Murni)">
                    Tanpa BoP — Murni keunggulan rekayasa. Tim terbaik berhak mendominasi tanpa hukuman penalti
                  </option>
                  <option value="Success Ballast (+15kg per Menang)">
                    Success Ballast — Tim pemenang balapan mendapat bobot pemberat +15 kg untuk menjaga persaingan tetap sengit
                  </option>
                  <option value="Equalization Power/Weight AI">
                    AI Equalization — Penyesuaian boost turbo dan bobot secara dinamis setiap 3 seri balapan
                  </option>
                </select>
                <span style={{ fontSize: '11px', color: 'var(--clr-text-muted)', marginTop: '4px', display: 'block' }}>
                  Success Ballast mencegah 1 tim memenangkan semua balapan berturut-turut tanpa perlawanan.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── KONTEN TAB 4: FORMAT SPORTIVITAS & BAN ── */}
      {activeTab === 'sporting' && (
        <div className="rm-grid-2">
          <div className="rm-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', borderBottom: '1px solid var(--clr-border-subtle)', paddingBottom: '10px' }}>
              <Icon name="flag" size={18} style={{ color: 'var(--clr-blue-primary)' }} />
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--clr-white-pure)' }}>
                REGULASI BAN & KEPATUHAN PIT STOP
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--clr-text-secondary)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                  Model Pemasok Ban Resmi
                </label>
                <select
                  value={regulations.tireSupplierRule}
                  onChange={(e) => updateRegulation('tireSupplierRule', e.target.value)}
                  className="rm-select"
                >
                  <option value="Single Supplier (Pirelli-style)">
                    Pemasok Tunggal Resmi — Ban terstandarisasi, wajib menggunakan minimal 2 jenis kompon saat balapan kering
                  </option>
                  <option value="Single Supplier Bebas Kompon">
                    Pemasok Tunggal Bebas Kompon — Tim bebas menyelesaikan balapan dengan 1 set ban tanpa paksaan pit stop
                  </option>
                  <option value="Open Tire War (Multi-Brand Michelin vs Pirelli)">
                    Perang Ban Terbuka (Tire War) — Pabrikan ban Michelin, Pirelli, Goodyear bebas bersaing performa
                  </option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--clr-text-secondary)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                  Ketegasan Razia Teknis Pengawas (Scrutineering Strictness)
                </label>
                <select
                  value={regulations.scrutineeringStrictness}
                  onChange={(e) => updateRegulation('scrutineeringStrictness', e.target.value)}
                  className="rm-select"
                >
                  <option value="Lenient">Longgar (Lenient) — Celah abu-abu ditoleransi, inovasi batas ekstrem diperbolehkan</option>
                  <option value="Balanced">Seimbang (Balanced) — Razia acak kualifikasi, denda dijatuhkan saat ada protes resmi tim lawan</option>
                  <option value="Strict">Ketat (Strict) — Uji defleksi laser dan verifikasi aliran bahan bakar digital berkala</option>
                  <option value="Zero-Tolerance">Nol Toleransi (Zero-Tolerance) — Diskualifikasi otomatis atas pelanggaran sekecil apa pun</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rm-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', borderBottom: '1px solid var(--clr-border-subtle)', paddingBottom: '10px' }}>
              <Icon name="trophy" size={18} style={{ color: '#a855f7' }} />
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--clr-white-pure)' }}>
                SISTEM POIN & FORMAT AKHIR PEKAN
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--clr-text-secondary)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                  Distribusi Poin Kejuaraan Dunia
                </label>
                <select
                  value={regulations.pointsSystem}
                  onChange={(e) => updateRegulation('pointsSystem', e.target.value)}
                  className="rm-select"
                >
                  <option value="Top 10 (25-18-15-12-10-8-6-4-2-1)">Standar FIA Modern (Top 10: 25-18-15-12-10-8-6-4-2-1)</option>
                  <option value="Klasik Top 6 (10-6-4-3-2-1)">Sistem Klasik Era Emas Top 6 (10-6-4-3-2-1)</option>
                  <option value="Americas All-Points">All-Points Grid (Setiap mobil yang finis berhak mengumpulkan poin kejuaraan)</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: '1px solid var(--clr-border-subtle)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--clr-white-pure)' }}>Sprint Race dengan Reverse Grid</div>
                  <div style={{ fontSize: '12px', color: 'var(--clr-text-muted)' }}>
                    Membalikkan posisi start top-10 pada balapan sprint hari Sabtu untuk tontonan manuver agresif.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={regulations.reverseGridSprints || false}
                  onChange={(e) => updateRegulation('reverseGridSprints', e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--clr-blue-primary)', cursor: 'pointer' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: '1px solid var(--clr-border-subtle)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--clr-white-pure)' }}>Bonus 1 Poin Fastest Lap</div>
                  <div style={{ fontSize: '12px', color: 'var(--clr-text-muted)' }}>
                    Memberikan tambahan +1 poin kejuaraan bagi pembalap yang mencetak rekor putaran tercepat di balapan.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={regulations.bonusFastestLapPoint !== false}
                  onChange={(e) => updateRegulation('bonusFastestLapPoint', e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--clr-blue-primary)', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
