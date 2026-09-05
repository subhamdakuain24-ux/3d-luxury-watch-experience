import { WatchProduct, MovementComponentInfo } from '../types';

export const WATCH_PRODUCTS: WatchProduct[] = [
  {
    id: 'chronova-one',
    name: 'CHRONOVA ONE',
    tagline: 'The Definitive Precision Instrument',
    finish: 'steel',
    price: '$18,400',
    caseMaterial: 'Grade 5 Titanium & 904L Oystersteel',
    diameter: '41.0 mm',
    thickness: '11.4 mm',
    movement: 'Calibre 9001 Automatic',
    powerReserve: '72 Hours',
    waterResistance: '150 Metres (15 ATM)',
    description: 'Forged from ultra-dense 904L aerospace steel and grade 5 titanium chamfers. Featuring an obsidian sunburst dial with diamond-cut rhodium indices and an anti-reflective double-domed sapphire crystal.',
    specs: {
      bezel: 'Bidirectional ceramic with platinum PVD numerals',
      crystal: 'Double-domed sapphire with 7-layer internal AR',
      dial: 'Deep obsidian sunburst with Super-LumiNova BGW9',
      bracelet: 'Solid-link H-mesh with micro-glide comfort clasp',
      jewels: 38,
      frequency: '28,800 vph (4 Hz)'
    }
  },
  {
    id: 'chronova-noir',
    name: 'CHRONOVA NOIR',
    tagline: 'Stealth Horology in DLC Titanium',
    finish: 'noir',
    price: '$22,600',
    caseMaterial: 'Diamond-Like Carbon (DLC) Matte Titanium',
    diameter: '42.0 mm',
    thickness: '11.8 mm',
    movement: 'Calibre 9001-B Skeletonized',
    powerReserve: '70 Hours',
    waterResistance: '200 Metres (20 ATM)',
    description: 'An audacious monochromatic statement. The matte anthracite DLC case absorbs ambient glare while ruthenium-treated bridges and smoked sapphire offer an elusive glimpse into the mechanical architecture.',
    specs: {
      bezel: 'Brushed carbon-composite with recessed markers',
      crystal: 'Smoked anti-reflective sapphire',
      dial: 'Openworked skeleton dial with black gold hands',
      bracelet: 'Vulcanized FKM rubber with deployant titanium buckle',
      jewels: 35,
      frequency: '28,800 vph (4 Hz)'
    }
  },
  {
    id: 'chronova-automatic',
    name: 'CHRONOVA AUTOMATIC',
    tagline: 'Perpetual Balance & 18K Rose Gold',
    finish: 'gold',
    price: '$31,500',
    caseMaterial: '18K Everose Gold & Brushed Platinum Bezel',
    diameter: '40.0 mm',
    thickness: '10.9 mm',
    movement: 'Calibre 9002 Chronometer',
    powerReserve: '76 Hours',
    waterResistance: '100 Metres (10 ATM)',
    description: 'The pinnacle of classical elegance and contemporary engineering. Warm 18K Everose gold case with polished mirror bevels and a champagne sunray dial featuring hand-applied Roman markers.',
    specs: {
      bezel: 'Fluted 18K Everose gold with mirror-polish finish',
      crystal: 'Scratch-resistant synthetic sapphire crystal',
      dial: 'Champagne sunburst with guilloché small seconds',
      bracelet: 'Hand-stitched Mississippiensis alligator leather',
      jewels: 41,
      frequency: '28,800 vph (4 Hz)'
    }
  }
];

export const MOVEMENT_LABELS: MovementComponentInfo[] = [
  {
    id: 'balance',
    title: 'BALANCE WHEEL',
    subtitle: 'Free-Sprung Variable Inertia',
    frequency: '28,800 VPH (4Hz)',
    description: 'Oscillating at 4 Hertz with micro-adjusting gold eccentric screws, delivering chronometric precision immune to temperature shifts.',
    position: [-0.55, -0.42, 0.35]
  },
  {
    id: 'columnwheel',
    title: 'COLUMN WHEEL',
    subtitle: 'Integrated Chronograph Coordinator',
    description: 'Precision 8-pillar column wheel mechanism ensuring tactile, buttery-smooth pusher actuation without needle jump.',
    position: [0.0, -0.65, 0.38]
  },
  {
    id: 'escapement',
    title: 'ESCAPEMENT',
    subtitle: 'Silicium Paramagnetic Lever',
    description: 'Synthetic ruby pallet stones and lightweight silicium escape wheel minimize frictional loss and magnetic susceptibility.',
    position: [-0.25, -0.22, 0.32]
  },
  {
    id: 'geartrain',
    title: 'GEAR TRAIN',
    subtitle: 'Openworked Spoke Pinion Cascade',
    description: 'Hand-beveled gear train pinions with spoke cutouts transferring torque with 98.4% mechanical energy efficiency.',
    position: [-0.15, 0.25, 0.32]
  },
  {
    id: 'powerreserve',
    title: 'POWER RESERVE',
    subtitle: 'Twin Rapid-Wind Mainspring',
    description: 'High-density spring barrel delivering 72 hours of autonomous chronometric torque with circular sunburst finish.',
    position: [0.52, 0.45, 0.35]
  }
];
