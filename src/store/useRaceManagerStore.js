import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import worldCircuitsData from '../data/worldCircuits.json';

const INITIAL_TEAMS = [
  {
    id: 'team_apex',
    name: 'Apex Grand Prix',
    country: 'United Kingdom',
    color: '#F5A623',
    valuation: 320_000_000,
    budget: 140_000_000,
    performance: { engine: 94, aero: 92, reliability: 88, chassis: 90 },
    drivers: [
      { id: 'd1', name: 'Lucas Vance', nationality: 'GB', skill: 93, salary: 22_000_000 },
      { id: 'd2', name: 'Nico Lindqvist', nationality: 'SE', skill: 86, salary: 12_000_000 }
    ],
    complianceRating: 88,
    activeLoopholes: ['Flexi-Wings (Rear Wing Aero Flex)'],
    owner: 'Vance Racing Holdings',
    isOwnedByPlayer: false,
    forSale: true,
    askingPrice: 340_000_000,
    licenseActive: true
  },
  {
    id: 'team_scuderia',
    name: 'Scuderia Veloce',
    country: 'Italy',
    color: '#EF4444',
    valuation: 380_000_000,
    budget: 145_000_000,
    performance: { engine: 96, aero: 89, reliability: 84, chassis: 91 },
    drivers: [
      { id: 'd3', name: 'Matteo Rossi', nationality: 'IT', skill: 95, salary: 28_000_000 },
      { id: 'd4', name: 'Carlos Morales', nationality: 'ES', skill: 89, salary: 16_000_000 }
    ],
    complianceRating: 82,
    activeLoopholes: ['Fuel-Flow Sensor Trick'],
    owner: 'Veloce Automobili SpA',
    isOwnedByPlayer: false,
    forSale: false,
    askingPrice: 420_000_000,
    licenseActive: true
  },
  {
    id: 'team_silver',
    name: 'Silver Arrows Motorsport',
    country: 'Germany',
    color: '#38BDF8',
    valuation: 360_000_000,
    budget: 138_000_000,
    performance: { engine: 91, aero: 95, reliability: 93, chassis: 92 },
    drivers: [
      { id: 'd5', name: 'Erik Schmidt', nationality: 'DE', skill: 91, salary: 20_000_000 },
      { id: 'd6', name: 'Alexander Cole', nationality: 'GB', skill: 88, salary: 14_000_000 }
    ],
    complianceRating: 94,
    activeLoopholes: [],
    owner: 'Stuttgart Dynamics Corp',
    isOwnedByPlayer: false,
    forSale: false,
    askingPrice: 390_000_000,
    licenseActive: true
  },
  {
    id: 'team_nordic',
    name: 'Nordic Racing Group',
    country: 'Finland',
    color: '#10B981',
    valuation: 140_000_000,
    budget: 85_000_000,
    performance: { engine: 84, aero: 82, reliability: 90, chassis: 83 },
    drivers: [
      { id: 'd7', name: 'Mikael Hakka', nationality: 'FI', skill: 85, salary: 8_000_000 },
      { id: 'd8', name: 'Jonas Dahl', nationality: 'NO', skill: 80, salary: 4_500_000 }
    ],
    complianceRating: 98,
    activeLoopholes: [],
    owner: 'Nordic Private Equity',
    isOwnedByPlayer: false,
    forSale: true,
    askingPrice: 145_000_000,
    licenseActive: true
  },
  {
    id: 'team_trident',
    name: 'Trident GP Engineering',
    country: 'United States',
    color: '#8B5CF6',
    valuation: 110_000_000,
    budget: 70_000_000,
    performance: { engine: 80, aero: 81, reliability: 79, chassis: 80 },
    drivers: [
      { id: 'd9', name: 'Chase Hunter', nationality: 'US', skill: 82, salary: 5_000_000 },
      { id: 'd10', name: 'Tatsuya Sato', nationality: 'JP', skill: 79, salary: 3_800_000 }
    ],
    complianceRating: 90,
    activeLoopholes: ['Brake Duct Air Bypass'],
    owner: 'Lone Star Sports Venture',
    isOwnedByPlayer: false,
    forSale: true,
    askingPrice: 115_000_000,
    licenseActive: true
  },
  {
    id: 'team_solaris',
    name: 'Solaris E-Tech Racing',
    country: 'France',
    color: '#EC4899',
    valuation: 95_000_000,
    budget: 62_000_000,
    performance: { engine: 78, aero: 79, reliability: 82, chassis: 77 },
    drivers: [
      { id: 'd11', name: 'Julien Laurent', nationality: 'FR', skill: 81, salary: 4_200_000 },
      { id: 'd12', name: 'Liam Davies', nationality: 'AU', skill: 77, salary: 3_000_000 }
    ],
    complianceRating: 96,
    activeLoopholes: [],
    owner: 'Independent Motorsports Ltd',
    isOwnedByPlayer: false,
    forSale: true,
    askingPrice: 90_000_000,
    licenseActive: true
  }
];

