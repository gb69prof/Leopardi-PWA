# Report iniziale — Leopardi-PWA

## 1) Stato attuale del progetto

Il repository è una web app statica con pagine HTML dedicate alle lezioni e alle sezioni di supporto (quiz, video, schemi), con stile centralizzato in `style.css` e logica client-side in `script.js` + `glossario.js`.

### Struttura rilevata
- Pagine principali: `index.html` + 20+ pagine contenuto (`biografia.html`, `filosofia.html`, `quiz.html`, `video.html`, ecc.).
- PWA:
  - `manifest.json` presente.
  - `service-worker.js` presente e registrato in `script.js`.
- Icone:
  - `assets/icons/icon-192.png`
  - `assets/icons/icon-512.png`
  - `assets/icons/apple-touch-icon.png`
  - `assets/icons/favicon.png`
- Asset immagini in `assets/images/*.webp`.

## 2) Cosa è già pronto

- Manifest già funzionante con nome, `start_url`, colori, icone base e `display: standalone`.
- Service worker già attivo con:
  - precache di app shell,
  - cleanup cache vecchie,
  - caching runtime.
- Tutte le pagine HTML principali già includono:
  - `<link rel="manifest" ...>`
  - favicon/apple icon
  - viewport e theme-color.
- Esperienza didattica e contenuti completi già integrati.

## 3) Cosa manca per una PWA più solida

- Manifest migliorabile con:
  - `id` esplicito,
  - `scope` esplicito,
  - eventuale `orientation` coerente,
  - campo `purpose` sulle icone.
- Service worker migliorabile con:
  - versione cache più chiara,
  - strategia distinta per navigazione/documenti,
  - fallback offline dedicato (pagina minima),
  - maggiore robustezza su richieste cross-origin.
- Meta mobile/apple migliorabili con tag dedicati per web-app mode su iOS.

## 4) Cosa manca per packaging Capacitor Android/iOS

- Assente configurazione Capacitor (`capacitor.config.*`).
- Assente `package.json` con dipendenze/scripts Capacitor.
- Assenti piattaforme native (`android/`, `ios/`) generate da Capacitor.
- Assente documentazione operativa per `npx cap add/sync/open`.

## 5) Rischi tecnici individuati

1. **Peso asset immagini molto alto**: molti `.webp` sono tra ~2MB e ~3MB; impatta installazione, primo caricamento e cache offline.
2. **Fallback offline generico su `index.html`**: può produrre comportamento ambiguo su navigazioni deep-link offline.
3. **Deploy GitHub Pages**: modifiche a `start_url/scope/id` vanno mantenute compatibili con path relativo del repo.
4. **iOS PWA nuances**: senza meta/tag Apple dedicati, l’esperienza installata su iPhone/iPad può risultare meno “app-like”.
5. **Capacitor webDir**: va configurato in modo conservativo per non rompere il deploy statico esistente.
