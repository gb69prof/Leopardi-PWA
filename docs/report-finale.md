# Report finale: hardening PWA + base Capacitor

## Cosa è stato modificato

1. **Service Worker rifinito**
   - separazione cache in:
     - cache statica (`eco-leopardi-static-v3`)
     - cache runtime pagine (`eco-leopardi-pages-v3`)
   - strategia `cache-first` per asset statici (css/js/immagini/font)
   - strategia `network-first` per navigazione HTML
   - fallback offline essenziale su `index.html`
   - riduzione lista hardcoded: precache solo core asset minimi

2. **Base Capacitor resa concreta**
   - aggiunto `capacitor.config.json` con:
     - `appId`: `com.gb69prof.ecoleopardi`
     - `appName`: `Eco di Leopardi`
     - `webDir`: `.`
   - configurazione coerente con sito statico in root, per preservare GitHub Pages

3. **Workflow npm chiarito**
   - aggiunto `package.json` con script:
     - `start` (server locale)
     - `build` (check minimale)
     - `check:pwa`
     - `cap:sync`
     - `cap:android`
     - `cap:ios`

4. **Verifica minima obbligatoria**
   - aggiunto `scripts/check-pwa.mjs` che controlla:
     - presenza file critici
     - validità base `manifest.json`
     - esistenza icone dichiarate nel manifest

## Problemi risolti
- caching non più monolitico
- minore rischio rotture con nuove pagine/asset
- assenza completa di struttura Capacitor di base
- assenza di check automatico minimo

## Problemi ancora aperti / manuali
- per usare davvero `npx cap sync` servono dipendenze installate (`npm install`).
- per build mobile reale vanno aggiunte le piattaforme:
  - `npx cap add android`
  - `npx cap add ios` (solo su macOS con Xcode)
- eventuale ottimizzazione dimensione immagini non è stata fatta (fuori scope).

## Come testare

### PWA
1. `npm run check:pwa`
2. `npm run start`
3. aprire `http://localhost:8080`
4. verificare in DevTools:
   - Service Worker attivo
   - cache `eco-leopardi-static-v3` e `eco-leopardi-pages-v3`
   - offline fallback su navigazione

### Capacitor Android
1. `npm install`
2. `npm run cap:sync`
3. `npx cap add android` (solo la prima volta)
4. `npm run cap:android`

### Capacitor iOS
1. `npm install`
2. `npm run cap:sync`
3. `npx cap add ios` (solo la prima volta, su macOS)
4. `npm run cap:ios`