const INITIAL_ISSUES = [
  {
    id: 'issue_flexi_wing',
    teamId: 'team_apex',
    teamName: 'Apex Grand Prix',
    title: 'Sayap Belakang Fleksibel (Aero Loophole)',
    category: 'Celah Regulasi Teknis',
    severity: 'High',
    discoveredWeek: 1,
    description: 'Inspektor FIA menemukan sayap belakang Apex GP melentur lebih dari 15mm saat kecepatan >280 km/h, memberikan keuntungan top speed ilegal tanpa terdeteksi uji statis beban reguler.',
    status: 'investigating',
    fineAmount: 8_000_000,
    reputationImpact: 5,
    resolvedNotes: ''
  },
  {
    id: 'issue_fuel_trick',
    teamId: 'team_scuderia',
    teamName: 'Scuderia Veloce',
    title: 'Dugaan Manipulasi Sensor Aliran Bahan Bakar',
    category: 'Kecurangan Teknis / Cheating',
    severity: 'Critical',
    discoveredWeek: 2,
    description: 'Sinyal sensor laju aliran bahan bakar Scuderia Veloce sinkron secara mencurigakan dengan frekuensi getaran mesin untuk menyuntikkan ekstra 3% bahan bakar di luar pemantauan sensor resmi.',
    status: 'investigating',
    fineAmount: 15_000_000,
    reputationImpact: 8,
    resolvedNotes: ''
  },
  {
    id: 'issue_budget_cap',
    teamId: 'team_trident',
    teamName: 'Trident GP Engineering',
    title: 'Potensi Pelanggaran Ambang Batas Budget Cap',
    category: 'Finansial & Lisensi',
    severity: 'Medium',
    discoveredWeek: 3,
    description: 'Audit independen menemukan Trident GP menyembunyikan biaya katering dan gaji insinyur senior ke anak perusahaan non-balap guna menghindari batasan anggaran musim ini.',
    status: 'investigating',
    fineAmount: 4_000_000,
    reputationImpact: 3,
    resolvedNotes: ''
  }
];

const calcLapDuration = (flagStatus) => {
  // Variasi durasi lap normal di atas 1 menit: 68 - 84 detik
  const base = 70 + Math.floor(Math.random() * 15) - 2; // 68 s/d 83 detik
  if (flagStatus === 'Red Flag') {
    return base;
  }
  if (flagStatus === 'Safety Car') {
    // Jauh lebih pelan saat Safety Car (konvoi): ~122 - 150 detik (>2 menit)
    return Math.round(base * 1.8);
  }
  if (flagStatus === 'Virtual Safety Car') {
    // Lebih pelan saat Virtual Safety Car (delta speed): ~96 - 118 detik (>1.5 menit)
    return Math.round(base * 1.42);
  }
  if (typeof flagStatus === 'string' && flagStatus.startsWith('Double Yellow')) {
    // Bahaya besar di sektor lintasan: melambat signifikan (+32% waktu lap)
    return Math.round(base * 1.32);
  }
  if (typeof flagStatus === 'string' && flagStatus.startsWith('Yellow Flag')) {
    // Single Yellow di sektor tertentu: sedikit melambat (+18% waktu lap)
    return Math.round(base * 1.18);
  }
  return base;
};

