# portfolio.heroone.art

The official Hero One Press Kit & Industry Portfolio for Canadian artist and producer **Adebayo Michael Manuwa**.

Rebuilt under the **333BI OS** standard adopted from `C:\Users\Michael\Documents\333BI OS` and `heroone-art`.

## Architecture & Standard

- **Design System**: 333BI OS Modern Glass
  - **Palette**: Ink (`#06080f`), Gold (`#c9a84c` / `#f0d78c`), Teal (`#4ff0e0`), Purple (`#6d40d4`), Success (`#22c55e`).
  - **Typography**: Self-hosted WOFF2 fonts for **Syne** (display headers), **DM Sans** (body & UI), and **IBM Plex Mono** (telemetry stamps & metric chips).
  - **Signal Field**: WebGL interactive shader background with subtle hexagonal lattice, drifting particles, and smooth CSS fallback (`assets/js/signal-field.js`).
  - **Bento Telemetry Cards**: 3D tilt-and-spotlight cards responding to cursor movement.
  - **High-Resolution Lightbox**: Native `<dialog>` modal with keyboard navigation (`Esc`, `←`, `→`) and full-size download links.
  - **Motion Deck**: Interactive campaign video visualizers with custom playback states.
- **Cross-Site Continuity**: Seamlessly linked with the main artist website at [heroone.art](https://heroone.art) and its master music catalog at [heroone.art/music/](https://heroone.art/music/).

## File Structure

```text
index.html                  # Main portfolio & press kit page (333BI OS standard)
site.webmanifest            # PWA Web App Manifest
vercel.json                 # Vercel deployment headers & caching rules
README.md                   # Repository documentation

assets/
  fonts/                    # Syne, DM Sans, IBM Plex Mono woff2
  css/
    portfolio.css           # 333BI OS design system, bento cards, glass header, lightbox
  js/
    signal-field.js         # WebGL signal field shader
    portfolio.js            # Glass header scroll, nav spy, 3D tilt, lightbox & video controls
  img/
    brand/                  # Hero One wordmark, logos, favicons, posters
    analytics/              # Verified streaming receipts (Symphonic, SoundCloud, oneRPM)
    press/                  # Editorial clippings (ChuneDesk, Extravafrench, KTRU, etc.)
    reviews/                # Music supervisor appraisal (Adonis Tsilimparis)
    og-image.jpg            # Open Graph social preview card
  video/
    motion-ai-1.mp4         # AI Visual Motion Reel I
    motion-ai-2.mp4         # Reality Music Kinetic Reel II
    motion-ai-3.mp4         # Harmonic Lattice Signal III
    motion-sip-ai.mp4       # Sip Narrative Visual IV
```

## Content Sections

1. **Hero**: 333BI OS live dossier telemetry, headline metrics (`319K+` streams, `+5,183%` SoundCloud surge), and interactive glass preview.
2. **Telemetry Ticker**: Real-time streaming and press signal stream.
3. **Operational Doctrine**: 4-part artist, producer, international, and sync readiness blueprint.
4. **Streaming Analytics**: Clickable receipts for Symphonic (151K+), SoundCloud (109K+), and oneRPM (59K+).
5. **Press & Media Coverage**: Spotlight editorial for *Force ft. Raybekah* (ChuneDesk) and clippings across Extravafrench, Lyrical Odyssey, KTRU 96.1 FM, Atlas De Música, Boulimique de Musique, and HypeHub.
6. **Industry & Sync Licensing**: Adonis Tsilimparis television background cue recommendation and 100% one-stop clearance blueprint.
7. **Motion Campaign Deck**: Playable video visualizers.
8. **Intellectual Property**: BMI, SoundExchange, Opulence Grandeur Sound, and Millenial Renaissance Art Limited.
9. **Contact**: Direct booking desk and ecosystem links.

## Deployment

Deployable as a zero-build static site on **Vercel**:
- Custom Domain: `portfolio.heroone.art`
- Security Headers & Immutable Caching: defined in `vercel.json`.
