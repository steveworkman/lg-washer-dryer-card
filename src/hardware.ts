import type { LGWasherDryerImage } from './types';
import comboImage from './assets/hass-combo-card-bg.png';
import dishwasherImage from './assets/hass-dishwasher-card-bg.png';

export const hardwareImages: LGWasherDryerImage[] = [
  { key: 'comboCard', name: 'Washer/Dryer Combo', image: comboImage },
  { key: 'dishwasher', name: 'Dishwasher', image: dishwasherImage },
];
