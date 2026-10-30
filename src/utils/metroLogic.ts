/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kärnlogik för beräkning av tågläge och uppgångar (Rätt Vagn).
 *
 * Modulärt uppbyggd:
 * 1. Beräknar färdriktning utifrån stationsnivå (level) och linje.
 * 2. Mappar stationens fysiska uppgångar ('up', 'down', 'middle') till resenärens
 *    läge i tåget ('front', 'middle', 'back') i aktuell färdriktning.
 * 3. Beräknar smarta byten (t.ex. Grön -> Röd vid T-Centralen/Slussen, Blå -> Grön vid Fridhemsplan).
 */

import { METRO_LINES } from '../data/lines';
import { getStation, STATIONS } from '../data/stations';
import type {
  CarPosition,
  EvaluatedExit,
  JourneyLeg,
  JourneyPlan,
  MetroLineInfo,
  Station,
  StationExit,
} from '../types/metro';

/**
 * Nyckelstationer för byten i nätet med tips för snabbaste bytet.
 */
interface TransferHubConfig {
  stationId: string;
  name: string;
  tips: Record<string, { recommendedCar: CarPosition; note: string }>;
}

const TRANSFER_HUBS: Record<string, TransferHubConfig> = {
  't-centralen-grön-röd-linje': {
    stationId: 't-centralen-grön-röd-linje',
    name: 'T-Centralen',
    tips: {
      blue: {
        recommendedCar: 'middle',
        note: 'Gå ner via rulltrapporna i mitten av perrongen till Blå linjen.',
      },
      red_from_green: {
        recommendedCar: 'middle',
        note: 'Byt perrong för Röd linje (eller smidigare byte vid Slussen/Gamla stan).',
      },
    },
  },
  't-centralen-blå-linje': {
    stationId: 't-centralen-blå-linje',
    name: 'T-Centralen',
    tips: {
      green_red: {
        recommendedCar: 'middle',
        note: 'Ta de långa rulltrapporna i mitten upp till Grön & Röd linje.',
      },
    },
  },
  'fridhemsplan-grön-linje': {
    stationId: 'fridhemsplan-grön-linje',
    name: 'Fridhemsplan',
    tips: {
      blue: {
        recommendedCar: 'middle',
        note: 'Gångtunneln till Blå linjen ligger i mitten av perrongen.',
      },
    },
  },
  'fridhemsplan-blå-linje': {
    stationId: 'fridhemsplan-blå-linje',
    name: 'Fridhemsplan',
    tips: {
      green: {
        recommendedCar: 'back',
        note: 'Gångtunneln mot Grön linje ligger i södra änden av perrongen.',
      },
    },
  },
  slussen: {
    stationId: 'slussen',
    name: 'Slussen',
    tips: {
      cross_platform: {
        recommendedCar: 'middle',
        note: 'Smidigt byte tvärs över samma perrong mellan Grön och Röd linje!',
      },
    },
  },
  'gamla-stan': {
    stationId: 'gamla-stan',
    name: 'Gamla stan',
    tips: {
      cross_platform: {
        recommendedCar: 'middle',
        note: 'Tvärs över samma perrong mellan Grön och Röd linje!',
      },
    },
  },
};

/**
 * Avgör vilken vagn ('front' | 'middle' | 'back') som hamnar vid en viss uppgång
 * givet resans färdriktning.
 *
 * @param exit Uppgången på stationsperrongen
 * @param isTravelingIncreasingLevel true om tåget rör sig mot norr/väst (ökande level)
 */
export function evaluateExitPosition(
  exit: StationExit,
  isTravelingIncreasingLevel: boolean,
): { carPosition: CarPosition; carPositionLabel: string } {
  if (exit.position === 'middle') {
    return {
      carPosition: 'middle',
      carPositionLabel: 'I mitten av tåget',
    };
  }

  if (isTravelingIncreasingLevel) {
    // Tåget kör mot norr/väst (ökat level). Främre delen stannar vid 'up', bakre vid 'down'.
    if (exit.position === 'up') {
      return {
        carPosition: 'front',
        carPositionLabel: 'Fram i tåget',
      };
    }
    return {
      carPosition: 'back',
      carPositionLabel: 'Längst bak i tåget',
    };
  }

  // Tåget kör mot söder/öst (minskat level). Främre delen stannar vid 'down', bakre vid 'up'.
  if (exit.position === 'down') {
    return {
      carPosition: 'front',
      carPositionLabel: 'Fram i tåget',
    };
  }
  return {
    carPosition: 'back',
    carPositionLabel: 'Längst bak i tåget',
  };
}

