# Installer App × Partner Portal — prototype

Clickable prototype of the SunPower Installer App with the Partner Portal features, organised in **workspaces** with a **workspace switcher** in the header: Installs · Academy · Partner program · Buy products.

Live: **https://cubillowork.github.io/installer-app-proto/**

Built with **[Flux DS](https://github.com/cubillowork/flux-ds)** (`flux-ds` v0.3.0) — every colour, size and text style comes from Flux tokens.

## Screens

- [x] Workspace switcher — tap the title (Installs ▾)
- [x] Installs — Home (systems overview, alerts, Begin installation), Systems (Gen 2 / Gen 1), Support, Warranty
- [x] Mobile menu (☰) — account, partner program, QR, language, user management, notifications, about, cache, log out
- [x] New installation — product choice + training check before commissioning X5 / W10
- [x] Register warranty — form with prefilled serial number
- [x] System detail — overview, devices, alerts
- [x] Academy — Learn (continue learning, videos, live training), Live training, My progress (certificates)
- [x] Partner program — Overview (tier, benefits, news), Leads, Marketing
- [x] Buy products — Catalogue (search, filters, quantities), Cart → request price, Requests

Sample data lives in `src/data.ts`.

## Run locally

```bash
npm install
npm run dev
```

## Update Flux

Change the tag in `package.json` (`github:cubillowork/flux-ds#v0.2.0`) and run `npm install`.
