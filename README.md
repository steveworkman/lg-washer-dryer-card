# LG Washer / Dryer Card by [@steveworkman](https://www.github.com/steveworkman)

A custom card for Home Assistant to display the status of an LG Washer or Dryer. This card is insipired by [phrz/lg-washer-dryer-card/](https://github.com/phrz/lg-washer-dryer-card/).

[![License][license-shield]](LICENSE.md)
[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)](https://github.com/custom-components/hacs)

## Aim

This is a card that displays the status of an LG Washer or Dryer. It is designed to be used with the [LG ThinQ integration](https://www.home-assistant.io/integrations/thinq_lge/). The original design for this card used the existing picture-elements card, but I wanted to create a card that was more reusable and easier to configure, and could be insalled via HACS.

Plus, I love [Lit](https://lit.dev/), and this is kinda fun.

## Options

| Name              | Type    | Requirement  | Description                                 | Default             |
| ----------------- | ------- | ------------ | ------------------------------------------- | ------------------- |
| type              | string  | **Required** | `custom:boilerplate-card`                   |
| name              | string  | **Optional** | Card name                                   | `Boilerplate`       |
| show_error        | boolean | **Optional** | Show what an error looks like for the card  | `false`             |
| show_warning      | boolean | **Optional** | Show what a warning looks like for the card | `false`             |
| entity            | string  | **Optional** | Home Assistant entity ID.                   | `none`              |
| tap_action        | object  | **Optional** | Action to take on tap                       | `action: more-info` |
| hold_action       | object  | **Optional** | Action to take on hold                      | `none`              |
| double_tap_action | object  | **Optional** | Action to take on double tap                | `none`              |


## Starting a new card from boilerplate-card


[commits-shield]: https://img.shields.io/github/commit-activity/y/steveworkman/lg-washer-dryer-card.svg?style=for-the-badge
[commits]: https://github.com/steveworkman/lg-washer-dryer-card/commits/master
[devcontainer]: https://code.visualstudio.com/docs/remote/containers
[license-shield]: https://img.shields.io/github/license/steveworkman/lg-washer-dryer-card.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/release/steveworkman/lg-washer-dryer-card.svg?style=for-the-badge
[releases]: https://github.com/steveworkman/lg-washer-dryer-card/releases
