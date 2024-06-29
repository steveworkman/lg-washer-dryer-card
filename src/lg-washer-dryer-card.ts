/* eslint-disable @typescript-eslint/no-explicit-any */
import { LitElement, html, TemplateResult, css, unsafeCSS, PropertyValues, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  HomeAssistant,
  hasConfigOrEntityChanged,
  hasAction,
  ActionHandlerEvent,
  handleAction,
  LovelaceCardEditor,
  getLovelace,
} from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types. https://github.com/custom-cards/custom-card-helpers

import type { HassEntity } from 'home-assistant-js-websocket';
import type { LGWasherDryerCardConfig } from './types';
import { actionHandler } from './action-handler-directive';
import { CARD_VERSION } from './const';
import { localize } from './localize/localize';

// CSS
import sevenSegment from './assets/7segment.woff';
const FONT_FACES = `@font-face {
  font-family: segment7;
  src: url('${unsafeCSS(sevenSegment)}') format('woff');
}`;

/* eslint no-console: 0 */
console.info(
  `%c  lg-washer-dryer-card \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'lg-washer-dryer-card',
  name: 'LG Washer Dryer Card',
  description: 'For users who want cards that look like their LG ThinQ enabled machines physical displays',
});

@customElement('lg-washer-dryer-card')
export class LGWasherDryerCard extends LitElement {
  constructor() {
    super();
    this.setupFontFaces();
  }

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./editor');
    return document.createElement('lg-washer-dryer-card-editor');
  }

  public static getStubConfig(): Record<string, unknown> {
    return {};
  }

  // TODO Add any properities that should cause your element to re-render here
  // https://lit.dev/docs/components/properties/
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private config!: LGWasherDryerCardConfig;

  // https://lit.dev/docs/components/properties/#accessors-custom
  public setConfig(config: LGWasherDryerCardConfig): void {
    // TODO Check for required fields and that they are of the proper format
    if (!config) {
      throw new Error(localize('common.invalid_configuration'));
    }

    if (config.test_gui) {
      getLovelace().setEditMode(true);
    }

    this.config = {
      name: 'LG Washer Dryer',
      ...config,
    };
  }

  get device(): HassEntity | undefined {
    if (this.config.device) {
      return this.hass.states[this.config.device];
    }
    return;
  }

  setupFontFaces() {
    if (document.querySelector('style[data-description="lg-washer-card-font-faces"]')) {
      return;
    }
    const style = document.createElement('style');
    style.dataset.description = 'lg-washer-card-font-faces';

    style.appendChild(document.createTextNode(FONT_FACES));
    document.head.appendChild(style);
  }

  // https://lit.dev/docs/components/lifecycle/#reactive-update-cycle-performing
  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }

    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  // https://lit.dev/docs/components/rendering/
  protected render(): TemplateResult | void {
    if (this.config.show_warning) {
      return this._showWarning(localize('common.show_warning'));
    }

    if (this.config.show_error) {
      return this._showError(localize('common.show_error'));
    }

    return html`
      <ha-card
        @action=${this._handleAction}
        .actionHandler=${actionHandler({
          hasHold: hasAction(this.config.hold_action),
          hasDoubleClick: hasAction(this.config.double_tap_action),
        })}
        tabindex="0"
      >
        <header>
          <span class="time time_display">00:11:00${this.device?.attributes.washer_time_display}</span>
        </header>
        <article>
          <hui-generic-entity-row
            .hass=${this.hass}
            .config=${{ entity: 'sensor.washer_current_course' }}
          ></hui-generic-entity-row>
          <hui-generic-entity-row
            .hass=${this.hass}
            .config=${{ entity: 'sensor.washer_run_state' }}
          ></hui-generic-entity-row>
          <hui-generic-entity-row
            .hass=${this.hass}
            .config=${{ entity: 'sensor.washer_door_lock' }}
          ></hui-generic-entity-row>
          <hui-generic-entity-row
            .hass=${this.hass}
            .config=${{ entity: 'sensor.washer_water_temp' }}
          ></hui-generic-entity-row>
        </article>
      </ha-card>
    `;
  }

  private _handleAction(ev: ActionHandlerEvent): void {
    if (this.hass && this.config && ev.detail.action) {
      handleAction(this, this.hass, this.config, ev.detail.action);
    }
  }

  private _showWarning(warning: string): TemplateResult {
    return html` <hui-warning>${warning}</hui-warning> `;
  }

  private _showError(error: string): TemplateResult {
    const errorCard = document.createElement('hui-error-card');
    errorCard.setConfig({
      type: 'error',
      error,
      origConfig: this.config,
    });

    return html` ${errorCard} `;
  }

  // https://lit.dev/docs/components/styles/
  static get styles(): CSSResultGroup {
    return css`
      .time {
        font-family: segment7;
        font-size: 3em;
        justify-self: end;
      }
      .time_display {
        grid-area: time_display;
      }
      header {
        background-color: #1a1a1a;
        height: 80px;
        border-radius: 5px;
        color: #fff;
        padding: 8px;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: 1fr 1fr;
        grid-template-areas:
          '. . . . .'
          '. . . time_display time_display';
      }
    `;
  }
}
