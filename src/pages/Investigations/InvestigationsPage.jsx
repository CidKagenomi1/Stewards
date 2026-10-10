import React, { useState } from 'react';
import { useRaceManagerStore } from '../../store/useRaceManagerStore.js';
import Icon from '../../components/common/Icon.jsx';

export default function InvestigationsPage() {
  const { issues, resolveIssue } = useRaceManagerStore();
  const [selectedIssueId, setSelectedIssueId] = useState(issues[0]?.id);

  const selectedIssue = issues.find(i => i.id === selectedIssueId) || issues[0];

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="rm-page-header">
        <div>
          <h1 className="rm-page-title">
            <Icon name="scrutineering" size={22} style={{ color: 'var(--clr-amber)' }} />
            <span>SIDANG SCRUTINEERING & PENUTUPAN CELAH REGULASI</span>
          </h1>
          <p className="rm-page-desc">
            Pemeriksaan laporan intelijen pengawas teknis, celah aerodinamika abu-abu, dugaan pelanggaran regulasi, dan penetapan sanksi denda.
          </p>
        </div>
        <div>
          <span className="rm-tag rm-tag-danger">
            {issues.filter(i => i.status === 'investigating').length} Kasus Aktif
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.2fr', gap: '20px' }}>
        {/* Kolom Kiri: Daftar Kasus */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {issues.map((issue) => {
            const isSelected = selectedIssue?.id === issue.id;
            const isPending = issue.status === 'investigating';

            return (
              <div
                key={issue.id}
                onClick={() => setSelectedIssueId(issue.id)}
                className="rm-card"
                style={{
                  cursor: 'pointer',
                  borderColor: isSelected ? 'var(--clr-amber)' : 'var(--clr-border-subtle)',
                  background: isSelected ? 'rgba(239, 68, 68, 0.04)' : 'var(--clr-bg-card)',
                  padding: '14px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className={`rm-tag ${issue.severity === 'Critical' ? 'rm-tag-danger' : 'rm-tag-warning'}`}>
                    {issue.severity} • {issue.category}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--clr-text-muted)' }}>Pekan {issue.discoveredWeek}</span>
                </div>

                <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--clr-white-pure)' }}>
                  {issue.title}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                  <span style={{ color: 'var(--clr-text-secondary)' }}>Terduga: <strong style={{ color: 'var(--clr-text-primary)' }}>{issue.teamName}</strong></span>
                  {isPending ? (
                    <span style={{ color: '#ef4444', fontWeight: 700, fontSize: '11px' }}>Menunggu Putusan</span>
                  ) : (
                    <span style={{ color: '#2ecc71', fontWeight: 600, fontSize: '11px' }}>Kasus Ditutup</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Kolom Kanan: Detail Berkas & Tombol Keputusan */}
        {selectedIssue && (
          <div className="rm-card" style={{ position: 'sticky', top: '88px', height: 'fit-content' }}>
            <div style={{ borderBottom: '1px solid var(--clr-border-subtle)', paddingBottom: '14px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="rm-tag rm-tag-danger">{selectedIssue.category}</span>
                <span style={{ fontSize: '11px', color: 'var(--clr-text-muted)' }}>
                  Status: {selectedIssue.status === 'investigating' ? 'Sedang Diinvestigasi' : 'Sudah Divonis'}
                </span>
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--clr-white-pure)' }}>{selectedIssue.title}</h2>
              <div style={{ fontSize: '12px', color: 'var(--clr-amber)', marginTop: '2px' }}>
                Subjek: Tim {selectedIssue.teamName}
              </div>
            </div>

            {/* Deskripsi Laporan Inspektur */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', color: 'var(--clr-text-muted)', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 700 }}>
                Laporan Teknis Pengawas (FIA Technical Report):
              </div>
              <div style={{
                background: 'var(--clr-bg-elevated)',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                lineHeight: '1.5',
                color: 'var(--clr-text-secondary)',
                borderLeft: '2px solid #ef4444'
              }}>
                {selectedIssue.description}
              </div>
            </div>

            {/* Putusan */}
            {selectedIssue.status !== 'investigating' ? (
              <div style={{
                background: 'rgba(46, 204, 113, 0.08)',
                border: '1px solid rgba(46, 204, 113, 0.25)',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                color: '#2ecc71',
                fontSize: '12px'
              }}>
                <div style={{ fontWeight: 700, marginBottom: '2px' }}>Putusan Resmi Diberlakukan:</div>
                <div>{selectedIssue.resolvedNotes}</div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '11px', color: 'var(--clr-text-muted)', textTransform: 'uppercase', marginBottom: '10px', fontWeight: 700 }}>
                  Pilih Tindakan Komisioner Balap:
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    className="rm-btn rm-btn-outline"
                    onClick={() => resolveIssue(selectedIssue.id, 'close_loophole')}
                    style={{ textAlign: 'left', padding: '10px 12px', justifyContent: 'flex-start' }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--clr-amber)', fontSize: '13px' }}>
                        1. Tutup Celah Regulasi (Technical Directive)
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--clr-text-secondary)', marginTop: '2px' }}>
                        Tutup celah abu-abu. Reputasi liga naik (+4), tim diwajibkan memodifikasi part tanpa denda.
                      </div>
                    </div>
                  </button>

                  <button
                    className="rm-btn rm-btn-danger"
                    onClick={() => resolveIssue(selectedIssue.id, 'fine_and_penalty')}
                    style={{ textAlign: 'left', padding: '10px 12px', justifyContent: 'flex-start' }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: '#dc2626', fontSize: '13px' }}>
                        2. Denda Finansial (+${(selectedIssue.fineAmount / 1_000_000).toFixed(1)}M ke Kas Liga)
                      </div>
                      <div style={{ fontSize: '11px', color: '#b91c1c', marginTop: '2px' }}>
                        Jatuhkan sanksi denda finansial berat yang disetor ke kas liga. Integritas liga naik signifikan (+7).
                      </div>
                    </div>
                  </button>

                  <button
                    className="rm-btn rm-btn-ghost"
                    onClick={() => resolveIssue(selectedIssue.id, 'ignore_drama')}
                    style={{ textAlign: 'left', padding: '8px 12px', justifyContent: 'flex-start' }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--clr-text-secondary)', fontSize: '13px' }}>
                        3. Tolak Protes & Biarkan Rivalitas Memanas
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--clr-text-muted)', marginTop: '2px' }}>
                        Tingkatkan tensi drama paddock di media sosial. Integritas sedikit berkurang (-5).
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