/**
 * Identifierar bästa tunnelbanelinje mellan två stationer och returnerar färdriktningens namn.
 */
export function getLineAndDirection(
  fromStation: Station,
  toStation: Station,
): {
  line: MetroLineInfo;
  isTravelingIncreasingLevel: boolean;
  directionTitle: string;
  directionLabel: string;
} {
  // Hitta gemensamma linjer
  const commonLineIds = fromStation.lines.filter((l) => toStation.lines.includes(l));
  const lineId = commonLineIds[0] || fromStation.lines[0] || 17;
  const line = METRO_LINES[lineId] || METRO_LINES[17];

  const isTravelingIncreasingLevel = fromStation.level < toStation.level;

  let directionTitle = '';
  let directionLabel = '';

  if (isTravelingIncreasingLevel) {
    // Mot norr/väst
    directionTitle = `Mot ${line.terminals.northWest}`;
    directionLabel = 'Norrut / Västerut (framåt längs banan)';
  } else {
    // Mot söder/öst
    directionTitle = `Mot ${line.terminals.southEast}`;
    directionLabel = 'Söderut / Österut (bakåt längs banan)';
  }

  return {
    line,
    isTravelingIncreasingLevel,
    directionTitle,
    directionLabel,
  };
}

/**
 * Huvudfunktion: Beräknar hela resan från startstation till slutstation.
 * Stödjer både direktresor och byten mellan linjer.
 */
