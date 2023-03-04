![Logo](admin/hagelschutz.svg)

# ioBroker.hagelschutz

[![NPM version](https://img.shields.io/npm/v/iobroker.hagelschutz.svg)](https://www.npmjs.com/package/iobroker.hagelschutz)
[![Downloads](https://img.shields.io/npm/dm/iobroker.hagelschutz.svg)](https://www.npmjs.com/package/iobroker.hagelschutz)
![Number of Installations](https://iobroker.live/badges/hagelschutz-installed.svg)
![Current version in stable repository](https://img.shields.io/badge/stable-not%20published-%23264777)

<!-- ![Current version in stable repository](https://iobroker.live/badges/hagelschutz-stable.svg) -->
<!-- [![Dependency Status](https://img.shields.io/david/ice987987/iobroker.hagelschutz.svg)](https://david-dm.org/ice987987/iobroker.hagelschutz) -->

[![NPM](https://nodei.co/npm/iobroker.hagelschutz.svg?downloads=true)](https://nodei.co/npm/iobroker.hagelschutz/)

![Test and Release](https://github.com/ice987987/ioBroker.hagelschutz/workflows/Test%20and%20Release/badge.svg)

[![Donate](https://img.shields.io/badge/donate-paypal-blue?style=flat)](https://paypal.me/ice987987)

## hagelschutz adapter for ioBroker

This adapter fetches hail warnings from [meteo.netitservices.com](https://meteo.netitservices.com).

## Disclaimer

All product and company names or logos are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them or any associated subsidiaries! This personal project is maintained in spare time and has no business goal. meteo.netitservices and hagelschutz-einfach-automatisch are trademarks of Vereinigung Kantonaler Feuerversicherungen VKF, CH-3001 Bern.

## Installation requirements

-   node.js >= v14.0 is required
-   js-controller >= v4.0.23 is required
-   admin >= v6.2.19 is required
-   Access to [meteo.netitservices.com](https://meteo.netitservices.com) which can requested via [hagelschutz-einfach-automatisch.ch](https://www.hagelschutz-einfach-automatisch.ch/eigentuemer-verwaltungen/produkt/ich-habe-interesse.html).

## Available values (readonly)

You get the following value:

-   `hailState`: `0`: no hail; `1`: hail; `2`: hail state triggered by test-alarm

The hail forecast is calculated every 5 minutes. Therefore, the interval to poll the API is 120 seconds. This value provides a good balance between polling too often and not missing out on any changes in the forecast.

## How to report issues and feature requests

-   For issues
    Please use [GitHub issues](https://github.com/ice987987/ioBroker.hagelschutz/issues/new/choose) -> "Bug report" and fill in the form.

    Set the adapter to debug log mode (Instances -> Expert mode -> Column Log level). Get the logfile from disk (subdirectory "log" in ioBroker installation directory and not from Admin because Admin cuts the lines). Check that there are no personal information before you publish your log.

-   For feature requests
    Please use [GitHub issues](https://github.com/ice987987/ioBroker.hagelschutz/issues/new/choose) -> "Feature request" and fill in the form.

## Changelog

<!-- ### **WORK IN PROGRESS** -->

### 0.0.5 (04.03.2023)

-   (ice987987) dependencies updated
-   (ice987987) section "disclaimer" in readme added
-   (ice987987) ukrainian language added

### 0.0.4 (12.09.2022)

-   (ice987987) BREAKING: js-controller >= v4.0.23 is and admin >= v6.2.19 is required
-   (ice987987) configuration updated
-   (ice987987) feature request form added
-   (ice987987) icon fileformat from .png to .svg updated
-   (ice987987) dependencies updated

### 0.0.3 (01.08.2022)

-   (ice987987) dependencies updated

### 0.0.2 (29.07.2022)

-   (ice987987) translations added

### 0.0.1 (17.07.2022)

-   (ice987987) initial release

## License

MIT License

Copyright (c) 2023 ice987987 <mathias.frei1@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
