# Vaud Holidays util

A simple typescript utility to check if a certain date is regarded as a holiday in canton Vaud in Switzerland. (it doesn't take school holidays into account)

## Installation

Yarn:

```sh
yarn add is-it-vaud-holiday
```

npm:

```sh
npm install is-it-vaud-holiday
```

## Usage

```typescript
import { isHoliday } from 'is-vaud-holiday';
isHoliday(new Date('1 August 2023'));
```
