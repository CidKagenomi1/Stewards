import React from 'react';
import { useRaceManagerStore } from '../../store/useRaceManagerStore.js';
import Icon from '../../components/common/Icon.jsx';

export default function FinancePage() {
  const { funds, finances, teams } = useRaceManagerStore();

  const totalWeeklyRevenue = finances.tvBroadcastDeal +
                             finances.titleSponsorDeal +
                             finances.hostSanctionFees +
                             (teams.filter(t => t.licenseActive).length * 300_000);

  const totalWeeklyExpenses = finances.stewardsOperatingCost + finances.safetyAndLogistics;
  const netWeekly = totalWeeklyRevenue - totalWeeklyExpenses;

  const fmt = (num) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="rm-page-header">
        <div>
          <h1 className="rm-page-title">
            <Icon name="finance" size={22} style={{ color: 'var(--clr-amber)' }} />
            <span>KEUANGAN & ARUS PENDAPATAN ASOSIASI</span>
          </h1>
          <p className="rm-page-desc">
            Pengelolaan arus kas kejuaraan: hak siar global, sponsor utama seri, biaya izin sirkuit (*sanctioning fees*), dan biaya operasional tim pengawas.
          </p>
        </div>
        <div>
          <span className="rm-tag rm-tag-success" style={{ fontFeatureSettings: "'tnum' 1" }}>
            Kas Likuid: {fmt(funds)}
          </span>
        </div>
      </div>

      {/* Ringkasan Arus Kas */}
      <div className="rm-grid-3" style={{ marginBottom: '20px' }}>
        <div className="rm-stat-card">
          <div className="rm-stat-chip-label">Pemasukan Mingguan (Inflow)</div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#2ecc71', fontFamily: 'var(--font-heading)', fontFeatureSettings: "'tnum' 1" }}>
            +{fmt(totalWeeklyRevenue)}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--clr-text-secondary)' }}>
            Hak Siar, Sponsor & Biaya Izin
          </div>
        </div>

        <div className="rm-stat-card">
          <div className="rm-stat-chip-label">Beban Operasional (Outflow)</div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#ef4444', fontFamily: 'var(--font-heading)', fontFeatureSettings: "'tnum' 1" }}>
            -{fmt(totalWeeklyExpenses)}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--clr-text-secondary)' }}>
            Inspeksi Stewards & Safety Car
          </div>
        </div>

        <div className="rm-stat-card">
          <div className="rm-stat-chip-label">Laba Bersih Mingguan (Net Margin)</div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: netWeekly >= 0 ? 'var(--clr-amber)' : '#ef4444', fontFamily: 'var(--font-heading)', fontFeatureSettings: "'tnum' 1" }}>
            {netWeekly >= 0 ? '+' : ''}{fmt(netWeekly)}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--clr-text-secondary)' }}>
            Margin bersih per putaran kalender
          </div>
        </div>
      </div>

      <div className="rm-grid-2">
        {/* Kolom 1: Sumber Pendapatan */}
        <div className="rm-card">
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px', color: 'var(--clr-white-pure)' }}>
            SALURAN PENDAPATAN RESMI ASOSIASI
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--clr-bg-elevated)', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--clr-white-pure)' }}>Hak Siar TV & Streaming Global</div>
                <div style={{ fontSize: '11px', color: 'var(--clr-text-muted)' }}>Distribusi siaran internasional di 140+ negara</div>
              </div>
              <div style={{ fontWeight: 700, color: '#2ecc71', fontFamily: 'var(--font-heading)', fontSize: '15px', fontFeatureSettings: "'tnum' 1" }}>
                +{fmt(finances.tvBroadcastDeal)}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--clr-bg-elevated)', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--clr-white-pure)' }}>Sponsor Utama Seri (Title Sponsor)</div>
                <div style={{ fontSize: '11px', color: 'var(--clr-text-muted)' }}>Hak penamaan resmi kejuaraan dunia</div>
              </div>
              <div style={{ fontWeight: 700, color: '#2ecc71', fontFamily: 'var(--font-heading)', fontSize: '15px', fontFeatureSettings: "'tnum' 1" }}>
                +{fmt(finances.titleSponsorDeal)}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--clr-bg-elevated)', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--clr-white-pure)' }}>Biaya Izin Tuan Rumah (Sanctioning Fees)</div>
                <div style={{ fontSize: '11px', color: 'var(--clr-text-muted)' }}>Hak penyelenggaraan resmi Grand Prix</div>
              </div>
              <div style={{ fontWeight: 700, color: '#2ecc71', fontFamily: 'var(--font-heading)', fontSize: '15px', fontFeatureSettings: "'tnum' 1" }}>
                +{fmt(finances.hostSanctionFees)}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--clr-bg-elevated)', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--clr-white-pure)' }}>Iuran Lisensi Waralaba Tim</div>
                <div style={{ fontSize: '11px', color: 'var(--clr-text-muted)' }}>${(300_000).toLocaleString()} per tim aktif di grid</div>
              </div>
              <div style={{ fontWeight: 700, color: '#2ecc71', fontFamily: 'var(--font-heading)', fontSize: '15px', fontFeatureSettings: "'tnum' 1" }}>
                +{fmt(teams.filter(t => t.licenseActive).length * 300_000)}
              </div>
            </div>
          </div>
        </div>

        {/* Kolom 2: Buku Kas / Catatan Mutasi */}
        <div className="rm-card">
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px', color: 'var(--clr-white-pure)' }}>
            BUKU BESAR TRANSAKSI (AUDIT LEDGER)
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto' }}>
            {finances.recentTransactions.map(tx => (
              <div key={tx.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '9px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--clr-border-subtle)',
                background: 'var(--clr-bg-elevated)'
              }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--clr-white-pure)' }}>{tx.label}</div>
                  <div style={{ fontSize: '10px', color: 'var(--clr-text-muted)' }}>Pekan {tx.week}</div>
                </div>

                <div style={{
                  fontWeight: 700,
                  fontFamily: 'var(--font-heading)',
                  fontSize: '14px',
                  color: tx.type === 'income' ? '#2ecc71' : '#ef4444',
                  fontFeatureSettings: "'tnum' 1"
                }}>
                  {tx.type === 'income' ? '+' : '-'}{fmt(tx.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
