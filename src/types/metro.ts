/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Typdefinitioner för Rätt Vagn (Stockholms tunnelbana)
 * Modulärt och lätt att utöka för nya stationer och linjer (t.ex. Gula linjen).
 */

/**
 * Tunnelbanans linjefärger i SL:s nät.
 */
export type MetroColor = 'green' | 'red' | 'blue' | 'yellow';

/**
 * Information om en specifik tunnelbanelinje.
 */
export interface MetroLineInfo {
  id: number;
  name: string; // t.ex. "Gröna linjen 17"
  color: MetroColor;
  colorHex: string; // t.ex. "#189747"
  bgClass: string; // Tailwind-klass
  textClass: string;
  badgeBg: string;
  terminals: {
    northWest: string; // Ändstation mot norr/väst (positiv riktning/"up")
    southEast: string; // Ändstation mot söder/öst (negativ riktning/"down")
  };
  description: string;
}

/**
 * Fysisk placering av uppgången på perrongen relativt nätets huvudaxel:
 * - 'up': Mot banans nord-/västliga ände (ökar 'level')
 * - 'down': Mot banans syd-/östliga ände (minskar 'level')
 * - 'middle': I mitten av perrongen
 */
export type ExitPosition = 'up' | 'down' | 'middle';

/**
 * Var resenären ska befinna sig i tåget i aktuell färdriktning.
 */
export type CarPosition = 'front' | 'middle' | 'back';

/**
 * Detaljerad information om en specifik uppgång på en station.
 */
export interface StationExit {
  id: string;
  name: string; // Skyltat namn, t.ex. "Karlbergsvägen / Odengatan"
  position: ExitPosition; // Fysisk ände på perrongen ('up' | 'down' | 'middle')
  hasElevator: boolean; // Om hiss finns tillgänglig vid uppgången
  pos?: string; // GPS-koordinater t.ex. "59.342896,18.046095"
  landmarks?: string[]; // Kända platser i närheten t.ex. ["Läkarhuset", "Buss 4"]
  transferTo?: string[]; // Byte t.ex. ["Pendeltåg", "Tvärbanan"]
}

/**
 * En tunnelbanestation i systemet.
 */
export interface Station {
  id: string; // Unikt slug-id, t.ex. "odenplan"
  name: string; // Visningsnamn, t.ex. "Odenplan"
  rawKey?: string; // Ursprunglig nyckel från gamla datasetet
  lines: number[]; // Linjenummer som trafikerar stationen, t.ex. [17, 18, 19]
  level: number; // Nivå/ordningstal längs linjen (högre = norrut/västerut, lägre = söderut/österut)
  platformTag?: string; // T.ex. "Blå linje" för T-Centralen/Fridhemsplan vid behov
  exits: StationExit[];
  connections?: string[]; // Byte till pendeltåg, tvärbana, bussar etc.
  municipality?: string; // Kommun, t.ex. "Stockholm", "Solna", "Sundbyberg"
}

/**
 * Resultat av beräkning för en specifik uppgång i resans färdriktning.
 */
export interface EvaluatedExit {
  exit: StationExit;
  carPosition: CarPosition; // 'front' | 'middle' | 'back'
  carPositionLabel: string; // "Fram i tåget", "I mitten", "Längst bak"
}

/**
 * Delsträcka i en resa (antingen direktresa eller del av byte).
 */
export interface JourneyLeg {
  fromStation: Station;
  toStation: Station;
  line: MetroLineInfo;
  directionTitle: string; // T.ex. "Mot Hässelby strand"
  directionLabel: string; // T.ex. "Norrut / Västerut"
  recommendedCarForTransfer?: CarPosition; // Om denna sträcka leder till byte
  transferNote?: string;
  evaluatedExits: EvaluatedExit[];
}

/**
 * Komplett reseberäkning.
 */
export interface JourneyPlan {
  from: Station;
  to: Station;
  isSameStation: boolean;
  isDirect: boolean;
  legs: JourneyLeg[];
  transferStation?: Station;
  primaryLine?: MetroLineInfo;
  frontExits: StationExit[];
  middleExits: StationExit[];
  backExits: StationExit[];
}
