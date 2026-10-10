import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRaceManagerStore } from '../../store/useRaceManagerStore.js';
import Icon from '../../components/common/Icon.jsx';

export default function CircuitsPage() {
  const navigate = useNavigate();
  const { circuits, selectedCircuitId, selectCircuit } = useRaceManagerStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState('ALL');

  const filteredCircuits = circuits.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGrade = gradeFilter === 'ALL' || c.grade.includes(gradeFilter);

    return matchesSearch && matchesGrade;
  });

  const handleSelectAndRace = (circuitId) => {
    selectCircuit(circuitId);
    navigate('/');
  };

  return (
    <div className="animate-fadeIn">
      {/* Page Header */}
      <div className="rm-page-header">
        <div>
          <h1 className="rm-page-title">
            <Icon name="globe" size={22} style={{ color: 'var(--clr-amber)' }} />
            <span>LOKASI SIRKUIT DUNIA (WORLD RACE LOCATIONS)</span>
          </h1>
          <p className="rm-page-desc">
            Pangkalan data resmi <strong>{circuits.length} sirkuit balap internasional</strong> berstandar FIA. Pilih sirkuit dan layout untuk menggelar seri kejuaraan.
          </p>
        </div>
        <div>
          <span className="rm-tag rm-tag-success">28 Sirkuit Terakreditasi</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div
        style={{
          display: 'flex',
          gap: '14px',
          alignItems: 'center',
          marginBottom: '20px',
          background: 'var(--clr-bg-card)',
          padding: '12px 16px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--clr-border-subtle)'
        }}
      >
        <div style={{ flexGrow: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
          <span style={{ position: 'absolute', left: '12px', color: 'var(--clr-text-muted)', display: 'flex', alignItems: 'center' }}>
            <Icon name="search" size={16} />
          </span>
          <input
            type="text"
            placeholder="Cari sirkuit berdasarkan nama, negara, atau kota (Monza, Spa, Silverstone, Suzuka)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rm-input"
            style={{ paddingLeft: '36px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className={`rm-btn ${gradeFilter === 'ALL' ? 'rm-btn-primary' : 'rm-btn-outline'}`}
            onClick={() => setGradeFilter('ALL')}
            style={{ padding: '7px 14px', fontSize: '13px' }}
          >
            Semua ({circuits.length})
          </button>
          <button
            className={`rm-btn ${gradeFilter === 'Grade 1' ? 'rm-btn-primary' : 'rm-btn-outline'}`}
            onClick={() => setGradeFilter('Grade 1')}
            style={{ padding: '7px 14px', fontSize: '13px' }}
          >
            FIA Grade 1
          </button>
          <button
            className={`rm-btn ${gradeFilter === 'Grade 2' ? 'rm-btn-primary' : 'rm-btn-outline'}`}
            onClick={() => setGradeFilter('Grade 2')}
            style={{ padding: '7px 14px', fontSize: '13px' }}
          >
            FIA Grade 2
          </button>
        </div>
      </div>

      {/* Circuits Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '16px'
        }}
      >
        {filteredCircuits.map((circuit) => {
          const isSelected = selectedCircuitId === circuit.id;

          return (
            <div
              key={circuit.id}
              className="rm-circuit-card"
              style={{
                borderColor: isSelected ? 'var(--clr-amber)' : 'var(--clr-border-subtle)',
                background: isSelected ? 'rgba(245, 166, 35, 0.04)' : 'var(--clr-bg-card)'
              }}
            >
              <div>
                {/* Header Card */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '20px' }}>{circuit.flag}</span>
                    <div>
                      <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--clr-white-pure)', lineHeight: '1.2' }}>
                        {circuit.name}
                      </h2>
                      <div style={{ fontSize: '11px', color: 'var(--clr-text-secondary)', marginTop: '2px' }}>
                        {circuit.location}, {circuit.country}
                      </div>
                    </div>
                  </div>
                  <span className="rm-tag rm-tag-info" style={{ fontSize: '10px' }}>
                    {circuit.grade}
                  </span>
                </div>

                {/* Specs Pill */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '6px',
                    margin: '10px 0',
                    background: 'var(--clr-bg-elevated)',
                    padding: '8px',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: 'var(--clr-text-muted)', textTransform: 'uppercase' }}>Panjang</div>
                    <div style={{ fontWeight: 700, color: 'var(--clr-amber)', fontSize: '13px', fontFeatureSettings: "'tnum' 1" }}>
                      {circuit.lengthKm} km
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: 'var(--clr-text-muted)', textTransform: 'uppercase' }}>Tikungan</div>
                    <div style={{ fontWeight: 700, color: '#38bdf8', fontSize: '13px', fontFeatureSettings: "'tnum' 1" }}>
                      {circuit.turns}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: 'var(--clr-text-muted)', textTransform: 'uppercase' }}>Layout</div>
                    <div style={{ fontWeight: 700, color: '#2ecc71', fontSize: '13px', fontFeatureSettings: "'tnum' 1" }}>
                      {circuit.layouts.length} Opsi
                    </div>
                  </div>
                </div>

                {/* Karakteristik */}
                <div style={{ fontSize: '12px', color: 'var(--clr-text-secondary)', marginBottom: '8px', lineHeight: '1.4' }}>
                  <strong style={{ color: 'var(--clr-white-pure)' }}>Karakter:</strong> {circuit.characteristics}
                </div>

                {/* Pilihan Layout */}
                <div style={{ marginTop: '8px', marginBottom: '10px' }}>
                  <div style={{ fontSize: '10px', color: 'var(--clr-text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 700 }}>
                    Layout Tersedia:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {circuit.layouts.map((l, idx) => (
                      <div
                        key={idx}
                        style={{
                          fontSize: '11px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '3px 6px',
                          background: 'rgba(255, 255, 255, 0.02)',
                          borderRadius: 'var(--radius-sm)',
                          fontFeatureSettings: "'tnum' 1"
                        }}
                      >
                        <span style={{ color: 'var(--clr-text-primary)', fontWeight: 500 }}>• {l.name}</span>
                        <span style={{ color: 'var(--clr-text-muted)' }}>{l.lengthKm} km</span>
                      </div>
                    ))}
                  </div>
                </div>

                {circuit.lapRecord && (
                  <div style={{ fontSize: '11px', color: 'var(--clr-text-muted)', marginBottom: '14px', fontFeatureSettings: "'tnum' 1" }}>
                    Rekor Lap: <span style={{ color: 'var(--clr-text-secondary)' }}>{circuit.lapRecord}</span>
                  </div>
                )}
              </div>

              {/* Tombol Pilih */}
              <div>
                <button
                  className={`rm-btn ${isSelected ? 'rm-btn-primary' : 'rm-btn-outline'}`}
                  onClick={() => handleSelectAndRace(circuit.id)}
                  style={{ width: '100%', padding: '8px' }}
                >
                  {isSelected ? (
                    <>
                      <Icon name="check" size={14} />
                      <span>Sirkuit Terpilih (Ke Race Control)</span>
                    </>
                  ) : (
                    <span>Pilih Sebagai Tuan Rumah GP</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