export const useRaceManagerStore = create(
  persist(
    (set, get) => ({
      // ── League & Commissioner Overview ──
      leagueName: 'Apex World Championship',
      commissionerName: 'Commissioner Alif',
      funds: 125_000_000,
      reputation: 82,
      fans: 2_450_000,
      season: 1,
      racesCompleted: 0,

      // ── Selected Circuit & Setup Balapan ──
      circuits: worldCircuitsData,
      selectedCircuitId: 'monza',
      raceSetup: {
        circuitId: 'monza',
        layoutName: 'Grand Prix Circuit (Full)',
        weather: 'Dry',
        totalLaps: 15,
        sprintRace: false
      },

      // ── Live Race Control Simulation State ──
      liveRace: {
        isRacing: false,
        isFinished: false,
        isPaused: false,
        simSpeed: 1, // 1x, 2x, 4x
        lap: 0,
        totalLaps: 15,
        lapDuration: 74, // Durasi lap dinamis > 1 menit (detik)
        lapElapsed: 0,   // Detik berjalan di lap ini
        safetyCar: 'Green Flag', // 'Green Flag', 'Virtual Safety Car', 'Safety Car', 'Red Flag'
        weather: 'Dry',
        circuit: null,
        drivers: [],
        incidentsQueue: [],
        incidentHistory: [],
        podium: null,
        financialReward: 0
      },

      // ── League Financials ──
      finances: {
        tvBroadcastDeal: 8_500_000,
        titleSponsorDeal: 4_200_000,
        hostSanctionFees: 3_000_000,
        teamFranchiseTax: 1_800_000,
        stewardsOperatingCost: 3_500_000,
        safetyAndLogistics: 2_100_000,
        recentTransactions: [
          { id: 'tx_init', label: 'Injeksi Modal Pembentukan Asosiasi', amount: 125_000_000, type: 'income', week: 1 }
        ]
      },

      // ── Regulations (Detail & Fleksibel: Tidak Kaku) ──
      regulations: {
        // Powertrain & Energy Architecture
        engineFormula: 'Open Formula (BoP Equivalent)', // 'Open Formula (BoP Equivalent)', 'Hybrid-Turbo V6 (1.6L)', 'Naturally Aspirated V10 (3.0L)', 'Twin-Turbo V8 (4.0L)', 'Full Electric E-Drive'
        rpmLimit: '15,000 RPM (Standar Kompetisi)', // '12,000 RPM (Ekonomis & Tahan Banting)', '15,000 RPM (Standar Kompetisi)', '18,000 RPM (Screaming High-Rev)', 'Tanpa Batas RPM (Unlimited Free RPM)'
        fuelFlowLimitKgH: 105, // 90 s/d 140 kg/h, 0 = Unlimited
        fuelType: '100% Sustainable E-Fuel (Zero Net Fossil)', // '100% Sustainable E-Fuel', 'Standard Racing Fuel (102 RON)', 'Formula Bebas Tanpa Batas / Aditif Terbuka'
        ersHybridSystem: 'Standar 160 kW MGU-K', // 'Dilarang (Pure ICE Murni)', 'Standar 160 kW MGU-K', 'Bebas KERS Unlimited (>350 kW)'
        refuelingPermitted: false,

        // Aero, Chassis & Innovation Freedom
        aeroConcept: 'Ground Effect Venturi (Minim Dirty Air)', // 'Ground Effect Venturi', 'Flat Bottom Klasik + High Wings', 'Open Aero Freedom (Inovasi Terbuka)'
        aeroActiveWings: 'Hanya DRS Belakang (Gap <1.0s)', // 'Dilarang Sayap Bergerak (Statis)', 'Hanya DRS Belakang (Gap <1.0s)', 'Active Aerodynamics Bebas (Depan & Belakang Dinamis)'
        flexiWingToleranceMm: 8, // 2 s/d 25 mm
        minCarWeightKg: 798, // 680 s/d 850 kg
        activeSuspensionAllowed: false,
        tractionControlAllowed: false,

        // Cost Cap & Financial Equalization
        costCapModel: 'Soft Cost Cap + Luxury Tax (Fleksibel)', // 'Hard Cost Cap (Ketat)', 'Soft Cost Cap + Luxury Tax (Fleksibel)', 'Open Spending (Bebas Belanja Konglomerat)'
        budgetCapMillions: 135,
        excludeDriverSalaries: true,
        excludeEngineRnD: false,
        balanceOfPerformance: 'Success Ballast (+15kg per Menang)', // 'Tanpa BoP (Kebebasan Murni)', 'Success Ballast (+15kg per Menang)', 'Equalization Power/Weight AI'

        // Sporting & Race Format
        tireSupplierRule: 'Single Supplier (Pirelli-style)', // 'Single Supplier (Pirelli-style)', 'Single Supplier Bebas Kompon', 'Open Tire War (Multi-Brand Michelin vs Pirelli)'
        reverseGridSprints: false,
        pointsSystem: 'Top 10 (25-18-15-12-10-8-6-4-2-1)', // 'Top 10 FIA Standar', 'Klasik Top 6 (10-6-4-3-2-1)', 'Americas All-Points'
        bonusFastestLapPoint: true,
        scrutineeringStrictness: 'Strict'
      },

      // ── Standar Karakteristik ──
      characteristics: {
        carDisparity: 'Medium',
        safetyStandard: 'FIA Grade 1 Halo & Titanium Cell',
        driverSuperlicenseThreshold: 40,
        minDriverAge: 18,
        driverAggressionPenalty: 'Standard Stewards Hearing'
      },

      // ── Grid Tim & Isu ──
      teams: INITIAL_TEAMS,
      issues: INITIAL_ISSUES,
      newsFeed: [
        {
          id: 'news_1',
          week: 1,
          headline: 'Penyelenggara Tetapkan Monza Sebagai Seri Pembuka Kejuaraan Dunia',
          category: 'Official',
          content: 'Race Control HQ bersiap menyambut seri Grand Prix di Autodromo Nazionale Monza.'
        }
      ],

      // ── ACTIONS ──

      // 1. Setup Balapan & Pemilihan Sirkuit
      setRaceSetup: (patch) => {
        set((state) => ({
          raceSetup: { ...state.raceSetup, ...patch }
        }));
      },

      selectCircuit: (circuitId) => {
        const c = get().circuits.find(item => item.id === circuitId);
        if (!c) return;
        set((state) => ({
          selectedCircuitId: circuitId,
          raceSetup: {
            ...state.raceSetup,
            circuitId: circuitId,
            layoutName: c.layouts[0]?.name || 'Grand Prix Circuit',
            totalLaps: Math.min(25, c.layouts[0]?.laps ? Math.round(c.layouts[0].laps * 0.4) : 15)
          }
        }));
      },

      // 2. Memulai Balapan Live (Masuk ke Tampilan Race)
      startGrandPrix: () => {
        const state = get();
        const circuit = state.circuits.find(c => c.id === state.raceSetup.circuitId) || state.circuits[0];

        // Buat grid start dari tim-tim aktif
        const activeTeams = state.teams.filter(t => t.licenseActive);
        let startingDrivers = [];

        activeTeams.forEach(team => {
          team.drivers.forEach(driver => {
            const carScore = (team.performance.engine + team.performance.aero + team.performance.chassis) / 3;
            const pace = driver.skill * 0.55 + carScore * 0.45 + (Math.random() * 4 - 2);
            startingDrivers.push({
              id: driver.id,
              name: driver.name,
              nationality: driver.nationality,
              skill: driver.skill,
              teamId: team.id,
              teamName: team.name,
              teamColor: team.color,
              carScore,
              pace,
              gap: 0,
              gapToLeader: 0,
              intervalSeconds: 0,
              tyre: state.raceSetup.weather === 'Wet' ? 'Wet' : (Math.random() > 0.4 ? 'Medium' : 'Soft'),
              tyreWear: 100, // %
              trackLimitStrikes: 0,
              penaltySeconds: 0,
              dnf: false,
              dnfReason: ''
            });
          });
        });

        // Urutkan berdasarkan pace awal (Kualifikasi)
        startingDrivers.sort((a, b) => b.pace - a.pace);
        startingDrivers = startingDrivers.map((d, index) => ({
          ...d,
          position: index + 1,
          gapToLeader: index * 0.85,
          intervalSeconds: index === 0 ? 0 : 0.85
        }));

        const initialLapDuration = calcLapDuration('Green Flag');

        set({
          liveRace: {
            isRacing: true,
            isFinished: false,
            isPaused: false,
            simSpeed: 1,
            lap: 1,
            totalLaps: state.raceSetup.totalLaps,
            lapDuration: initialLapDuration,
            lapElapsed: 0,
            safetyCar: 'Green Flag',
            weather: state.raceSetup.weather,
            circuit: circuit,
            drivers: startingDrivers,
            incidentsQueue: [],
            incidentHistory: [],
            podium: null,
            financialReward: 0
          }
        });
      },

      // 3. Simulasi 1 Lap Balapan Live
      tickLiveRace: () => {
        const state = get();
        const { liveRace } = state;
        if (!liveRace.isRacing || liveRace.isFinished || liveRace.isPaused) return;

        const nextLap = liveRace.lap + 1;

        // Simulasi pergerakan posisi pembalap & keausan ban
        let updatedDrivers = liveRace.drivers.map(d => {
          if (d.dnf) return d;

          // Pengaruh Safety Car
          const scSlowdown = liveRace.safetyCar === 'Safety Car' ? 0.3 : liveRace.safetyCar === 'Virtual Safety Car' ? 0.6 : 1.0;
          const wearRate = (d.tyre === 'Soft' ? 4.5 : d.tyre === 'Medium' ? 3.0 : 2.0) * scSlowdown;
          const newWear = Math.max(15, d.tyreWear - wearRate);

          // Fluktuasi performa lap
          const lapPerformance = (d.pace * 0.7 + (newWear / 100) * 30 + (Math.random() * 8 - 4)) * scSlowdown;

          return {
            ...d,
            tyreWear: Math.round(newWear),
            lapScore: lapPerformance
          };
        });

        // Hitung ulang posisi balap (hanya yang tidak DNF)
        const runningDrivers = updatedDrivers.filter(d => !d.dnf).sort((a, b) => b.lapScore - a.lapScore);
        const dnfDrivers = updatedDrivers.filter(d => d.dnf);

        let runningWithPos = runningDrivers.map((d, idx) => ({
          ...d,
          position: idx + 1,
          gapToLeader: Number((idx * (liveRace.safetyCar === 'Safety Car' ? 0.5 : 1.4) + (d.penaltySeconds || 0)).toFixed(1)),
          intervalSeconds: idx === 0 ? 0 : Number((1.2 + Math.random() * 0.8).toFixed(1))
        }));

        updatedDrivers = [...runningWithPos, ...dnfDrivers];

        // ── Pemicu Insiden Balapan Berdasarkan Probabilitas ──
        let newIncidents = [...liveRace.incidentsQueue];
        if (newIncidents.length === 0 && Math.random() < 0.35 && liveRace.safetyCar === 'Green Flag' && nextLap < liveRace.totalLaps) {
          // Pilih pembalap acak
          const activeOnes = updatedDrivers.filter(d => !d.dnf);
          if (activeOnes.length >= 4) {
            const idx1 = Math.floor(Math.random() * (activeOnes.length - 2)) + 1;
            const d1 = activeOnes[idx1];
            const d2 = activeOnes[idx1 + 1] || activeOnes[0];

            const incidentTypes = [
              {
                type: 'collision',
                title: `Benturan Overtake di Tikungan: ${d1.name} vs ${d2.name}`,
                severity: 'High',
                desc: `${d1.name} (${d1.teamName}) mencoba manuver agresif di sisi dalam dan bersenggolan dengan ${d2.name} (${d2.teamName}). Puing sayap depan berserakan di lintasan.`,
                involved: [d1.name, d2.name],
                driver1Id: d1.id,
                driver2Id: d2.id,
                suggestedSC: 'Virtual Safety Car'
              },
              {
                type: 'track_limits',
                title: `Pelanggaran Batas Lintasan Berulang: ${d1.name}`,
                severity: 'Medium',
                desc: `Pengawas sensor melaporkan ${d1.name} melanggar track limits 3 kali berturut-turut di chicane keluar tikungan untuk memangkas waktu delta.`,
                involved: [d1.name],
                driver1Id: d1.id,
                suggestedSC: 'Green Flag'
              },
              {
                type: 'unsafe_release',
                title: `Dugaan Unsafe Release di Pit-Lane: ${d1.teamName}`,
                severity: 'High',
                desc: `Kru pit ${d1.teamName} melepaskan ${d1.name} tepat di jalur ${d2.name} yang sedang melaju, memaksa ${d2.name} menginjak rem darurat di fast-lane pit.`,
                involved: [d1.name, d2.name],
                driver1Id: d1.id,
                teamId: d1.teamId,
                suggestedSC: 'Green Flag'
              }
            ];

            const chosen = incidentTypes[Math.floor(Math.random() * incidentTypes.length)];
            newIncidents.push({
              id: 'inc_' + Date.now(),
              lap: nextLap,
              ...chosen,
              status: 'pending'
            });
          }
        }

        // Cek apakah balapan selesai
        if (nextLap >= liveRace.totalLaps) {
          // Race Finish
          const podium = updatedDrivers.filter(d => !d.dnf).slice(0, 3);
          const sanctionFee = 4_500_000;
          const ticketGate = 2_800_000;
          const tvBonus = 3_200_000;
          const totalReward = sanctionFee + ticketGate + tvBonus;

          const finishTx = {
            id: 'tx_race_' + Date.now(),
            label: `Hadiah Penyelenggaraan GP ${liveRace.circuit?.name} (Izin Sirkuit & Tiket)`,
            amount: totalReward,
            type: 'income',
            week: state.racesCompleted + 1
          };

          const news = {
            id: 'news_gp_' + Date.now(),
            week: state.racesCompleted + 1,
            headline: `BENDERA FINIS DI ${liveRace.circuit?.name.toUpperCase()}: ${podium[0]?.name} KELUAR SEBAGAI JUARA!`,
            category: 'Grand Prix Result',
            content: `Podium Grand Prix: P1 ${podium[0]?.name} (${podium[0]?.teamName}), P2 ${podium[1]?.name} (${podium[1]?.teamName}), P3 ${podium[2]?.name} (${podium[2]?.teamName}). Balapan menyajikan drama panas bagi para penonton!`
          };

          set({
            funds: state.funds + totalReward,
            racesCompleted: state.racesCompleted + 1,
            reputation: Math.min(100, state.reputation + 3),
            fans: state.fans + 45_000,
            finances: {
              ...state.finances,
              recentTransactions: [finishTx, ...state.finances.recentTransactions]
            },
            newsFeed: [news, ...state.newsFeed],
            liveRace: {
              ...liveRace,
              lap: liveRace.totalLaps,
              isRacing: false,
              isFinished: true,
              drivers: updatedDrivers,
              podium,
              financialReward: totalReward,
              incidentsQueue: []
            }
          });
          return;
        }

        // Normal Lap Advance dengan variasi durasi > 1 menit
        const nextLapDuration = calcLapDuration(liveRace.safetyCar);

        set({
          liveRace: {
            ...liveRace,
            lap: nextLap,
            lapDuration: nextLapDuration,
            lapElapsed: 0,
            drivers: updatedDrivers,
            incidentsQueue: newIncidents
          }
        });
      },

      // 4. Pengendalian Bendera oleh Race Director (Yellow, Double Yellow, VSC, SC, Red Flag)
      setSafetyCar: (status) => {
        set((state) => {
          const { liveRace } = state;
          if (liveRace.safetyCar === status) return state;

          const isRed = status === 'Red Flag';
          const currentProgress = liveRace.lapDuration > 0 ? liveRace.lapElapsed / liveRace.lapDuration : 0;
          const newDuration = calcLapDuration(status);
          const newElapsed = Math.min(newDuration - 2, Math.round(currentProgress * newDuration));

          const redFlagNotice = isRed ? {
            id: 'rf_' + Date.now(),
            lap: liveRace.lap,
            title: '🔴 RED FLAG: Sesi Balapan Ditangguhkan!',
            decisionLog: 'RACE DIRECTOR: Red Flag resmi dikibarkan. Seluruh mobil diperintahkan masuk ke pit-lane. Sesi balapan dijeda.'
          } : null;

          return {
            liveRace: {
              ...liveRace,
              safetyCar: status,
              isPaused: isRed ? true : liveRace.isPaused,
              lapDuration: newDuration,
              lapElapsed: Math.max(0, newElapsed),
              incidentHistory: redFlagNotice ? [redFlagNotice, ...liveRace.incidentHistory] : liveRace.incidentHistory
            }
          };
        });
      },

      // Restart balapan pasca Red Flag (Standing Restart / Rolling Restart)
      resumeFromRedFlag: (restartFlag = 'Green Flag') => {
        const state = get();
        const { liveRace } = state;
        const newDuration = calcLapDuration(restartFlag);
        const restartNotice = {
          id: 'restart_' + Date.now(),
          lap: liveRace.lap,
          title: `🟢 RESTART SESI: ${restartFlag}`,
          decisionLog: `RACE DIRECTOR: Sesi balapan dilanjutkan kembali dengan status ${restartFlag}!`
        };

        set({
          liveRace: {
            ...liveRace,
            safetyCar: restartFlag,
            isPaused: false,
            lapDuration: newDuration,
            lapElapsed: 0,
            incidentHistory: [restartNotice, ...liveRace.incidentHistory]
          }
        });
      },

      // Akhiri balapan permanen saat Red Flag (Call Official Final Result)
      callRedFlagFinish: () => {
        const state = get();
        const { liveRace } = state;
        const podium = liveRace.drivers.filter(d => !d.dnf).slice(0, 3);
        const sanctionFee = 4_000_000;
        const ticketGate = 2_500_000;
        const tvBonus = 2_500_000;
        const totalReward = sanctionFee + ticketGate + tvBonus;

        const finishTx = {
          id: 'tx_rf_finish_' + Date.now(),
          label: `Hadiah Penyelenggaraan GP ${liveRace.circuit?.name} (Hasil Resmi Red Flag Lap ${liveRace.lap})`,
          amount: totalReward,
          type: 'income',
          week: state.racesCompleted + 1
        };

        const news = {
          id: 'news_rf_finish_' + Date.now(),
          week: state.racesCompleted + 1,
          headline: `BENDERA MERAH MENGAKHIRI GP ${liveRace.circuit?.name.toUpperCase()}: ${podium[0]?.name} DISAHKAN SEBAGAI JUARA!`,
          category: 'Grand Prix Result',
          content: `Balapan dihentikan permanen pada Lap ${liveRace.lap} akibat situasi bendera merah. Poin penuh dan klasifikasi disahkan oleh panel Race Control.`
        };

        set({
          funds: state.funds + totalReward,
          racesCompleted: state.racesCompleted + 1,
          reputation: Math.min(100, state.reputation + 2),
          fans: state.fans + 35_000,
          finances: {
            ...state.finances,
            recentTransactions: [finishTx, ...state.finances.recentTransactions]
          },
          newsFeed: [news, ...state.newsFeed],
          liveRace: {
            ...liveRace,
            isRacing: false,
            isFinished: true,
            isPaused: false,
            podium,
            financialReward: totalReward,
            incidentsQueue: []
          }
        });
      },

      // Tick per-detik untuk simulasi lap > 1 menit
      tickRaceSecond: (delta = 1) => {
        const state = get();
        const { liveRace } = state;
        if (!liveRace.isRacing || liveRace.isFinished || liveRace.isPaused) return;

        const mult = liveRace.simSpeed || 1;
        const newElapsed = (liveRace.lapElapsed || 0) + delta * mult;

        if (newElapsed >= (liveRace.lapDuration || 72)) {
          get().tickLiveRace();
        } else {
          set({
            liveRace: {
              ...liveRace,
              lapElapsed: newElapsed
            }
          });
        }
      },

      // Pengaturan kecepatan simulasi (1x Real, 2x, 4x)
      setSimSpeed: (speed) => {
        set((state) => ({
          liveRace: {
            ...state.liveRace,
            simSpeed: speed
          }
        }));
      },

      // 5. Keputusan Vonis Stewards atas Insiden Live
      resolveLiveIncident: (incidentId, decisionKey) => {
        const state = get();
        const { liveRace } = state;
        const inc = liveRace.incidentsQueue.find(i => i.id === incidentId);
        if (!inc) return;

        let decisionLog = '';
        let penaltyImpactSeconds = 0;
        let fineToLeague = 0;
        let scToTrigger = liveRace.safetyCar;

        if (decisionKey === 'no_action') {
          decisionLog = `VONIS STEWARDS: Tidak ada tindakan lebih lanjut (No Further Action) untuk insiden ${inc.title}. Dinyatakan insiden balap normal.`;
        } else if (decisionKey === 'time_penalty_5s') {
          decisionLog = `VONIS STEWARDS: Penalti waktu +5 Detik dijatuhkan kepada ${inc.involved[0]} atas manuver pelanggaran.`;
          penaltyImpactSeconds = 5;
        } else if (decisionKey === 'stop_go_10s') {
          decisionLog = `VONIS STEWARDS: Penalti 10-Second Stop-and-Go dijatuhkan kepada ${inc.involved[0]}!`;
          penaltyImpactSeconds = 10;
        } else if (decisionKey === 'fine_team_50k') {
          decisionLog = `VONIS STEWARDS: Tim ${inc.teamId || inc.involved[0]} dijatuhi denda sebesar $250,000 disetor ke kas liga.`;
          fineToLeague = 250_000;
        } else if (decisionKey === 'deploy_vsc') {
          decisionLog = `RACE DIRECTOR: Virtual Safety Car (VSC) diaktifkan guna evakuasi lintasan.`;
          scToTrigger = 'Virtual Safety Car';
        } else if (decisionKey === 'deploy_sc') {
          decisionLog = `RACE DIRECTOR: Full Safety Car (SC) resmi diterjunkan ke lintasan! Seluruh mobil merapatkan barisan.`;
          scToTrigger = 'Safety Car';
        }

        // Terapkan penalti ke pembalap
        const updatedDrivers = liveRace.drivers.map(d => {
          if (d.id === inc.driver1Id && penaltyImpactSeconds > 0) {
            return {
              ...d,
              penaltySeconds: d.penaltySeconds + penaltyImpactSeconds,
              gapToLeader: d.gapToLeader + penaltyImpactSeconds
            };
          }
          return d;
        });

        const newTx = fineToLeague > 0 ? [
          {
            id: 'tx_fine_' + Date.now(),
            label: `Denda Insiden Pit-Lane Grand Prix`,
            amount: fineToLeague,
            type: 'income',
            week: state.racesCompleted + 1
          },
          ...state.finances.recentTransactions
        ] : state.finances.recentTransactions;

        set({
          funds: state.funds + fineToLeague,
          finances: {
            ...state.finances,
            recentTransactions: newTx
          },
          liveRace: {
            ...liveRace,
            safetyCar: scToTrigger,
            drivers: updatedDrivers,
            incidentsQueue: liveRace.incidentsQueue.filter(i => i.id !== incidentId),
            incidentHistory: [
              { id: inc.id, lap: inc.lap, title: inc.title, decisionLog },
              ...liveRace.incidentHistory
            ]
          }
        });
      },

      // Keluar dari tampilan race
      exitRaceView: () => {
        set((state) => ({
          liveRace: {
            ...state.liveRace,
            isRacing: false,
            isFinished: false
          }
        }));
      },

      // Toggle Pause Live Race
      togglePauseRace: () => {
        set((state) => ({
          liveRace: {
            ...state.liveRace,
            isPaused: !state.liveRace.isPaused
          }
        }));
      },

      // ── Actions Lainnya (Regulasi, Tim, Dll) ──
      updateRegulation: (key, value) => {
        set((state) => ({ regulations: { ...state.regulations, [key]: value } }));
      },

      updateCharacteristic: (key, value) => {
        set((state) => ({ characteristics: { ...state.characteristics, [key]: value } }));
      },

      resolveIssue: (issueId, decisionType) => {
        const state = get();
        const issue = state.issues.find(i => i.id === issueId);
        if (!issue) return;

        let note = '';
        let fineRevenue = 0;
        let repChange = 0;
        let newsHeadline = '';

        if (decisionType === 'close_loophole') {
          note = 'Penyelenggara menerbitkan Technical Directive darurat: Celah ditutup tanpa denda.';
          repChange = +4;
          newsHeadline = `REGULASI DIKLARIFIKASI: Celah Teknis ${issue.teamName} Ditutup!`;
        } else if (decisionType === 'fine_and_penalty') {
          note = `Sanksi denda $${(issue.fineAmount / 1_000_000).toFixed(1)}M serta pengurangan poin.`;
          fineRevenue = issue.fineAmount;
          repChange = +7;
          newsHeadline = `SANKSI KERAS: ${issue.teamName} Didenda $${(issue.fineAmount / 1_000_000).toFixed(1)}M!`;
        } else {
          note = 'Penyelenggara membiarkan isu bergulir demi sensasi media.';
          repChange = -5;
          newsHeadline = `KONTROVERSI: Penyelenggara Tolak Menghukum ${issue.teamName}!`;
        }

        const newFunds = state.funds + fineRevenue;
        set({
          funds: newFunds,
          reputation: Math.max(10, Math.min(100, state.reputation + repChange)),
          issues: state.issues.map(i => i.id === issueId ? { ...i, status: 'resolved', resolvedNotes: note } : i),
          newsFeed: [{ id: 'news_' + Date.now(), week: state.racesCompleted + 1, headline: newsHeadline, category: 'Scrutineering', content: note }, ...state.newsFeed]
        });
      },

      buyTeam: (teamId) => {
        const state = get();
        const team = state.teams.find(t => t.id === teamId);
        if (!team || state.funds < team.askingPrice) return false;

        set({
          funds: state.funds - team.askingPrice,
          teams: state.teams.map(t => t.id === teamId ? { ...t, isOwnedByPlayer: true, owner: state.commissionerName, forSale: false } : t)
        });
        return true;
      },

      sellTeam: (teamId) => {
        const state = get();
        const team = state.teams.find(t => t.id === teamId);
        if (!team || !team.isOwnedByPlayer) return false;

        const val = Math.round(team.valuation * 1.1);
        set({
          funds: state.funds + val,
          teams: state.teams.map(t => t.id === teamId ? { ...t, isOwnedByPlayer: false, owner: 'Konsorsium Swasta', forSale: true } : t)
        });
        return true;
      },

      toggleTeamLicense: (teamId) => {
        set((state) => ({
          teams: state.teams.map(t => t.id === teamId ? { ...t, licenseActive: !t.licenseActive } : t)
        }));
      },

      resetGame: () => {
        localStorage.removeItem('race_manager_save');
        window.location.reload();
      }
    }),
    {
      name: 'race_manager_save'
    }
  )
);
