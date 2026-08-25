# @pomgui/json-compress

[bd_npm_shield_url]: http://img.shields.io/npm/v/install-if-needed.svg?style=flat
[bd_npm_url]: http://www.npmjs.org/package/@pomgui/json-compress

[![npm Version][bd_npm_shield_url]][bd_npm_url]

String JSON compressor for big payloads and responses. It does not work with binaries, only rearranges the data in an efficient way.

## Features

- Recognizes ISO dates and compress them as numbers in base 36.
- Recognizes duplicated strings and numbers in the data and also in the keys.
- Transpose array of objects into object of arrays (so the keys are not repeated on each item).

## Benchmark compared with similar tools

<!-- Begin Benchmark -->
The following comparison was made using public JSON files from various data websites, and running the following npm packages: compressed-json, compress-json, jsonpack, @pomgui/json-compress.

| File | compressed-json|compress-json|jsonpack|@pomgui/json-compress|
| --- | --- | --- | --- | --- |
|[data_2mb.json (2-MB)](https://github.com/antonmedv/json-examples/raw/refs/heads/master/data_2mb.json)<br>2,218,242 bytes<br>gzip: 740,226 bytes|1,870,369 bytes<br>84.3%<br>gzip: 725,528 bytes<br>time: 57.29ms|1,833,203 bytes<br>82.6%<br>gzip: 912,127 bytes<br>time: 141.85ms|1,927,888 bytes<br>86.9%<br>gzip: 820,472 bytes<br>time: 83.99ms|⭐ 1,568,261 bytes<br>70.7%<br>gzip: 697,836 bytes<br>time: 111.82ms|
|[data_5mb.json (5-MB)](https://github.com/antonmedv/json-examples/raw/refs/heads/master/data_5mb.json)<br>5,242,257 bytes<br>gzip: 1,652,027 bytes|4,283,949 bytes<br>81.7%<br>gzip: 1,590,545 bytes<br>time: 117.50ms|3,939,106 bytes<br>75.1%<br>gzip: 1,935,512 bytes<br>time: 231.16ms|4,268,684 bytes<br>81.4%<br>gzip: 1,733,453 bytes<br>time: 184.77ms|⭐ 3,587,680 bytes<br>68.4%<br>gzip: 1,480,456 bytes<br>time: 213.78ms|
|[data_50mb.json (50-MB)](https://github.com/antonmedv/json-examples/raw/refs/heads/master/data_50mb.json)<br>52,419,649 bytes<br>gzip: 15,373,343 bytes|40,587,053 bytes<br>77.4%<br>gzip: 14,337,418 bytes<br>time: 1,373.92ms|34,966,751 bytes<br>66.7%<br>gzip: 16,772,444 bytes<br>time: 1,601.41ms|38,731,942 bytes<br>73.9%<br>gzip: 14,907,618 bytes<br>time: 1,528.10ms|⭐ 33,709,686 bytes<br>64.3%<br>gzip: 12,673,559 bytes<br>time: 2,751.71ms|
|[crypto_historical_365days (1-MB)](https://files.jsons.live/crypto_historical_365days/1-level/1-MB/minified.json)<br>1,050,426 bytes<br>gzip: 209,873 bytes|630,749 bytes<br>60.0%<br>gzip: 201,492 bytes<br>time: 23.21ms|532,956 bytes<br>50.7%<br>gzip: 249,746 bytes<br>time: 16.18ms|551,645 bytes<br>52.5%<br>gzip: 223,373 bytes<br>time: 23.76ms|⭐ 499,973 bytes<br>47.6%<br>gzip: 171,847 bytes<br>time: 32.44ms|
|[crypto_historical_365days (10-MB)](https://files.jsons.live/crypto_historical_365days/1-level/10-MB/minified.json)<br>10,230 bytes<br>gzip: 2,212 bytes|6,725 bytes<br>65.7%<br>gzip: 2,233 bytes<br>time: 0.42ms|5,630 bytes<br>55.0%<br>gzip: 2,590 bytes<br>time: 0.28ms|5,671 bytes<br>55.4%<br>gzip: 2,534 bytes<br>time: 0.35ms|⭐ 5,203 bytes<br>50.9%<br>gzip: 2,055 bytes<br>time: 0.34ms|
<!-- End Benchmark -->

Check out the [Benchmark full results](docs/tool_comparison.md).

## Install

```bash
npm i @pomgui/json-compress
```

## Usage

```js
'use strict';

const jsonCompress = require('@pomgui/json-compress');

// Convert json object
const bigJson = {
  /* large API response */
};
const compressed = jsonCompress.compress(bigJson);
const restored = jsonCompress.decompress(compressed);
```

<!-- Begin Example#1 -->
## Compression Example #1
### Input JSON (310 bytes)
```json
{
  "description": "This is example json",
  "entities": [
    {
      "id": 100,
      "name": "Dog",
      "desc": "This is desc of dog",
      "tag": [
        "animal"
      ]
    },
    {
      "id": 101,
      "name": "Cat",
      "desc": "This is desc of cat",
      "tag": [
        "animal"
      ]
    }
  ],
  "notes": [
    "Unique string will be kept as is",
    "Duplicated string will be combined",
    "Duplicated string will be combined"
  ]
}
```
### Compressed JSON (282 bytes)
```json
[
  "$:$Duplicated$string$combined$animal$will$This$example$desc$Unique",
  {
    "description": "§5 is §6 json",
    "entities": {
      "$": 0,
      "id": [
        100,
        101
      ],
      "name": [
        "Dog",
        "Cat"
      ],
      "§7": [
        "§5 is §7 of dog",
        "§5 is §7 of cat"
      ],
      "tag": [
        [
          "§3"
        ],
        [
          "§3"
        ]
      ]
    },
    "notes": [
      "$#",
      "§8 §1 §4 be kept as is",
      "$2$§0 §1 §4 be §2"
    ]
  }
]
```
<!-- End Example#1 -->

<!-- Begin Example#2 -->
## Compression Example #2
### Input JSON (1926 bytes)
```json
{
  "tournaments": [
    {
      "extraPoints": {
        "Jogos": "9§0§",
        "Participação": "3§20§"
      },
      "id": 35,
      "phases": [
        {
          "groupName": "A",
          "phase": 1,
          "clubId": 3,
          "matches": [
            {
              "id": 1,
              "numFrames": 5,
              "details": null,
              "eta": "2025-03-29T12:00:00.000Z",
              "tableNo": 1,
              "clubId": 3,
              "startedAt": "2025-03-29T12:03:38.000Z",
              "endedAt": "2025-03-29T13:04:43.000Z",
              "players": [
                {
                  "pk": 12973,
                  "id": 111,
                  "wins": 3,
                  "wo": false,
                  "points": 3
                },
                {
                  "pk": 12972,
                  "id": 330,
                  "wins": 0,
                  "wo": false,
                  "points": 0
                }
              ],
              "referee": {
                "pk": 12974,
                "id": null,
                "wo": false
              }
            },
            {
              "id": 3,
              "numFrames": 5,
              "details": {
                "winner": {
                  "bonus": 3,
                  "groupPos": 1
                }
              },
              "eta": "2025-03-29T12:00:00.000Z",
              "tableNo": 1,
              "clubId": 3,
              "startedAt": "2025-03-29T13:05:06.000Z",
              "endedAt": "2025-03-29T14:37:25.000Z",
              "players": [
                {
                  "pk": 12978,
                  "id": 111,
                  "wins": 1,
                  "wo": false,
                  "sourceMatchId": 1,
                  "sourceMatchWho": "winner",
                  "points": 1
                },
                {
                  "pk": 12979,
                  "id": 115,
                  "wins": 3,
                  "wo": false,
                  "sourceMatchId": 2,
                  "sourceMatchWho": "winner",
                  "points": 6
                }
              ],
              "referee": {
                "pk": 12980,
                "id": 262,
                "wo": false,
                "sourceMatchId": 2,
                "sourceMatchWho": "loser"
              }
            },
            {
              "id": 5,
              "numFrames": 5,
              "details": {
                "winner": {
                  "groupPos": 2
                }
              },
              "eta": "2025-03-29T12:00:00.000Z",
              "tableNo": 1,
              "clubId": 3,
              "startedAt": "2025-03-29T14:59:10.000Z",
              "endedAt": "2025-03-29T15:50:29.000Z",
              "players": [
                {
                  "pk": 12984,
                  "id": 111,
                  "wins": 3,
                  "wo": false,
                  "sourceMatchId": 3,
                  "sourceMatchWho": "loser",
                  "points": 3
                },
                {
                  "pk": 12985,
                  "id": 330,
                  "wins": 0,
                  "wo": false,
                  "sourceMatchId": 4,
                  "sourceMatchWho": "winner",
                  "points": 0
                }
              ],
              "referee": {
                "pk": 12986,
                "id": 262,
                "wo": false,
                "sourceMatchId": 4,
                "sourceMatchWho": "loser"
              }
            }
          ]
        },
        {
          "groupName": "OITAVAS",
          "phase": 3,
          "clubId": 3,
          "matches": [
            {
              "id": 54,
              "numFrames": 5,
              "details": {
                "winner": {
                  "bonus": 2
                }
              },
              "eta": null,
              "tableNo": null,
              "clubId": 3,
              "startedAt": "2025-03-29T18:01:38.000Z",
              "endedAt": "2025-03-29T20:03:37.000Z",
              "players": [
                {
                  "pk": 13123,
                  "id": 111,
                  "wins": 2,
                  "wo": false,
                  "sourceMatchId": 5,
                  "sourceMatchWho": "winner",
                  "points": 2
                },
                {
                  "pk": 13124,
                  "id": 116,
                  "wins": 3,
                  "wo": false,
                  "sourceMatchId": 23,
                  "sourceMatchWho": "winner",
                  "points": 5
                }
              ],
              "referee": {
                "pk": null,
                "id": null,
                "wo": null
              }
            }
          ]
        }
      ]
    }
  ]
}
```
### Compressed JSON (1231 bytes)
```json
[
  "$:@0$sourceMatchWho$sourceMatchId*$winner$loser$points$clubId$numFrames$startedAt$groupPos$wins$details$tableNo$endedAt$players$referee",
  "$$:m8u5sw00",
  {
    "tournaments": [
      {
        "extraPoints": {
          "Jogos": "9\§0\§",
          "Participação": "3\§20\§"
        },
        "id": 35,
        "phases": {
          "$": 0,
          "groupName": [
            "A",
            "OITAVAS"
          ],
          "phase": [
            1,
            3
          ],
          "§7": [
            3,
            3
          ],
          "matches": [
            {
              "$": 0,
              "id": [
                1,
                3,
                5
              ],
              "§8": [
                5,
                5,
                5
              ],
              "§c": [
                "§3",
                {
                  "§4": {
                    "bonus": 3,
                    "§a": 1
                  }
                },
                {
                  "§4": {
                    "§a": 2
                  }
                }
              ],
              "eta": [
                "$#",
                "$3$§§0"
              ],
              "§d": [
                1,
                1,
                1
              ],
              "§7": [
                3,
                3,
                3
              ],
              "§9": [
                "§§4o7k",
                "§§2bpw0",
                "§§6eer4"
              ],
              "§e": [
                "§§2b854",
                "§§5mft4",
                "§§88eiw"
              ],
              "§f": [
                {
                  "$": 0,
                  "pk": [
                    12973,
                    12972
                  ],
                  "id": [
                    111,
                    330
                  ],
                  "§b": [
                    3,
                    0
                  ],
                  "wo": [
                    "§0",
                    "§0"
                  ],
                  "§6": [
                    3,
                    0
                  ]
                },
                {
                  "$": 0,
                  "pk": [
                    12978,
                    12979
                  ],
                  "id": [
                    111,
                    115
                  ],
                  "§b": [
                    1,
                    3
                  ],
                  "wo": [
                    "§0",
                    "§0"
                  ],
                  "§2": [
                    1,
                    2
                  ],
                  "§1": [
                    "§4",
                    "§4"
                  ],
                  "§6": [
                    1,
                    6
                  ]
                },
                {
                  "$": 0,
                  "pk": [
                    12984,
                    12985
                  ],
                  "id": [
                    111,
                    330
                  ],
                  "§b": [
                    3,
                    0
                  ],
                  "wo": [
                    "§0",
                    "§0"
                  ],
                  "§2": [
                    3,
                    4
                  ],
                  "§1": [
                    "§5",
                    "§4"
                  ],
                  "§6": [
                    3,
                    0
                  ]
                }
              ],
              "§g": [
                {
                  "pk": 12974,
                  "id": "§3",
                  "wo": "§0"
                },
                {
                  "pk": 12980,
                  "id": 262,
                  "wo": "§0",
                  "§2": 2,
                  "§1": "§5"
                },
                {
                  "pk": 12986,
                  "id": 262,
                  "wo": "§0",
                  "§2": 4,
                  "§1": "§5"
                }
              ]
            },
            [
              {
                "id": 54,
                "§8": 5,
                "§c": {
                  "§4": {
                    "bonus": 2
                  }
                },
                "eta": "§3",
                "§d": "§3",
                "§7": 3,
                "§9": "§§cx2a8",
                "§e": "§§h9xns",
                "§f": {
                  "$": 0,
                  "pk": [
                    13123,
                    13124
                  ],
                  "id": [
                    111,
                    116
                  ],
                  "§b": [
                    2,
                    3
                  ],
                  "wo": [
                    "§0",
                    "§0"
                  ],
                  "§2": [
                    5,
                    23
                  ],
                  "§1": [
                    "§4",
                    "§4"
                  ],
                  "§6": [
                    2,
                    5
                  ]
                },
                "§g": {
                  "pk": "§3",
                  "id": "§3",
                  "wo": "§3"
                }
              }
            ]
          ]
        }
      }
    ]
  }
]
```
<!-- End Example#2 -->
