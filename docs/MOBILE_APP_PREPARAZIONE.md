# Leopardi PWA — Preparazione Android/iOS con Capacitor

## Panoramica modifiche effettuate

- Rafforzato `manifest.json` con `id`, `scope`, `orientation` e icone con `purpose`.
- Rafforzato `service-worker.js` con:
  - separazione cache statica/runtime,
  - versioning cache,
  - pulizia cache legacy,
  - fallback offline dedicato tramite `offline.html`.
- Aggiornata registrazione service worker in `script.js` con path/scope relativi.
- Aggiunti meta tag mobile/apple su tutte le pagine HTML del progetto.
- Introdotta base Capacitor conservativa:
  - `package.json`
  - `capacitor.config.json` (con `webDir: dist`)
  - script npm chiari (`serve`, `build`, `sync`, `cap:android`, `cap:ios`).

## Continuare a usare GitHub Pages come PWA

Il deploy statico resta invariato:
1. pubblicare i file nella root del repository GitHub Pages;
2. mantenere attivi `manifest.json` e `service-worker.js`;
3. aprire `index.html` (o URL del Pages).

Non è necessario usare Capacitor per la versione web/PWA.

## Uso Capacitor su Android

### Prerequisiti
- Node.js 20+ e npm
- Android Studio con SDK installato

### Passi
1. Installa dipendenze:
   ```bash
   npm install
   ```
2. Genera piattaforma Android (prima volta):
   ```bash
   npx cap add android
   ```
3. Sincronizza asset web nel progetto nativo:
   ```bash
   npm run sync
   ```
4. Apri Android Studio:
   ```bash
   npm run cap:android
   ```

## Uso Capacitor su iOS

### Prerequisiti
- macOS
- Node.js 20+ e npm
- Xcode aggiornato
- CocoaPods disponibile

### Passi
1. Installa dipendenze:
   ```bash
   npm install
   ```
2. Genera piattaforma iOS (prima volta):
   ```bash
   npx cap add ios
   ```
3. Sincronizza asset web nel progetto nativo:
   ```bash
   npm run sync
   ```
4. Apri Xcode:
   ```bash
   npm run cap:ios
   ```

## Prerequisiti locali sintetici

- Node.js + npm
- Android Studio (Android)
- Xcode (solo macOS, per iOS)

## Comandi essenziali

```bash
npm install
npm run serve
npm run build
npm run sync
npm run cap:android
npm run cap:ios
```

## File toccati

- `manifest.json`
- `service-worker.js`
- `script.js`
- `*.html` (meta/tag mobile, inclusa nuova `offline.html`)
- `package.json`
- `capacitor.config.json`
- `.gitignore`
- `docs/REPORT_INIZIALE.md`
- `docs/MOBILE_APP_PREPARAZIONE.md`

## Problemi rimasti aperti

1. **Ottimizzazione immagini**: molti asset sono ancora pesanti (2–3MB), consigliata una passata dedicata di compressione/resize.
2. **Icone avanzate**: mancano varianti `maskable` dedicate per alcune UX Android launcher.
3. **Piattaforme native non ancora generate nel repo**: `android/` e `ios/` si creano localmente con `npx cap add ...` per evitare modifiche invasive premature.
