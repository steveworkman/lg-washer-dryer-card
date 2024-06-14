import { ActionConfig, LovelaceCard, LovelaceCardConfig, LovelaceCardEditor } from 'custom-card-helpers';

declare global {
  interface HTMLElementTagNameMap {
    'lg-washer-dryer-card-editor': LovelaceCardEditor;
    'hui-error-card': LovelaceCard;
  }
}

export type LGWasherDryerImage = {
  key: string;
  name: string;
  image: string;
};

export interface LGWasherDryerCardConfig extends LovelaceCardConfig {
  type: string;
  name?: string;
  show_warning?: boolean;
  show_error?: boolean;
  test_gui?: boolean;
  device?: string;
  image?: LGWasherDryerImage;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}
