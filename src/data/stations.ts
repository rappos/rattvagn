/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Stationsdatabas för Stockholms tunnelbana (Rätt Vagn).
 *
 * INSTRUKTION FÖR ATT LÄGGA TILL NYA STATIONER OCH UPPGÅNGAR:
 * ==========================================================
 * 1. Lägg till ett nytt objekt i STATIONS-listan nedan.
 * 2. "level" anger position längs linjen:
 *    - Högre tal = längre mot norr/väst (t.ex. Hässelby strand = 20, Akalla = 10, Mörby = 7, T-Centralen = 0)
 *    - Lägre tal = längre mot söder/öst (t.ex. Slussen = -2, Farsta = -14, Norsborg = -20)
 * 3. Uppgångens "position":
 *    - "up": Ligger mot banans norra/västra ände (där tåget stannar med främre vagnen om man åker mot norr)
 *    - "down": Ligger mot banans södra/östra ände (där tåget stannar med främre vagnen om man åker mot söder)
 *    - "middle": Ligger i mitten av perrongen
 * 4. "hasElevator": sätt till true om hiss finns till gatuplan/biljetthall.
 * 5. "coords": GPS-koordinater { lat, lng } för funktionen "Närmast mig".
 */

import type { Station } from '../types/metro';

export const STATIONS: Station[] = [
  {
    id: 'abrahamsberg',
    name: 'Abrahamsberg',
    rawKey: 'Abrahamsberg',
    lines: [17, 18, 19],
    level: 10,
    exits: [
      {
        id: 'abrahamsberg-exit-1',
        name: 'Abrahamsbergsvägen',
        position: 'up',
        hasElevator: true,
        pos: '59.336494,17.952476',
      },
    ],
    coords: {
      lat: 59.336494,
      lng: 17.952476,
    },
  },
  {
    id: 'akalla',
    name: 'Akalla',
    rawKey: 'Akalla',
    lines: [11],
    level: 10,
    exits: [
      {
        id: 'akalla-exit-1',
        name: 'Akalla (busstorg)',
        position: 'up',
        hasElevator: true,
        pos: '59.415206,17.913047',
      },
      {
        id: 'akalla-exit-2',
        name: 'Lidl/Akalla kyrka',
        position: 'down',
        hasElevator: true,
        pos: '59.413836,17.917671',
      },
    ],
    coords: {
      lat: 59.415206,
      lng: 17.913047,
    },
  },
  {
    id: 'alby',
    name: 'Alby',
    rawKey: 'Alby',
    lines: [13],
    level: -18,
    exits: [
      {
        id: 'alby-exit-1',
        name: 'Alby centrum',
        position: 'up',
        hasElevator: true,
        pos: '59.238762,17.84479',
      },
      {
        id: 'alby-exit-2',
        name: 'Albyberget',
        position: 'up',
        hasElevator: true,
        pos: '59.239903,17.846196',
      },
    ],
    coords: {
      lat: 59.238762,
      lng: 17.84479,
    },
  },
  {
    id: 'alvik',
    name: 'Alvik',
    rawKey: 'Alvik',
    lines: [17, 18, 19, 12, 22],
    level: 8,
    exits: [
      {
        id: 'alvik-exit-1',
        name: 'Vidängsvägen (Mot tvärbanan)',
        position: 'up',
        hasElevator: true,
        pos: '59.333069,17.980049',
      },
      {
        id: 'alvik-exit-2',
        name: 'Tranebergsvägen',
        position: 'down',
        hasElevator: true,
        pos: '59.333414,17.983879',
      },
      {
        id: 'alvik-exit-3',
        name: 'Nockebybanan',
        position: 'middle',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.333069,
      lng: 17.980049,
    },
  },
  {
    id: 'aspudden',
    name: 'Aspudden',
    rawKey: 'Aspudden',
    lines: [13],
    level: -7,
    exits: [
      {
        id: 'aspudden-exit-1',
        name: 'Aspudden (Erik Segersälls väg)',
        position: 'middle',
        hasElevator: true,
        pos: '59.306469,18.001463',
      },
    ],
    coords: {
      lat: 59.306469,
      lng: 18.001463,
    },
  },
  {
    id: 'axelsberg',
    name: 'Axelsberg',
    rawKey: 'Axelsberg',
    lines: [13],
    level: -9,
    exits: [
      {
        id: 'axelsberg-exit-1',
        name: 'Selmedalsvägen',
        position: 'up',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.304333,
      lng: 17.974722,
    },
  },
  {
    id: 'bagarmossen',
    name: 'Bagarmossen',
    rawKey: 'Bagarmossen',
    lines: [17],
    level: -10,
    exits: [
      {
        id: 'bagarmossen-exit-1',
        name: 'Bagarmossen centrum',
        position: 'up',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.276111,
      lng: 18.131389,
    },
  },
  {
    id: 'bandhagen',
    name: 'Bandhagen',
    rawKey: 'Bandhagen',
    lines: [19],
    level: -11,
    exits: [
      {
        id: 'bandhagen-exit-1',
        name: 'Bandhagen Centrum',
        position: 'down',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.270556,
      lng: 18.049444,
    },
  },
  {
    id: 'bergshamra',
    name: 'Bergshamra',
    rawKey: 'Bergshamra',
    lines: [14],
    level: 5,
    exits: [
      {
        id: 'bergshamra-exit-1',
        name: 'Bergshamra torg',
        position: 'up',
        hasElevator: true,
        pos: '59.381474,18.036386',
      },
      {
        id: 'bergshamra-exit-2',
        name: 'Kraus torg/Bergshamra södra',
        position: 'down',
        hasElevator: true,
        pos: '59.379311,18.038006',
      },
    ],
    coords: {
      lat: 59.381474,
      lng: 18.036386,
    },
  },
  {
    id: 'björkhagen',
    name: 'Björkhagen',
    rawKey: 'Björkhagen',
    lines: [17],
    level: -8,
    exits: [
      {
        id: 'björkhagen-exit-1',
        name: 'Falsterbovägen/Malmövägen',
        position: 'middle',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.290556,
      lng: 18.115556,
    },
  },
  {
    id: 'blackeberg',
    name: 'Blackeberg',
    rawKey: 'Blackeberg',
    lines: [17, 18, 19],
    level: 15,
    exits: [
      {
        id: 'blackeberg-exit-1',
        name: 'Vinjegatan, Blackebergsplan',
        position: 'middle',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.348333,
      lng: 17.8825,
    },
  },
  {
    id: 'blåsut',
    name: 'Blåsut',
    rawKey: 'Blåsut',
    lines: [18],
    level: -7,
    exits: [
      {
        id: 'blåsut-exit-1',
        name: 'Blåsut',
        position: 'down',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.29,
      lng: 18.090833,
    },
  },
  {
    id: 'bredäng',
    name: 'Bredäng',
    rawKey: 'Bredäng',
    lines: [13],
    level: -11,
    exits: [
      {
        id: 'bredäng-exit-1',
        name: 'Bredängstorg, Bredängs centrum',
        position: 'up',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.295,
      lng: 17.933889,
    },
  },
  {
    id: 'brommaplan',
    name: 'Brommaplan',
    rawKey: 'Brommaplan',
    lines: [17, 18, 19],
    level: 11,
    exits: [
      {
        id: 'brommaplan-exit-1',
        name: 'Brommaplan (busstorg)',
        position: 'up',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.338333,
      lng: 17.939444,
    },
  },
  {
    id: 'danderyds-sjukhus',
    name: 'Danderyds sjukhus',
    rawKey: 'Danderyds sjukhus',
    lines: [14],
    level: 6,
    exits: [
      {
        id: 'danderyds-sjukhus-exit-1',
        name: 'Danderyds sjukhus',
        position: 'up',
        hasElevator: true,
        pos: '59.392281,18.040152',
      },
      {
        id: 'danderyds-sjukhus-exit-2',
        name: 'Bussterminal',
        position: 'down',
        hasElevator: true,
        pos: '59.38985,18.042222',
      },
    ],
    coords: {
      lat: 59.392281,
      lng: 18.040152,
    },
  },
  {
    id: 'duvbo',
    name: 'Duvbo',
    rawKey: 'Duvbo',
    lines: [10],
    level: 8,
    exits: [
      {
        id: 'duvbo-exit-1',
        name: 'Tulegatan',
        position: 'down',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.367778,
      lng: 17.964444,
    },
  },
  {
    id: 'enskede-gård',
    name: 'Enskede gård',
    rawKey: 'Enskede gård',
    lines: [19],
    level: -7,
    exits: [
      {
        id: 'enskede-gård-exit-1',
        name: 'Enskede gård',
        position: 'up',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.288889,
      lng: 18.070556,
    },
  },
  {
    id: 'farsta',
    name: 'Farsta',
    rawKey: 'Farsta',
    lines: [18],
    level: -13,
    exits: [
      {
        id: 'farsta-exit-1',
        name: 'Farsta centrum, Kroppaplan',
        position: 'middle',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.243333,
      lng: 18.093889,
    },
  },
  {
    id: 'farsta-strand',
    name: 'Farsta Strand',
    rawKey: 'Farsta Strand',
    lines: [18],
    level: -14,
    exits: [
      {
        id: 'farsta-strand-exit-1',
        name: 'Farsta strandplan',
        position: 'middle',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.23505,
      lng: 18.10207,
    },
  },
  {
    id: 'fittja',
    name: 'Fittja',
    rawKey: 'Fittja',
    lines: [13],
    level: -17,
    exits: [
      {
        id: 'fittja-exit-1',
        name: 'Bussar, Fittja centrum',
        position: 'up',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.2475,
      lng: 17.860833,
    },
  },
  {
    id: 'fridhemsplan-blå-linje',
    name: 'Fridhemsplan (Blå linje)',
    rawKey: 'Fridhemsplan Blå linje',
    platformTag: 'Blå linje',
    lines: [10, 11],
    level: 2,
    exits: [
      {
        id: 'fridhemsplan-blå-linje-exit-1',
        name: 'Mariebergsgatan/S:t Görans sjukhus',
        position: 'up',
        hasElevator: true,
        pos: '59.334919,18.025206',
      },
      {
        id: 'fridhemsplan-blå-linje-exit-2',
        name: 'Till grön linje',
        position: 'down',
        hasElevator: true,
      },
      {
        id: 'fridhemsplan-blå-linje-exit-3',
        name: 'Västermalmsgallerian/Fleminggatan/S:t Eriksgatan',
        position: 'down',
        hasElevator: true,
        pos: '59.334142,18.032223',
      },
    ],
    coords: {
      lat: 59.334919,
      lng: 18.025206,
    },
  },
  {
    id: 'fridhemsplan-grön-linje',
    name: 'Fridhemsplan (Grön linje)',
    rawKey: 'Fridhemsplan Grön linje',
    platformTag: 'Grön linje',
    lines: [17, 18, 19],
    level: 5,
    exits: [
      {
        id: 'fridhemsplan-grön-linje-exit-1',
        name: 'Drottningholmsvägen',
        position: 'up',
        hasElevator: true,
        pos: '59.332161,18.028929',
      },
      {
        id: 'fridhemsplan-grön-linje-exit-2',
        name: 'Västermalmsgallerian/Fleminggatan/S:t Eriksgatan',
        position: 'down',
        hasElevator: true,
        pos: '59.334142,18.032223',
      },
      {
        id: 'fridhemsplan-grön-linje-exit-3',
        name: 'Till blå linje',
        position: 'middle',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.332161,
      lng: 18.028929,
    },
  },
  {
    id: 'fruängen',
    name: 'Fruängen',
    rawKey: 'Fruängen',
    lines: [14],
    level: -11,
    exits: [
      {
        id: 'fruängen-exit-1',
        name: 'Fruängstorget, Fruängens centrum',
        position: 'down',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.285833,
      lng: 17.965,
    },
  },
  {
    id: 'gamla-stan',
    name: 'Gamla stan',
    rawKey: 'Gamla stan',
    lines: [13, 14, 17, 18, 19],
    level: -1,
    exits: [
      {
        id: 'gamla-stan-exit-1',
        name: 'Munkbroleden/Munkbron',
        position: 'middle',
        hasElevator: true,
        pos: '59.323152,18.067778',
      },
    ],
    coords: {
      lat: 59.323152,
      lng: 18.067778,
    },
  },
  {
    id: 'globen',
    name: 'Globen',
    rawKey: 'Globen',
    lines: [19],
    level: -6,
    exits: [
      {
        id: 'globen-exit-1',
        name: 'Globenområdet/Arenavägen/Konstgjutarvägen',
        position: 'up',
        hasElevator: true,
        pos: '59.294479,18.078282',
      },
      {
        id: 'globen-exit-2',
        name: 'Slakthusområdet',
        position: 'down',
        hasElevator: true,
        pos: '59.29369,18.074827',
      },
    ],
    coords: {
      lat: 59.294479,
      lng: 18.078282,
    },
  },
  {
    id: 'gubbängen',
    name: 'Gubbängen',
    rawKey: 'Gubbängen',
    lines: [18],
    level: -11,
    exits: [
      {
        id: 'gubbängen-exit-1',
        name: 'Herrhagsvägen',
        position: 'up',
        hasElevator: true,
        pos: '59.264153,18.082058',
      },
      {
        id: 'gubbängen-exit-2',
        name: 'Gubbängstorget',
        position: 'down',
        hasElevator: true,
        pos: '59.262179,18.082412',
      },
    ],
    coords: {
      lat: 59.264153,
      lng: 18.082058,
    },
  },
  {
    id: 'gullmarsplan',
    name: 'Gullmarsplan',
    rawKey: 'Gullmarsplan',
    lines: [17, 18, 19],
    level: -5,
    exits: [
      {
        id: 'gullmarsplan-exit-1',
        name: 'Gullmarsplan',
        position: 'down',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.298333,
      lng: 18.080833,
    },
  },
  {
    id: 'gärdet',
    name: 'Gärdet',
    rawKey: 'Gärdet',
    lines: [13],
    level: 3,
    exits: [
      {
        id: 'gärdet-exit-1',
        name: 'Värtavägen',
        position: 'up',
        hasElevator: true,
        pos: '59.347677,18.102261',
      },
      {
        id: 'gärdet-exit-2',
        name: 'Brantingsgatan, Askrikegatan',
        position: 'down',
        hasElevator: true,
        pos: '59.344827,18.098581',
      },
    ],
    coords: {
      lat: 59.347677,
      lng: 18.102261,
    },
  },
  {
    id: 'hagsätra',
    name: 'Hagsätra',
    rawKey: 'Hagsätra',
    lines: [19],
    level: -14,
    exits: [
      {
        id: 'hagsätra-exit-1',
        name: 'Hagsätra centrum',
        position: 'up',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.262222,
      lng: 18.012222,
    },
  },
  {
    id: 'hallonbergen',
    name: 'Hallonbergen',
    rawKey: 'Hallonbergen',
    lines: [11],
    level: 7,
    exits: [
      {
        id: 'hallonbergen-exit-1',
        name: 'Hallonbergen centrum',
        position: 'up',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.375278,
      lng: 17.969167,
    },
  },
  {
    id: 'hallunda',
    name: 'Hallunda',
    rawKey: 'Hallunda',
    lines: [13],
    level: -19,
    exits: [
      {
        id: 'hallunda-exit-1',
        name: 'Hallunda centrum, Tre Källors väg',
        position: 'down',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.243333,
      lng: 17.825278,
    },
  },
  {
    id: 'hammarbyhöjden',
    name: 'Hammarbyhöjden',
    rawKey: 'Hammarbyhöjden',
    lines: [17],
    level: -7,
    exits: [
      {
        id: 'hammarbyhöjden-exit-1',
        name: 'Finn Malmgrensplan',
        position: 'up',
        hasElevator: true,
        pos: '59.294873,18.102014',
      },
      {
        id: 'hammarbyhöjden-exit-2',
        name: 'Ulricehamnsvägen',
        position: 'down',
        hasElevator: true,
        pos: '59.294819,18.106713',
      },
    ],
    coords: {
      lat: 59.294873,
      lng: 18.102014,
    },
  },
  {
    id: 'hjulsta',
    name: 'Hjulsta',
    rawKey: 'Hjulsta',
    lines: [10],
    level: 12,
    exits: [
      {
        id: 'hjulsta-exit-1',
        name: 'Hjulsta torg',
        position: 'down',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.396111,
      lng: 17.887778,
    },
  },
  {
    id: 'hornstull',
    name: 'Hornstull',
    rawKey: 'Hornstull',
    lines: [13, 14],
    level: -5,
    exits: [
      {
        id: 'hornstull-exit-1',
        name: 'Högalidsparken',
        position: 'up',
        hasElevator: false,
        pos: '59.316594,18.038628',
      },
      {
        id: 'hornstull-exit-2',
        name: 'Torget/Gallerian',
        position: 'down',
        hasElevator: true,
        pos: '59.315762,18.034186, Bergsunds Strand',
      },
    ],
    coords: {
      lat: 59.316594,
      lng: 18.038628,
    },
  },
  {
    id: 'husby',
    name: 'Husby',
    rawKey: 'Husby',
    lines: [11],
    level: 9,
    exits: [
      {
        id: 'husby-exit-1',
        name: 'Husby centrum Norra/Husbygårdsskolan',
        position: 'up',
        hasElevator: true,
        pos: '59.410019, 17.925879',
      },
      {
        id: 'husby-exit-2',
        name: 'Husby centrum Södra/Husby kyrka',
        position: 'down',
        hasElevator: true,
        pos: '59.408152,17.928786',
      },
    ],
    coords: {
      lat: 59.410019,
      lng: 17.925879,
    },
  },
  {
    id: 'huvudsta',
    name: 'Huvudsta',
    rawKey: 'Huvudsta',
    lines: [10],
    level: 5,
    exits: [
      {
        id: 'huvudsta-exit-1',
        name: 'Huvudsta centrum',
        position: 'up',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.349444,
      lng: 17.985556,
    },
  },
  {
    id: 'hägerstensåsen',
    name: 'Hägerstensåsen',
    rawKey: 'Hägerstensåsen',
    lines: [14],
    level: -9,
    exits: [
      {
        id: 'hägerstensåsen-exit-1',
        name: 'Sedelvägen',
        position: 'up',
        hasElevator: true,
        pos: '59.295575,17.979609',
      },
      {
        id: 'hägerstensåsen-exit-2',
        name: 'Personnevägen/Skidvägen',
        position: 'down',
        hasElevator: true,
        pos: '59.294441,17.976401',
      },
    ],
    coords: {
      lat: 59.295575,
      lng: 17.979609,
    },
  },
  {
    id: 'hässelby-gård',
    name: 'Hässelby gård',
    rawKey: 'Hässelby gård',
    lines: [17, 18, 19],
    level: 19,
    exits: [
      {
        id: 'hässelby-gård-exit-1',
        name: 'Hässelby torg - hiss',
        position: 'up',
        hasElevator: true,
      },
      {
        id: 'hässelby-gård-exit-2',
        name: 'Hässelby torg - trappor',
        position: 'middle',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.366944,
      lng: 17.844444,
    },
  },
  {
    id: 'hässelby-strand',
    name: 'Hässelby strand',
    rawKey: 'Hässelby strand',
    lines: [17, 18, 19],
    level: 20,
    exits: [
      {
        id: 'hässelby-strand-exit-1',
        name: 'Fyrspannsgatan',
        position: 'up',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.361389,
      lng: 17.8325,
    },
  },
  {
    id: 'högdalen',
    name: 'Högdalen',
    rawKey: 'Högdalen',
    lines: [19],
    level: -12,
    exits: [
      {
        id: 'högdalen-exit-1',
        name: 'Högdalsgången',
        position: 'down',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.263889,
      lng: 18.043056,
    },
  },
  {
    id: 'hökarängen',
    name: 'Hökarängen',
    rawKey: 'Hökarängen',
    lines: [18],
    level: -12,
    exits: [
      {
        id: 'hökarängen-exit-1',
        name: 'Örbyleden',
        position: 'up',
        hasElevator: true,
      },
      {
        id: 'hökarängen-exit-2',
        name: 'Russinvägen',
        position: 'down',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.257778,
      lng: 18.0825,
    },
  },
  {
    id: 'hötorget',
    name: 'Hötorget',
    rawKey: 'Hötorget',
    lines: [17, 18, 19],
    level: 1,
    exits: [
      {
        id: 'hötorget-exit-1',
        name: 'Sveavägen/Olof Palmes gata',
        position: 'up',
        hasElevator: true,
        pos: '59.336374, 18.062435',
      },
      {
        id: 'hötorget-exit-2',
        name: 'Tunnelgatan',
        position: 'up',
        hasElevator: true,
        pos: '59.336604,18.062854',
      },
      {
        id: 'hötorget-exit-3',
        name: 'Sveavägen',
        position: 'down',
        hasElevator: true,
        pos: '59.33435,18.064785',
      },
      {
        id: 'hötorget-exit-4',
        name: 'Malmskillnadsgatan',
        position: 'down',
        hasElevator: true,
        pos: '59.33453,18.065815',
      },
      {
        id: 'hötorget-exit-5',
        name: 'Sergelgatan',
        position: 'down',
        hasElevator: false,
        pos: '59.334415,18.063744',
      },
      {
        id: 'hötorget-exit-6',
        name: 'Flertalet uppgångar Kungsgatan/Sveavägen',
        position: 'middle',
        hasElevator: true,
        pos: '59.335537,18.063422',
      },
    ],
    coords: {
      lat: 59.336374,
      lng: 18.062435,
    },
  },
  {
    id: 'islandstorget',
    name: 'Islandstorget',
    rawKey: 'Islandstorget',
    lines: [17, 18, 19],
    level: 14,
    exits: [
      {
        id: 'islandstorget-exit-1',
        name: 'Blackebergsvägen',
        position: 'up',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.346111,
      lng: 17.892917,
    },
  },
  {
    id: 'johannelund',
    name: 'Johannelund',
    rawKey: 'Johannelund',
    lines: [17, 18, 19],
    level: 18,
    exits: [
      {
        id: 'johannelund-exit-1',
        name: 'Bergslagsvägen',
        position: 'middle',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.367778,
      lng: 17.857778,
    },
  },
  {
    id: 'karlaplan',
    name: 'Karlaplan',
    rawKey: 'Karlaplan',
    lines: [13],
    level: 2,
    exits: [
      {
        id: 'karlaplan-exit-1',
        name: 'Värtavägen, Valhallavägen',
        position: 'up',
        hasElevator: true,
        pos: '59.340428,18.09298',
      },
      {
        id: 'karlaplan-exit-2',
        name: 'Karlaplan, Fältöversten',
        position: 'down',
        hasElevator: true,
        pos: '59.338311,18.090545',
      },
    ],
    coords: {
      lat: 59.340428,
      lng: 18.09298,
    },
  },
  {
    id: 'kista',
    name: 'Kista',
    rawKey: 'Kista',
    lines: [11],
    level: 8,
    exits: [
      {
        id: 'kista-exit-1',
        name: 'Kista Gallerian (norra), bussterminal',
        position: 'up',
        hasElevator: true,
        pos: '59.40374,17.942133',
      },
      {
        id: 'kista-exit-2',
        name: 'Kista Gallerian (södra)',
        position: 'down',
        hasElevator: true,
        pos: '59.401954,17.94415',
      },
    ],
    coords: {
      lat: 59.40374,
      lng: 17.942133,
    },
  },
  {
    id: 'kristineberg',
    name: 'Kristineberg',
    rawKey: 'Kristineberg',
    lines: [17, 18, 19],
    level: 7,
    exits: [
      {
        id: 'kristineberg-exit-1',
        name: 'Kristineberg (Hjalmar Söderbergs väg)',
        position: 'up',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.3325,
      lng: 18.004167,
    },
  },
  {
    id: 'kungsträdgården',
    name: 'Kungsträdgården',
    rawKey: 'Kungsträdgården',
    lines: [10, 11],
    level: -1,
    exits: [
      {
        id: 'kungsträdgården-exit-1',
        name: 'Gallerian',
        position: 'up',
        hasElevator: true,
        pos: '59.32989,18.068712',
      },
      {
        id: 'kungsträdgården-exit-2',
        name: 'Arsenalsgatan, Kungsträdgården',
        position: 'down',
        hasElevator: true,
        pos: '59.330743,18.073765',
      },
    ],
    coords: {
      lat: 59.32989,
      lng: 18.068712,
    },
  },
  {
    id: 'kärrtorp',
    name: 'Kärrtorp',
    rawKey: 'Kärrtorp',
    lines: [17],
    level: -9,
    exits: [
      {
        id: 'kärrtorp-exit-1',
        name: 'Kärrtorpsvägen',
        position: 'down',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.284444,
      lng: 18.114167,
    },
  },
  {
    id: 'liljeholmen',
    name: 'Liljeholmen',
    rawKey: 'Liljeholmen',
    lines: [13, 14],
    level: -6,
    exits: [
      {
        id: 'liljeholmen-exit-1',
        name: 'Liljeholmsgallerian',
        position: 'down',
        hasElevator: true,
        pos: '59.310045,18.022202',
      },
      {
        id: 'liljeholmen-exit-2',
        name: 'Tvärbanan, bussterminal',
        position: 'middle',
        hasElevator: true,
        pos: '59.31079,18.024487',
      },
    ],
    coords: {
      lat: 59.310045,
      lng: 18.022202,
    },
  },
  {
    id: 'mariatorget',
    name: 'Mariatorget',
    rawKey: 'Mariatorget',
    lines: [13, 14],
    level: -3,
    exits: [
      {
        id: 'mariatorget-exit-1',
        name: 'Mariatorget (Wollmar Yxkullsgatan/Swedenborgsgatan)',
        position: 'up',
        hasElevator: true,
        pos: '59.3169,18.063358',
      },
      {
        id: 'mariatorget-exit-2',
        name: 'Torkel Knutssonsgatan/Polisen',
        position: 'down',
        hasElevator: true,
        pos: '59.317251,18.057801',
      },
    ],
    coords: {
      lat: 59.3169,
      lng: 18.063358,
    },
  },
  {
    id: 'masmo',
    name: 'Masmo',
    rawKey: 'Masmo',
    lines: [13],
    level: -16,
    exits: [
      {
        id: 'masmo-exit-1',
        name: 'Solhagavägen/varvsvägenvägen',
        position: 'middle',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.249722,
      lng: 17.880278,
    },
  },
  {
    id: 'medborgarplatsen',
    name: 'Medborgarplatsen',
    rawKey: 'Medborgarplatsen',
    lines: [17, 18, 19],
    level: -3,
    exits: [
      {
        id: 'medborgarplatsen-exit-1',
        name: 'Folkungagatan',
        position: 'down',
        hasElevator: false,
        pos: '59.314234,18.073325',
      },
      {
        id: 'medborgarplatsen-exit-2',
        name: 'Björns Trädgård',
        position: 'middle',
        hasElevator: true,
        pos: '59.315345,18.073025',
      },
    ],
    coords: {
      lat: 59.314234,
      lng: 18.073325,
    },
  },
  {
    id: 'midsommarkransen',
    name: 'Midsommarkransen',
    rawKey: 'Midsommarkransen',
    lines: [14],
    level: -7,
    exits: [
      {
        id: 'midsommarkransen-exit-1',
        name: 'Tegelbruksvägen, Svandammsvägen',
        position: 'middle',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.3017,
      lng: 18.0111,
    },
  },
  {
    id: 'mälarhöjden',
    name: 'Mälarhöjden',
    rawKey: 'Mälarhöjden',
    lines: [13],
    level: -10,
    exits: [
      {
        id: 'mälarhöjden-exit-1',
        name: 'Hägerstensvägen',
        position: 'up',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.300833,
      lng: 17.957222,
    },
  },
  {
    id: 'mörby-centrum',
    name: 'Mörby centrum',
    rawKey: 'Mörby centrum',
    lines: [14],
    level: 7,
    exits: [
      {
        id: 'mörby-centrum-exit-1',
        name: 'Huvudingång Mörby Centrum/ Bussterminal',
        position: 'middle',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.398611,
      lng: 18.036111,
    },
  },
  {
    id: 'norsborg',
    name: 'Norsborg',
    rawKey: 'Norsborg',
    lines: [13],
    level: -20,
    exits: [
      {
        id: 'norsborg-exit-1',
        name: 'Norsborgs centrum, Eriksberg',
        position: 'down',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.243889,
      lng: 17.813056,
    },
  },
  {
    id: 'näckrosen',
    name: 'Näckrosen',
    rawKey: 'Näckrosen',
    lines: [11],
    level: 6,
    exits: [
      {
        id: 'näckrosen-exit-1',
        name: 'Storskogstorget',
        position: 'up',
        hasElevator: true,
        pos: '59.368445,17.979641',
      },
      {
        id: 'näckrosen-exit-2',
        name: 'Råsundavägen / Filmstaden',
        position: 'down',
        hasElevator: true,
        pos: '59.366275,17.982978',
      },
    ],
    coords: {
      lat: 59.368445,
      lng: 17.979641,
    },
  },
  {
    id: 'odenplan',
    name: 'Odenplan',
    rawKey: 'Odenplan',
    lines: [17, 18, 19],
    level: 3,
    exits: [
      {
        id: 'odenplan-exit-1',
        name: 'Karlbergvägen/Odengatan',
        position: 'up',
        hasElevator: true,
        pos: '59.342896,18.046095',
      },
      {
        id: 'odenplan-exit-2',
        name: 'Odenplan, bussar',
        position: 'down',
        hasElevator: true,
        pos: '59.343005,18.049765',
      },
      {
        id: 'odenplan-exit-3',
        name: 'Pendeltåg',
        position: 'middle',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.342896,
      lng: 18.046095,
    },
  },
  {
    id: 'rinkeby',
    name: 'Rinkeby',
    rawKey: 'Rinkeby',
    lines: [10],
    level: 10,
    exits: [
      {
        id: 'rinkeby-exit-1',
        name: 'Rinkeby Torg (hiss)',
        position: 'down',
        hasElevator: true,
      },
      {
        id: 'rinkeby-exit-2',
        name: 'Rinkeby Torg (trappa)',
        position: 'middle',
        hasElevator: true,
        pos: '59.388364,17.928003',
      },
    ],
    coords: {
      lat: 59.388364,
      lng: 17.928003,
    },
  },
  {
    id: 'rissne',
    name: 'Rissne',
    rawKey: 'Rissne',
    lines: [10],
    level: 9,
    exits: [
      {
        id: 'rissne-exit-1',
        name: 'Rissne torg',
        position: 'up',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.375833,
      lng: 17.939722,
    },
  },
  {
    id: 'ropsten',
    name: 'Ropsten',
    rawKey: 'Ropsten',
    lines: [13],
    level: 4,
    exits: [
      {
        id: 'ropsten-exit-1',
        name: 'Lidingöbanan',
        position: 'up',
        hasElevator: true,
        pos: '59.357401,18.102711',
      },
      {
        id: 'ropsten-exit-2',
        name: 'Hjorthagen',
        position: 'down',
        hasElevator: false,
        pos: '59.354798,18.098012',
      },
      {
        id: 'ropsten-exit-3',
        name: 'Ropsten bussterminal',
        position: 'middle',
        hasElevator: true,
        pos: '59.355492,18.09975',
      },
    ],
    coords: {
      lat: 59.357401,
      lng: 18.102711,
    },
  },
  {
    id: 'råcksta',
    name: 'Råcksta',
    rawKey: 'Råcksta',
    lines: [17, 18, 19],
    level: 16,
    exits: [
      {
        id: 'råcksta-exit-1',
        name: 'Jämtlandsgatan',
        position: 'up',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.354722,
      lng: 17.881861,
    },
  },
  {
    id: 'rådhuset',
    name: 'Rådhuset',
    rawKey: 'Rådhuset',
    lines: [10, 11],
    level: 1,
    exits: [
      {
        id: 'rådhuset-exit-1',
        name: 'Rådhuset/Polishuset',
        position: 'up',
        hasElevator: true,
        pos: '59.33013,18.041857',
      },
      {
        id: 'rådhuset-exit-2',
        name: 'Hantverkargatan/Kungsholmsgatan',
        position: 'down',
        hasElevator: true,
        pos: '59.331318,18.046203',
      },
    ],
    coords: {
      lat: 59.33013,
      lng: 18.041857,
    },
  },
  {
    id: 'rådmansgatan',
    name: 'Rådmansgatan',
    rawKey: 'Rådmansgatan',
    lines: [17, 18, 19],
    level: 2,
    exits: [
      {
        id: 'rådmansgatan-exit-1',
        name: 'Sveavägen/Handelshögskolan',
        position: 'up',
        hasElevator: true,
        pos: '59.342239,18.057178',
      },
      {
        id: 'rådmansgatan-exit-2',
        name: 'Sveavägen/Rådmansgatan',
        position: 'down',
        hasElevator: true,
        pos: '59.340434,18.058841',
      },
    ],
    coords: {
      lat: 59.342239,
      lng: 18.057178,
    },
  },
  {
    id: 'rågsved',
    name: 'Rågsved',
    rawKey: 'Rågsved',
    lines: [19],
    level: -13,
    exits: [
      {
        id: 'rågsved-exit-1',
        name: 'Rågsvedsvägen, Rågsveds centrum',
        position: 'middle',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.256667,
      lng: 18.028333,
    },
  },
  {
    id: 's-t-eriksplan',
    name: 'S:t Eriksplan',
    rawKey: 'S:t Eriksplan',
    lines: [17, 18, 19],
    level: 4,
    exits: [
      {
        id: 's-t-eriksplan-exit-1',
        name: 'S:t Eriksplan/S:t Eriksgatan',
        position: 'up',
        hasElevator: true,
        pos: '59.339755,18.03674',
      },
      {
        id: 's-t-eriksplan-exit-2',
        name: 'S:t Eriksgatan/Torsgatan',
        position: 'down',
        hasElevator: true,
        pos: '59.341446,18.037684',
      },
    ],
    coords: {
      lat: 59.339755,
      lng: 18.03674,
    },
  },
  {
    id: 'sandsborg',
    name: 'Sandsborg',
    rawKey: 'Sandsborg',
    lines: [18],
    level: -8,
    exits: [
      {
        id: 'sandsborg-exit-1',
        name: 'Sandsborg',
        position: 'down',
        hasElevator: false,
      },
    ],
    coords: {
      lat: 59.285,
      lng: 18.092222,
    },
  },
  {
    id: 'skanstull',
    name: 'Skanstull',
    rawKey: 'Skanstull',
    lines: [17, 18, 19],
    level: -4,
    exits: [
      {
        id: 'skanstull-exit-1',
        name: 'Götgatan/Allhelgonagatan',
        position: 'up',
        hasElevator: false,
        pos: '59.309914,18.075492',
      },
      {
        id: 'skanstull-exit-2',
        name: 'Götgatan/Ringvägen',
        position: 'down',
        hasElevator: true,
        pos: '59.307767,18.076479',
      },
    ],
    coords: {
      lat: 59.309914,
      lng: 18.075492,
    },
  },
  {
    id: 'skarpnäck',
    name: 'Skarpnäck',
    rawKey: 'Skarpnäck',
    lines: [17],
    level: -11,
    exits: [
      {
        id: 'skarpnäck-exit-1',
        name: 'Skarpnäck Allé',
        position: 'up',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.266806,
      lng: 18.133333,
    },
  },
  {
    id: 'skogskyrkogården',
    name: 'Skogskyrkogården',
    rawKey: 'Skogskyrkogården',
    lines: [18],
    level: -9,
    exits: [
      {
        id: 'skogskyrkogården-exit-1',
        name: 'Sockenvägen',
        position: 'up',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.278056,
      lng: 18.095278,
    },
  },
  {
    id: 'skärholmen',
    name: 'Skärholmen',
    rawKey: 'Skärholmen',
    lines: [13],
    level: -13,
    exits: [
      {
        id: 'skärholmen-exit-1',
        name: 'Bussar mot bl.a. Kungens kurva',
        position: 'up',
        hasElevator: true,
      },
      {
        id: 'skärholmen-exit-2',
        name: 'SKHLM',
        position: 'middle',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.277139,
      lng: 17.906944,
    },
  },
  {
    id: 'skärmarbrink',
    name: 'Skärmarbrink',
    rawKey: 'Skärmarbrink',
    lines: [17, 18],
    level: -6,
    exits: [
      {
        id: 'skärmarbrink-exit-1',
        name: 'Pelargatan /Palandergatan',
        position: 'down',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.295639,
      lng: 18.089806,
    },
  },
  {
    id: 'slussen',
    name: 'Slussen',
    rawKey: 'Slussen',
    lines: [13, 14, 17, 18, 19],
    level: -2,
    exits: [
      {
        id: 'slussen-exit-1',
        name: 'Södermalmstorg/Bussar',
        position: 'up',
        hasElevator: true,
        pos: '59.320147,18.072166',
      },
      {
        id: 'slussen-exit-2',
        name: 'Götgatsbacken',
        position: 'down',
        hasElevator: false,
        pos: '59.318116,18.071362',
      },
      {
        id: 'slussen-exit-3',
        name: 'Södermalmstorg/Bussar',
        position: 'middle',
        hasElevator: true,
        pos: '59.319681,18.072199',
      },
    ],
    coords: {
      lat: 59.320147,
      lng: 18.072166,
    },
  },
  {
    id: 'sockenplan',
    name: 'Sockenplan',
    rawKey: 'Sockenplan',
    lines: [19],
    level: -8,
    exits: [
      {
        id: 'sockenplan-exit-1',
        name: 'Sockenplan',
        position: 'up',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.282778,
      lng: 18.070278,
    },
  },
  {
    id: 'solna-centrum',
    name: 'Solna centrum',
    rawKey: 'Solna centrum',
    lines: [11],
    level: 5,
    exits: [
      {
        id: 'solna-centrum-exit-1',
        name: 'Frösundaleden (Råsunda)',
        position: 'up',
        hasElevator: true,
        pos: '59.361305,17.996485',
      },
      {
        id: 'solna-centrum-exit-2',
        name: 'Tvärbanan',
        position: 'up',
        hasElevator: true,
        pos: '59.361305,17.996485',
      },
      {
        id: 'solna-centrum-exit-3',
        name: 'Centralvägen (busstorget)',
        position: 'down',
        hasElevator: true,
        pos: '59.358472,17.998803',
      },
    ],
    coords: {
      lat: 59.361305,
      lng: 17.996485,
    },
  },
  {
    id: 'solna-strand',
    name: 'Solna strand',
    rawKey: 'Solna strand',
    lines: [10],
    level: 6,
    exits: [
      {
        id: 'solna-strand-exit-1',
        name: 'Solna strand',
        position: 'up',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.354167,
      lng: 17.973889,
    },
  },
  {
    id: 'stadion',
    name: 'Stadion',
    rawKey: 'Stadion',
    lines: [14],
    level: 2,
    exits: [
      {
        id: 'stadion-exit-1',
        name: 'Valhallavägen/Grev Turegatan (buss: musikhögskolan',
        position: 'up',
        hasElevator: true,
        pos: '59.343454,18.080857',
      },
      {
        id: 'stadion-exit-2',
        name: 'Karlavägen/Nybrogatan',
        position: 'down',
        hasElevator: true,
        pos: '59.339673,18.081168',
      },
    ],
    coords: {
      lat: 59.343454,
      lng: 18.080857,
    },
  },
  {
    id: 'stadshagen',
    name: 'Stadshagen',
    rawKey: 'Stadshagen',
    lines: [10, 11],
    level: 3,
    exits: [
      {
        id: 'stadshagen-exit-1',
        name: 'Sankt Göransgatan',
        position: 'up',
        hasElevator: true,
        pos: '59.336735,18.017793',
      },
      {
        id: 'stadshagen-exit-2',
        name: 'Kellgrensgatan, Sankt Göransgatan',
        position: 'down',
        hasElevator: true,
        pos: '59.336905,18.016527',
      },
    ],
    coords: {
      lat: 59.336735,
      lng: 18.017793,
    },
  },
  {
    id: 'stora-mossen',
    name: 'Stora mossen',
    rawKey: 'Stora mossen',
    lines: [17, 18, 19],
    level: 9,
    exits: [
      {
        id: 'stora-mossen-exit-1',
        name: 'Stora Mossens Backe, Drottningholmsvägen',
        position: 'down',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.334722,
      lng: 17.965,
    },
  },
  {
    id: 'stureby',
    name: 'Stureby',
    rawKey: 'Stureby',
    lines: [19],
    level: -10,
    exits: [
      {
        id: 'stureby-exit-1',
        name: 'Mölnbackavägen, Sågverksgatan',
        position: 'down',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.274722,
      lng: 18.056944,
    },
  },
  {
    id: 'sundbybergs-centrum',
    name: 'Sundbybergs centrum',
    rawKey: 'Sundbybergs centrum',
    lines: [10],
    level: 7,
    exits: [
      {
        id: 'sundbybergs-centrum-exit-1',
        name: 'Prästgårdsgatan, Stationsgatan',
        position: 'up',
        hasElevator: true,
        pos: '59.363098,17.970285',
      },
      {
        id: 'sundbybergs-centrum-exit-2',
        name: 'Sundbybergs torg, pendeltåget, tvärbanan',
        position: 'down',
        hasElevator: true,
        pos: '59.360796,17.97138',
      },
    ],
    coords: {
      lat: 59.363098,
      lng: 17.970285,
    },
  },
  {
    id: 'svedmyra',
    name: 'Svedmyra',
    rawKey: 'Svedmyra',
    lines: [19],
    level: -9,
    exits: [
      {
        id: 'svedmyra-exit-1',
        name: 'Svedmyra',
        position: 'middle',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.2775,
      lng: 18.067083,
    },
  },
  {
    id: 'sätra',
    name: 'Sätra',
    rawKey: 'Sätra',
    lines: [13],
    level: -12,
    exits: [
      {
        id: 'sätra-exit-1',
        name: 'Sätra centrum',
        position: 'down',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.28577,
      lng: 17.92167,
    },
  },
  {
    id: 't-centralen-blå-linje',
    name: 'T-Centralen (Blå linje)',
    rawKey: 'TCentralen Blå linje',
    platformTag: 'Blå linje',
    lines: [10, 11],
    level: 0,
    exits: [
      {
        id: 't-centralen-blå-linje-exit-1',
        name: 'Vasagatan',
        position: 'up',
        hasElevator: true,
        pos: '59.330344,18.059056',
      },
      {
        id: 't-centralen-blå-linje-exit-2',
        name: 'Sergelstorg',
        position: 'down',
        hasElevator: true,
        pos: '59.332139,18.063154',
      },
      {
        id: 't-centralen-blå-linje-exit-3',
        name: 'Till grön/röd linje',
        position: 'middle',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.330344,
      lng: 18.059056,
    },
  },
  {
    id: 't-centralen-grön-röd-linje',
    name: 'T-Centralen (Grön & Röd linje)',
    rawKey: 'TCentralen Grön/Röd linje',
    platformTag: 'Grön & Röd linje',
    lines: [13, 14, 17, 18, 19],
    level: 0,
    exits: [
      {
        id: 't-centralen-grön-röd-linje-exit-1',
        name: 'Sergels torg/drottninggatan',
        position: 'up',
        hasElevator: true,
        pos: '59.332139,18.063154',
      },
      {
        id: 't-centralen-grön-röd-linje-exit-2',
        name: 'Centralstationen',
        position: 'down',
        hasElevator: true,
        pos: '59.330344,18.059056',
      },
      {
        id: 't-centralen-grön-röd-linje-exit-3',
        name: 'Till blå linje, Pendeltåg',
        position: 'middle',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.332139,
      lng: 18.063154,
    },
  },
  {
    id: 'tallkrogen',
    name: 'Tallkrogen',
    rawKey: 'Tallkrogen',
    lines: [18],
    level: -10,
    exits: [
      {
        id: 'tallkrogen-exit-1',
        name: 'Viktor Balcks väg',
        position: 'down',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.271667,
      lng: 18.086389,
    },
  },
  {
    id: 'tekniska-högskolan',
    name: 'Tekniska högskolan',
    rawKey: 'Tekniska högskolan',
    lines: [14],
    level: 3,
    exits: [
      {
        id: 'tekniska-högskolan-exit-1',
        name: 'Odengatan/Valhallavägen',
        position: 'up',
        hasElevator: true,
        pos: '59.346588,18.065718',
      },
      {
        id: 'tekniska-högskolan-exit-2',
        name: 'Valhallavägen/Körsbärsvägen',
        position: 'up',
        hasElevator: true,
        pos: '59.347266,18.066888',
      },
      {
        id: 'tekniska-högskolan-exit-3',
        name: 'Roslagsbanan (Stockholms östra), Tekniska högskolan',
        position: 'down',
        hasElevator: true,
        pos: '59.34568,18.071823',
      },
      {
        id: 'tekniska-högskolan-exit-4',
        name: 'Engelbrektsskolan',
        position: 'down',
        hasElevator: true,
        pos: '59.345062,18.071351',
      },
    ],
    coords: {
      lat: 59.346588,
      lng: 18.065718,
    },
  },
  {
    id: 'telefonplan',
    name: 'Telefonplan',
    rawKey: 'Telefonplan',
    lines: [14],
    level: -8,
    exits: [
      {
        id: 'telefonplan-exit-1',
        name: 'Telefonplan/konstfack',
        position: 'down',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.298056,
      lng: 17.996944,
    },
  },
  {
    id: 'tensta',
    name: 'Tensta',
    rawKey: 'Tensta',
    lines: [10],
    level: 11,
    exits: [
      {
        id: 'tensta-exit-1',
        name: 'Tenstaplan/Hagstråket/Blå huset',
        position: 'up',
        hasElevator: true,
        pos: '59.394805, 17.899121',
      },
      {
        id: 'tensta-exit-2',
        name: 'Tensta centrum/Tenstastråket/Tensta Konsthall',
        position: 'down',
        hasElevator: true,
        pos: '59.393882,17.904335',
      },
    ],
    coords: {
      lat: 59.394805,
      lng: 17.899121,
    },
  },
  {
    id: 'thorildsplan',
    name: 'Thorildsplan',
    rawKey: 'Thorildsplan',
    lines: [17, 18, 19],
    level: 6,
    exits: [
      {
        id: 'thorildsplan-exit-1',
        name: 'Drottningholmsvägen, Konradsbergsparken',
        position: 'down',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.331389,
      lng: 18.014722,
    },
  },
  {
    id: 'universitetet',
    name: 'Universitetet',
    rawKey: 'Universitetet',
    lines: [14],
    level: 4,
    exits: [
      {
        id: 'universitetet-exit-1',
        name: 'Universitetet',
        position: 'down',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.365694,
      lng: 18.054722,
    },
  },
  {
    id: 'vårberg',
    name: 'Vårberg',
    rawKey: 'Vårberg',
    lines: [13],
    level: -14,
    exits: [
      {
        id: 'vårberg-exit-1',
        name: 'Vårbergs centrum',
        position: 'down',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.275833,
      lng: 17.890833,
    },
  },
  {
    id: 'vårby-gård',
    name: 'Vårby gård',
    rawKey: 'Vårby gård',
    lines: [13],
    level: -15,
    exits: [
      {
        id: 'vårby-gård-exit-1',
        name: 'Vårby gårds centrum',
        position: 'down',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.264722,
      lng: 17.883889,
    },
  },
  {
    id: 'vällingby',
    name: 'Vällingby',
    rawKey: 'Vällingby',
    lines: [17, 18, 19],
    level: 17,
    exits: [
      {
        id: 'vällingby-exit-1',
        name: 'Lyckselevägen',
        position: 'up',
        hasElevator: true,
        pos: '59.364487,17.86967',
      },
      {
        id: 'vällingby-exit-2',
        name: 'Vällingbyplan,bussar',
        position: 'down',
        hasElevator: true,
        pos: '59.363043,17.872524',
      },
    ],
    coords: {
      lat: 59.364487,
      lng: 17.86967,
    },
  },
  {
    id: 'västertorp',
    name: 'Västertorp',
    rawKey: 'Västertorp',
    lines: [14],
    level: -10,
    exits: [
      {
        id: 'västertorp-exit-1',
        name: 'Västertorp Centrum/Störtloppsvägen',
        position: 'up',
        hasElevator: true,
        pos: '59.292101,17.968483',
      },
      {
        id: 'västertorp-exit-2',
        name: 'Västertorpsvägen',
        position: 'down',
        hasElevator: true,
        pos: '59.290414,17.965114',
      },
    ],
    coords: {
      lat: 59.292101,
      lng: 17.968483,
    },
  },
  {
    id: 'västra-skogen',
    name: 'Västra skogen',
    rawKey: 'Västra skogen',
    lines: [10, 11],
    level: 4,
    exits: [
      {
        id: 'västra-skogen-exit-1',
        name: 'Västra skogen centrum (rulltrappor)',
        position: 'down',
        hasElevator: true,
        pos: '59.347617,18.003652',
      },
      {
        id: 'västra-skogen-exit-2',
        name: 'Västra skogen centrum (hiss)',
        position: 'middle',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.347617,
      lng: 18.003652,
    },
  },
  {
    id: 'zinkensdamm',
    name: 'Zinkensdamm',
    rawKey: 'Zinkensdamm',
    lines: [13, 14],
    level: -4,
    exits: [
      {
        id: 'zinkensdamm-exit-1',
        name: 'Zinkensdamm (Hornsgatan/Ringvägen)',
        position: 'middle',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.317778,
      lng: 18.05,
    },
  },
  {
    id: 'åkeshov',
    name: 'Åkeshov',
    rawKey: 'Åkeshov',
    lines: [17, 18, 19],
    level: 12,
    exits: [
      {
        id: 'åkeshov-exit-1',
        name: 'Åkeshovs gårdsväg, Bergslagsvägen',
        position: 'down',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.34194,
      lng: 17.92389,
    },
  },
  {
    id: 'ängbyplan',
    name: 'Ängbyplan',
    rawKey: 'Ängbyplan',
    lines: [17, 18, 19],
    level: 13,
    exits: [
      {
        id: 'ängbyplan-exit-1',
        name: 'Färjestadsvägen',
        position: 'up',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.341889,
      lng: 17.907389,
    },
  },
  {
    id: 'örnsberg',
    name: 'Örnsberg',
    rawKey: 'Örnsberg',
    lines: [13],
    level: -8,
    exits: [
      {
        id: 'örnsberg-exit-1',
        name: 'Örnsbergsvägen',
        position: 'up',
        hasElevator: true,
      },
    ],
    coords: {
      lat: 59.3055,
      lng: 17.989028,
    },
  },
  {
    id: 'östermalmstorg',
    name: 'Östermalmstorg',
    rawKey: 'Östermalmstorg',
    lines: [13, 14],
    level: 1,
    exits: [
      {
        id: 'östermalmstorg-exit-1',
        name: 'Hiss till östermalmstorg',
        position: 'up',
        hasElevator: true,
        pos: '59.336254,18.079033',
      },
      {
        id: 'östermalmstorg-exit-2',
        name: 'Stureplan',
        position: 'down',
        hasElevator: true,
        pos: '59.334858,18.074226',
      },
      {
        id: 'östermalmstorg-exit-3',
        name: 'Östermalmstorg',
        position: 'middle',
        hasElevator: true,
        pos: '59.336254,18.079033',
      },
    ],
    coords: {
      lat: 59.336254,
      lng: 18.079033,
    },
  },
];

export const STATIONS_BY_ID: Record<string, Station> = Object.fromEntries(
  STATIONS.map((station) => [station.id, station]),
);

/**
 * Hjälpfunktion för att hämta station via id eller namn.
 */
export function getStation(idOrName: string): Station | undefined {
  if (!idOrName) return undefined;
  const normalized = idOrName.toLowerCase().trim();
  return (
    STATIONS_BY_ID[normalized] ||
    STATIONS.find(
      (s) =>
        s.id === normalized ||
        s.name.toLowerCase() === normalized ||
        s.name
          .toLowerCase()
          .replace(/\s*\([^)]*\)/g, '')
          .trim() === normalized,
    )
  );
}