export function calculateJourney(from: Station, to: Station): JourneyPlan {
  // 1. Samma station
  if (from.id === to.id) {
    const evaluatedExits: EvaluatedExit[] = from.exits.map((exit) => ({
      exit,
      carPosition:
        exit.position === 'middle' ? 'middle' : exit.position === 'up' ? 'front' : 'back',
      carPositionLabel:
        exit.position === 'middle'
          ? 'I mitten'
          : exit.position === 'up'
            ? 'Norra änden'
            : 'Södra änden',
    }));

    const primaryLine = METRO_LINES[from.lines[0]] || METRO_LINES[17];

    return {
      from,
      to,
      isSameStation: true,
      isDirect: true,
      legs: [
        {
          fromStation: from,
          toStation: to,
          line: primaryLine,
          directionTitle: 'Samma station',
          directionLabel: 'Perrongens uppgångar',
          evaluatedExits,
        },
      ],
      primaryLine,
      frontExits: from.exits.filter((e) => e.position === 'up'),
      middleExits: from.exits.filter((e) => e.position === 'middle'),
      backExits: from.exits.filter((e) => e.position === 'down'),
    };
  }

  // 2. Kontrollera om stationerna delar linje
  const commonLines = from.lines.filter((l) => to.lines.includes(l));

  if (commonLines.length > 0) {
    // Direktresa på samma linje
    const { line, isTravelingIncreasingLevel, directionTitle, directionLabel } =
      getLineAndDirection(from, to);

    const evaluatedExits: EvaluatedExit[] = to.exits.map((exit) => {
      const { carPosition, carPositionLabel } = evaluateExitPosition(
        exit,
        isTravelingIncreasingLevel,
      );
      return {
        exit,
        carPosition,
        carPositionLabel,
      };
    });

    const frontExits = evaluatedExits.filter((e) => e.carPosition === 'front').map((e) => e.exit);
    const middleExits = evaluatedExits.filter((e) => e.carPosition === 'middle').map((e) => e.exit);
    const backExits = evaluatedExits.filter((e) => e.carPosition === 'back').map((e) => e.exit);

    const leg: JourneyLeg = {
      fromStation: from,
      toStation: to,
      line,
      directionTitle,
      directionLabel,
      evaluatedExits,
    };

    return {
      from,
      to,
      isSameStation: false,
      isDirect: true,
      legs: [leg],
      primaryLine: line,
      frontExits,
      middleExits,
      backExits,
    };
  }

  // 3. Resa med byte (olika linjer)
  // Hitta bästa bytesstation
  const transferStation = findBestTransferStation(from, to);

  if (!transferStation) {
    // Fallback om inget direkt byte hittas
    const fallbackLine = METRO_LINES[from.lines[0]] || METRO_LINES[17];
    return {
      from,
      to,
      isSameStation: false,
      isDirect: false,
      legs: [],
      primaryLine: fallbackLine,
      frontExits: [],
      middleExits: [],
      backExits: [],
    };
  }

  // Skapa delsträcka 1: Från startstation till bytesstation
  const leg1Dir = getLineAndDirection(from, transferStation);
  const leg1EvaluatedExits = transferStation.exits.map((exit) => {
    const { carPosition, carPositionLabel } = evaluateExitPosition(
      exit,
      leg1Dir.isTravelingIncreasingLevel,
    );
    return { exit, carPosition, carPositionLabel };
  });

  // Hämta bytesrekommendation för delsträcka 1
  let transferCar: CarPosition = 'middle';
  let transferNote = 'Stå i mitten av tåget för snabbast byte till din anslutande linje.';

  const hubConfig = TRANSFER_HUBS[transferStation.id];
  if (hubConfig) {
    const targetLineColor = getLineColor(to.lines[0]);
    if (targetLineColor === 'blue') {
      transferCar = hubConfig.tips.blue?.recommendedCar || 'middle';
      transferNote = hubConfig.tips.blue?.note || transferNote;
    } else if (targetLineColor === 'green' || targetLineColor === 'red') {
      if (hubConfig.tips.cross_platform) {
        transferCar = hubConfig.tips.cross_platform.recommendedCar;
        transferNote = hubConfig.tips.cross_platform.note;
      } else if (hubConfig.tips.green_red) {
        transferCar = hubConfig.tips.green_red.recommendedCar;
        transferNote = hubConfig.tips.green_red.note;
      }
    }
  }

  const leg1: JourneyLeg = {
    fromStation: from,
    toStation: transferStation,
    line: leg1Dir.line,
    directionTitle: leg1Dir.directionTitle,
    directionLabel: leg1Dir.directionLabel,
    recommendedCarForTransfer: transferCar,
    transferNote,
    evaluatedExits: leg1EvaluatedExits,
  };

  // Skapa delsträcka 2: Från bytesstation till slutdestination
  // Om bytesstationen har ett syskon på en annan plattform (t.ex. T-Centralen Blå linje)
  const connectedTransferPlatform = getConnectedPlatformStation(transferStation, to);
  const effectiveTransferStart = connectedTransferPlatform || transferStation;

  const leg2Dir = getLineAndDirection(effectiveTransferStart, to);
  const leg2EvaluatedExits = to.exits.map((exit) => {
    const { carPosition, carPositionLabel } = evaluateExitPosition(
      exit,
      leg2Dir.isTravelingIncreasingLevel,
    );
    return { exit, carPosition, carPositionLabel };
  });

  const leg2: JourneyLeg = {
    fromStation: effectiveTransferStart,
    toStation: to,
    line: leg2Dir.line,
    directionTitle: leg2Dir.directionTitle,
    directionLabel: leg2Dir.directionLabel,
    evaluatedExits: leg2EvaluatedExits,
  };

  const frontExits = leg2EvaluatedExits.filter((e) => e.carPosition === 'front').map((e) => e.exit);
  const middleExits = leg2EvaluatedExits
    .filter((e) => e.carPosition === 'middle')
    .map((e) => e.exit);
  const backExits = leg2EvaluatedExits.filter((e) => e.carPosition === 'back').map((e) => e.exit);

  return {
    from,
    to,
    isSameStation: false,
    isDirect: false,
    legs: [leg1, leg2],
    transferStation,
    primaryLine: leg2Dir.line,
    frontExits,
    middleExits,
    backExits,
  };
}

/**
 * Hjälpfunktion för att hitta den bästa bytesstationen mellan två stationer på olika linjer.
 */
