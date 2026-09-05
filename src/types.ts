export type WatchFinish = 'steel' | 'gold' | 'noir';

export interface WatchProduct {
  id: string;
  name: string;
  tagline: string;
  finish: WatchFinish;
  price: string;
  caseMaterial: string;
  diameter: string;
  thickness: string;
  movement: string;
  powerReserve: string;
  waterResistance: string;
  description: string;
  specs: {
    bezel: string;
    crystal: string;
    dial: string;
    bracelet: string;
    jewels: number;
    frequency: string;
  };
}

export interface MovementComponentInfo {
  id: string;
  title: string;
  subtitle: string;
  frequency?: string;
  description: string;
  position: [number, number, number];
}

export type SceneLightingMode = 'studio' | 'gold' | 'noir';
