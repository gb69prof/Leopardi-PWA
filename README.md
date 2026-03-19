# L'eco di Leopardi · PWA + base Capacitor

PWA didattica su Giacomo Leopardi, mantenuta compatibile con GitHub Pages e preparata in modo incrementale per packaging Android/iOS tramite Capacitor.

## Contenuto
- lezioni HTML complete
- videoteca
- galleria schemi
- quiz e autoverifica
- glossario con parole-cerniera
- appunti trascinabili con salvataggio `.txt`
- manifest + service worker per uso offline
- configurazione base Capacitor (`capacitor.config.json`)

## Deploy su GitHub Pages (PWA web)
1. Pubblica la root del repository su GitHub Pages.
2. Verifica che `manifest.json` e `service-worker.js` siano raggiungibili.
3. Apri `index.html` dal dominio Pages.

## Preparazione mobile (Capacitor)
Consulta la guida completa: `docs/MOBILE_APP_PREPARAZIONE.md`.

Comandi rapidi:
```bash
npm install
npm run sync
npm run cap:android
npm run cap:ios
```

## Note tecniche
- Il progetto **non è stato riscritto**: contenuti e struttura didattica sono stati preservati.
- Le immagini originali sono ancora pesanti (2–3MB in diversi casi): è consigliata un’ottimizzazione dedicata in un passaggio successivo.