function findBestTransferStation(from: Station, to: Station): Station | null {
  const fromColor = getLineColor(from.lines[0]);
  const toColor = getLineColor(to.lines[0]);

  // Byte mellan Grön och Röd linje
  if (
    (fromColor === 'green' && toColor === 'red') ||
    (fromColor === 'red' && toColor === 'green')
  ) {
    // Slussen eller Gamla stan har samma-perrongsbyte södergående/norrister
    const slussen = getStation('slussen');
    if (slussen) return slussen;
    const tCentralen = getStation('t-centralen-grön-röd-linje') || getStation('t-centralen');
    if (tCentralen) return tCentralen;
  }

  // Byte till/från Blå linjen
  if (fromColor === 'blue' || toColor === 'blue') {
    // Om från/till är nära Fridhemsplan
    if (from.id.includes('fridhem') || to.id.includes('fridhem')) {
      const fridhem = getStation('fridhemsplan-grön-linje') || getStation('fridhemsplan-blå-linje');
      if (fridhem) return fridhem;
    }
    // Standard är T-Centralen
    if (fromColor === 'blue') {
      return (
        getStation('t-centralen-blå-linje') || getStation('t-centralen-grön-röd-linje') || null
      );
    }
    return getStation('t-centralen-grön-röd-linje') || getStation('t-centralen-blå-linje') || null;
  }

  // Mellan grenar på samma färg (t.ex. linje 17 och 18 på gröna)
  if (fromColor === 'green') {
    const skarmarbrink = getStation('skärmarbrink');
    if (skarmarbrink) return skarmarbrink;
    const gullmars = getStation('gullmarsplan');
    if (gullmars) return gullmars;
  }

  if (fromColor === 'red') {
    const liljeholmen = getStation('liljeholmen');
    if (liljeholmen) return liljeholmen;
  }

  // Generisk sökning efter en station som har linjer från båda
  const common = STATIONS.find(
    (s) => s.lines.some((l) => from.lines.includes(l)) && s.lines.some((l) => to.lines.includes(l)),
  );

  return common || getStation('t-centralen-grön-röd-linje') || STATIONS[0];
}

/**
 * Returnerar motsvarande plattform för en bytesstation vid behov.
 */
function getConnectedPlatformStation(
  transferStation: Station,
  destination: Station,
): Station | null {
  const destColor = getLineColor(destination.lines[0]);
  if (destColor === 'blue') {
    if (transferStation.id.includes('t-centralen')) {
      return getStation('t-centralen-blå-linje') || null;
    }
    if (transferStation.id.includes('fridhem')) {
      return getStation('fridhemsplan-blå-linje') || null;
    }
  } else if (destColor === 'green' || destColor === 'red') {
    if (transferStation.id.includes('t-centralen')) {
      return getStation('t-centralen-grön-röd-linje') || null;
    }
    if (transferStation.id.includes('fridhem')) {
      return getStation('fridhemsplan-grön-linje') || null;
    }
  }
  return null;
}

/**
 * Hämtar färg för ett linjenummer.
 */
export function getLineColor(lineId: number): 'green' | 'red' | 'blue' | 'yellow' {
  const line = METRO_LINES[lineId];
  return line ? line.color : 'green';
}

/**
 * Smart sökning efter stationer, stöder sökning på stationsnamn,
 * gator/uppgångar, linjenummer och kända platser.
 */
export function searchStations(query: string, maxResults = 10): Station[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  // Exakt match på start
  const prefixMatches: Station[] = [];
  const nameContainsMatches: Station[] = [];
  const exitMatches: Station[] = [];

  for (const station of STATIONS) {
    const nameLower = station.name.toLowerCase();
    if (nameLower.startsWith(q)) {
      prefixMatches.push(station);
      continue;
    }
    if (nameLower.includes(q)) {
      nameContainsMatches.push(station);
      continue;
    }

    // Sök bland uppgångar och gator
    const matchesExit = station.exits.some((e) => e.name.toLowerCase().includes(q));
    if (matchesExit) {
      exitMatches.push(station);
    }
  }

  return [...prefixMatches, ...nameContainsMatches, ...exitMatches].slice(0, maxResults);
}
