# Rätt Vagn 🚇

> En mobil-först Progressive Web App (PWA) för Stockholms tunnelbana som visar om du ska stå **fram**, **i mitten** eller **bak** i tåget för snabbast avstigning vid vald uppgång eller byte.

Baserad och vidareutvecklad från det öppna projektet [Rätt Uppgång](https://github.com/mrkickling/Rattuppgang) av Joakim Loxdal.

---

## Innehåll
1. [Funktioner](#funktioner)
2. [Design & Estetik](#design--estetik)
3. [PWA & Offline](#pwa--offline)
4. [Firebase & Favoritsynkning](#firebase--favoritsynkning)
5. [Hur stationsdatan fungerar](#hur-stationsdatan-fungerar)
6. [Instruktion: Lägga till nya stationer och linjer](#instruktion-lägga-till-nya-stationer-och-linjer)
7. [Utveckling & Bygg](#utveckling--bygg)

---

## Funktioner

- **Mobile First:** Utvecklad med fokus på användning direkt i mobilen under språng i tunnelbanan.
- **Riktning och vagnsposition:** Räknar automatiskt ut tågets färdriktning och anger om du ska stå längst fram, i mitten eller längst bak.
- **Stöd för byten:** Vid resor mellan olika linjer (t.ex. Grön till Röd eller Blå) ger appen rekommendation för vilken vagn som är bäst för själva bytet vid knutpunkten.
- **Uppgångsinformation:** Visar gatunamn, perrongände samt om hiss (🛗) finns för varje uppgång.
- **Favoriter:** Spara dina vanligaste stationer och sträckor för 1-klicksval.
- **3 enkla flikar:**
  - `Resor`: Sök sträcka (Från ➔ Till), se vagn och uppgångar, spara favoritsträckor.
  - `Stationer`: Utforska alla Stockholms tunnelbanestationer med sökning, linjefilter och kollapsbara uppgångar.
  - `Om`: Information om appen, bakgrund och länkar.

---

## Design & Estetik

Appen använder en **platt pappersestetik** i varm gräddvit ton (`#FAF8F5`) med diskreta hårfina ramar och accenter i Stockholms tunnelbanas klassiska färger:
- **Grön linje:** `#138A36`
- **Röd linje:** `#D32F2F`
- **Blå linje:** `#006298`
- **Gul linje (kommande):** `#D97706`

Inga onödiga neonglöd eller AI-känslor – allt är rent, platt, typografiskt tydligt och lättläst även i starkt solljus.

---

## PWA & Offline

Appen är en fullvärdig PWA (Progressive Web App):
- Fungerar **helt offline** via inbyggd service worker och cachad stationsdata.
- Kan installeras på hemskärmen på iOS och Android via installationsknappen i headern.
- Uppfyller alla standardkrav för manifest, maskable-ikoner (192px och 512px) och iOS-meta-taggar.

---

## Firebase & Favoritsynkning

- **Gästläge / Offline:** Sparade favoriter lagras automatiskt i webbläsarens `localStorage`.
- **Inloggat läge:** Genom att logga in med Google synkas dina favoriter säkert till Firebase Cloud Firestore under `/users/{userId}/favorites/data`.
- Säkerhetsregler i `firestore.rules` garanterar att endast den inloggade användaren har åtkomst till sina egna favoriter.

---

## Hur stationsdatan fungerar

All stations- och linjedata är definierad i TypeScript:
- `src/data/lines.ts` – Definierar linjenummer, färger och ändstationer.
- `src/data/stations.ts` – Innehåller alla stationer med perrongens uppgångar och hissar.
- `src/utils/metroLogic.ts` – Algoritmen som avgör färdriktning och vagnposition.

### Principen för "Level" (Ordningstal)

Varje station har ett `level`-värde som anger dess position längs linjesträckningen:
- **Högre tal** = Längre mot banans norra/västra ände (t.ex. Hässelby strand = 20, Akalla = 10, Mörby centrum = 7, T-Centralen = 0).
- **Lägre tal** = Längre mot banans södra/östra ände (t.ex. Slussen = -2, Gullmarsplan = -5, Farsta strand = -14, Norsborg = -20).

### Principen för uppgångarnas "Position"

Varje uppgång på perrongen har en fast fysisk orientering:
- `"up"`: Uppgången ligger i perrongens norra/västra ände.
  - När tåget kör norrut blir detta **FRAM**.
  - När tåget kör söderut blir detta **BAK**.
- `"down"`: Uppgången ligger i perrongens södra/östra ände.
  - När tåget kör söderut blir detta **FRAM**.
  - När tåget kör norrut blir detta **BAK**.
- `"middle"`: Uppgången/rulltrappan ligger i mitten av perrongen. Detta är alltid **I MITTEN**.

---

## Instruktion: Lägga till nya stationer och linjer

När SL bygger ut tunnelbanenätet (t.ex. Gula linjen till Arenastaden, Blå linjen till Barkarby eller Nacka), följ dessa steg:

### 1. Lägg till en ny station i `src/data/stations.ts`

Lägg till ett nytt objekt i arrayen `STATIONS`:

```typescript
{
  id: "barkarbystaden",
  name: "Barkarbystaden",
  lines: [11],
  level: 11, // Högre än Akalla (10) eftersom den ligger längre nordväst
  exits: [
    {
      id: "barkarbystaden-exit-1",
      name: "Veddesta centrum / Stora torget",
      position: "up", // Ligger mot tågets norra ände
      hasElevator: true,
      pos: "59.4180, 17.8650"
    },
    {
      id: "barkarbystaden-exit-2",
      name: "Barkarby handelsplats",
      position: "down", // Ligger mot tågets södra ände
      hasElevator: true,
      pos: "59.4140, 17.8680"
    }
  ]
}
```

### 2. Lägg till en ny linje i `src/data/lines.ts` (vid behov)

Om en ny linje introduceras (t.ex. Gul linje 25):

```typescript
25: {
  id: 25,
  name: 'Gul linje 25',
  color: 'yellow',
  colorHex: '#D97706',
  bgClass: 'bg-[#D97706]',
  textClass: 'text-[#D97706]',
  badgeBg: 'bg-[#FEF7EA] text-[#D97706] border border-[#FBE3B5]',
  terminals: {
    northWest: 'Arenastaden',
    southEast: 'Odenplan',
  },
  description: 'Arenastaden – Hagastaden – Odenplan',
}
```

---

## Utveckling & Bygg

```bash
# Starta utvecklingsserver
npm run dev

# Typtesta
npm run lint

# Bygg produktionspaket
npm run build
```

---

## Licens & Cred
Projektet är öppen källkod under Apache-2.0. Ett stort tack till **Joakim Loxdal** och Reddit-communityn `r/stockholm` för det ursprungliga datainsamlingsarbetet.
