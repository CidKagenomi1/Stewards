export const TRACK_TEMPLATES = [
  {
    id: 'tpl_monza',
    name: 'Speed Temple (Template)',
    desc: 'High speed circuit with tight chicanes',
    splineData: {
      nodes: [
        { id: 'n1', x: -100, y: 150, type: 'smooth', cpIn: {x:-50,y:20}, cpOut: {x:50,y:-20}, banking: 0 }, // Parabolica
        { id: 'n2', x: 200, y: 100, type: 'sharp', cpIn: {x:-30,y:30}, cpOut: {x:30,y:-30}, banking: 0 },   // Chicane 1
        { id: 'n3', x: 250, y: -50, type: 'smooth', cpIn: {x:0,y:50}, cpOut: {x:0,y:-50}, banking: 0 },    // Curve Grande
        { id: 'n4', x: 150, y: -200, type: 'sharp', cpIn: {x:40,y:10}, cpOut: {x:-40,y:-10}, banking: 0 }, // Chicane 2
        { id: 'n5', x: -150, y: -150, type: 'smooth', cpIn: {x:40,y:-40}, cpOut: {x:-40,y:40}, banking: 5 } // Ascari
      ],
      closed: true,
      trackWidthMeters: 14,
      hasPitLane: true
    }
  },
  {
    id: 'tpl_silverstone',
    name: 'British Classic (Template)',
    desc: 'Flowing high-speed corners',
    splineData: {
      nodes: [
        { id: 'n1', x: 0, y: 180, type: 'smooth', cpIn: {x:-80,y:0}, cpOut: {x:80,y:0}, banking: 0 },      // Club
        { id: 'n2', x: 250, y: 50, type: 'smooth', cpIn: {x:0,y:80}, cpOut: {x:0,y:-80}, banking: 0 },     // Copse / Maggotts
        { id: 'n3', x: 150, y: -250, type: 'sharp', cpIn: {x:50,y:50}, cpOut: {x:-50,y:-50}, banking: 0 }, // Stowe
        { id: 'n4', x: -150, y: -150, type: 'smooth', cpIn: {x:50,y:-20}, cpOut: {x:-50,y:20}, banking: 0 },// Luffield
        { id: 'n5', x: -200, y: 50, type: 'smooth', cpIn: {x:0,y:-60}, cpOut: {x:0,y:60}, banking: 0 }     // Brooklands
      ],
      closed: true,
      trackWidthMeters: 15,
      hasPitLane: true
    }
  },
  {
    id: 'tpl_spa',
    name: 'Forest Rollercoaster (Template)',
    desc: 'Long sweeping elevation changes',
    splineData: {
      nodes: [
        { id: 'n1', x: 0, y: 250, type: 'sharp', cpIn: {x:-30,y:0}, cpOut: {x:30,y:0}, banking: 0 },        // Bus Stop
        { id: 'n2', x: 100, y: 150, type: 'smooth', cpIn: {x:-20,y:50}, cpOut: {x:20,y:-50}, banking: 0 },  // La Source
        { id: 'n3', x: 150, y: 50, type: 'smooth', cpIn: {x:-10,y:40}, cpOut: {x:10,y:-40}, banking: 10 },  // Eau Rouge
        { id: 'n4', x: 250, y: -200, type: 'sharp', cpIn: {x:0,y:60}, cpOut: {x:0,y:-60}, banking: 0 },     // Les Combes
        { id: 'n5', x: -50, y: -250, type: 'smooth', cpIn: {x:80,y:0}, cpOut: {x:-80,y:0}, banking: 0 },    // Pouhon
        { id: 'n6', x: -200, y: -50, type: 'smooth', cpIn: {x:0,y:-80}, cpOut: {x:0,y:80}, banking: 0 }     // Blanchimont
      ],
      closed: true,
      trackWidthMeters: 14,
      hasPitLane: true
    }
  },
  {
    id: 'tpl_monaco',
    name: 'Street Crown (Template)',
    desc: 'Extremely tight street circuit',
    splineData: {
      nodes: [
        { id: 'n1', x: 50, y: 150, type: 'sharp', cpIn: {x:-20,y:0}, cpOut: {x:20,y:0}, banking: 0 },       // Rascasse
        { id: 'n2', x: 150, y: 50, type: 'sharp', cpIn: {x:-20,y:20}, cpOut: {x:20,y:-20}, banking: 0 },    // Sainte Devote
        { id: 'n3', x: 100, y: -100, type: 'smooth', cpIn: {x:30,y:0}, cpOut: {x:-30,y:0}, banking: 0 },    // Casino
        { id: 'n4', x: 0, y: -150, type: 'sharp', cpIn: {x:20,y:20}, cpOut: {x:-20,y:-20}, banking: 0 },    // Hairpin
        { id: 'n5', x: -100, y: -50, type: 'smooth', cpIn: {x:20,y:-20}, cpOut: {x:-20,y:20}, banking: 0 }, // Tunnel
        { id: 'n6', x: -150, y: 100, type: 'sharp', cpIn: {x:0,y:-30}, cpOut: {x:0,y:30}, banking: 0 }      // Swimming Pool
      ],
      closed: true,
      trackWidthMeters: 9, // Very narrow
      hasPitLane: true
    }
  }
];
