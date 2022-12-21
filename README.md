# HC Dashboard

HC Dashboard provides an easy overview of patient data, for a healthcare professional.

## Patient Overview

This is where a healthcare professional can see all of his/her patients and their most current data.

### Risk score

A risk score is calculated from the amount of times a patients data is above a threshold. A 14 day average is also calculated from the risk scores.

###

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
