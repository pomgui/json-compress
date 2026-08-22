# @pomgui/json-compress

[bd_npm_shield_url]: http://img.shields.io/npm/v/install-if-needed.svg?style=flat
[bd_npm_url]: http://www.npmjs.org/package/@pomgui/json-compress
[compressed-json]: https://www.npmjs.com/package/compressed-json
[MessagePack]: https://www.npmjs.com/package/msgpackr

[![npm Version][bd_npm_shield_url]][bd_npm_url]

String JSON compressor for big payloads and responses. It does not work with binaries, only rearranges the data in an efficient way.

## Features

- Recognizes ISO dates and compress them as numbers in base 36.
- Recognizes duplicated strings and numbers in the data and also in the keys.
- Transpose array of objects into object of arrays (so the keys are not repeated on each item).

## Compressed size (in bytes) compared with similar tools

Using data from various public JSON data provider sites, a comparison has been made against two widely used tools: [compressed-json] and [MessagePack].

| File                                                                                                                                                     | compressed-json                                                         | compress-json                                                           | jsonpack                                                                | @pomgui/json-compress                                                      |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [data_50mb.json (50-MB)](https://github.com/antonmedv/json-examples/raw/refs/heads/master/data_50mb.json)<br>52,419,649 bytes<br>gzip: 15,373,343 bytes  | 40,587,053 bytes<br>77.4%<br>gzip: 14,337,418 bytes<br>time: 1,435.60ms | 34,966,751 bytes<br>66.7%<br>gzip: 16,772,444 bytes<br>time: 1,690.73ms | 38,731,942 bytes<br>73.9%<br>gzip: 14,907,618 bytes<br>time: 1,423.73ms | ⭐ 34,709,360 bytes<br>66.2%<br>gzip: 12,418,672 bytes<br>time: 1,631.95ms |
| [crypto_historical_365days (10-MB)](https://files.jsons.live/crypto_historical_365days/1-level/10-MB/minified.json)<br>10,230 bytes<br>gzip: 2,212 bytes | 6,725 bytes<br>65.7%<br>gzip: 2,233 bytes<br>time: 0.22ms               | 5,630 bytes<br>55.0%<br>gzip: 2,590 bytes<br>time: 0.29ms               | 5,671 bytes<br>55.4%<br>gzip: 2,534 bytes<br>time: 0.20ms               | ⭐ 4,786 bytes<br>46.8%<br>gzip: 1,982 bytes<br>time: 0.20ms               |
| [data_5mb.json (5-MB)](https://github.com/antonmedv/json-examples/raw/refs/heads/master/data_5mb.json)<br>5,242,257 bytes<br>gzip: 1,652,027 bytes       | 4,283,949 bytes<br>81.7%<br>gzip: 1,590,545 bytes<br>time: 116.51ms     | 3,939,106 bytes<br>75.1%<br>gzip: 1,935,512 bytes<br>time: 234.42ms     | 4,268,684 bytes<br>81.4%<br>gzip: 1,733,453 bytes<br>time: 157.98ms     | ⭐ 3,680,726 bytes<br>70.2%<br>gzip: 1,466,263 bytes<br>time: 136.49ms     |
| [data_2mb.json (2-MB)](https://github.com/antonmedv/json-examples/raw/refs/heads/master/data_2mb.json)<br>2,218,242 bytes<br>gzip: 740,226 bytes         | 1,870,369 bytes<br>84.3%<br>gzip: 725,528 bytes<br>time: 56.94ms        | 1,833,203 bytes<br>82.6%<br>gzip: 912,127 bytes<br>time: 143.44ms       | 1,927,888 bytes<br>86.9%<br>gzip: 820,472 bytes<br>time: 80.73ms        | ⭐ 1,616,222 bytes<br>72.9%<br>gzip: 693,229 bytes<br>time: 55.91ms        |
| [github-key-shortcuts.json (372-KB)](https://www.timestored.com/data/sample/github-key-shortcuts.json)<br>376,775 bytes<br>gzip: 72,459 bytes            | 334,910 bytes<br>88.9%<br>gzip: 71,304 bytes<br>time: 1.88ms            | 327,729 bytes<br>87.0%<br>gzip: 74,040 bytes<br>time: 0.98ms            | 337,533 bytes<br>89.6%<br>gzip: 75,682 bytes<br>time: 4.60ms            | ⭐ 311,525 bytes<br>82.7%<br>gzip: 68,473 bytes<br>time: 7.28ms            |
| [price.json (112-KB)](https://www.timestored.com/data/sample/price.json)<br>111,387 bytes<br>gzip: 20,189 bytes                                          | 87,629 bytes<br>78.7%<br>gzip: 19,813 bytes<br>time: 7.38ms             | 102,956 bytes<br>92.4%<br>gzip: 37,875 bytes<br>time: 4.75ms            | 84,791 bytes<br>76.1%<br>gzip: 31,113 bytes<br>time: 5.33ms             | ⭐ 61,421 bytes<br>55.1%<br>gzip: 18,769 bytes<br>time: 1.57ms             |

Full results can be found [here](docs/tool_comparison.md).

## Install

```bash
npm i @pomgui/json-compress
```

## Usage

```js
'use strict';

const { jsonCompress } = require('@pomgui/json-compress');

// Convert json object
const bigJson = {
  /* huge API response */
};
const compressed = jsonCompress.encode(bigJson);
const restored = jsonCompress.decode(compressed);
```

## Compression Example #1

### Normal JSON (310 bytes)

```json
{
  "description": "This is example json",
  "entities": [
    {
      "id": 100,
      "name": "Dog",
      "desc": "This is desc of dog",
      "tag": ["animal"]
    },
    {
      "id": 101,
      "name": "Cat",
      "desc": "This is desc of cat",
      "tag": ["animal"]
    }
  ],
  "notes": [
    "Unique string will be kept as is",
    "Duplicated string will be combined",
    "Duplicated string will be combined"
  ]
}
```

### Compressed JSON (279 bytes 90%)

```json
{
  "$": ["Duplicated string will be combined", "animal"],
  "d": {
    "description": "This is example json",
    "entities": {
      "$": 0,
      "id": [100, 101],
      "name": ["Dog", "Cat"],
      "desc": ["This is desc of dog", "This is desc of cat"],
      "tag": [["§1"], ["§1"]]
    },
    "notes": ["§", "Unique string will be kept as is", 0, 0]
  }
}
```

## Example #2

### Normal JSON (1926 bytes)

```json
{
  "tournaments": [
    {
      "extraPoints": { "Jogos": "9§0§", "Participação": "3§20§" },
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
                { "pk": 12973, "id": 111, "wins": 3, "wo": false, "points": 3 },
                { "pk": 12972, "id": 330, "wins": 0, "wo": false, "points": 0 }
              ],
              "referee": { "pk": 12974, "id": null, "wo": false }
            },
            {
              "id": 3,
              "numFrames": 5,
              "details": { "winner": { "bonus": 3, "groupPos": 1 } },
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
              "details": { "winner": { "groupPos": 2 } },
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
              "details": { "winner": { "bonus": 2 } },
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
              "referee": { "pk": null, "id": null, "wo": null }
            }
          ]
        }
      ]
    }
  ]
}
```

### Compressed (1265 bytes 65.7%)

```json
{
  "$$": "m8u5sw00",
  "$": [
    "sourceMatchWho",
    "sourceMatchId",
    false,
    "winner",
    null,
    "points",
    "clubId",
    "numFrames",
    "startedAt",
    "groupPos",
    "wins",
    "loser",
    "details",
    "tableNo",
    "endedAt",
    "players",
    "referee",
    "bonus",
    "eta"
  ],
  "d": {
    "tournaments": [
      {
        "extraPoints": { "Jogos": "9§0§", "Participação": "3§20§" },
        "id": 35,
        "phases": {
          "$": 0,
          "groupName": ["A", "OITAVAS"],
          "phase": [1, 3],
          "§6": [3, 3],
          "matches": [
            {
              "$": 0,
              "id": [1, 3, 5],
              "§7": [5, 5, 5],
              "§c": [
                "§4",
                { "§3": { "§h": 3, "§9": 1 } },
                { "§3": { "§9": 2 } }
              ],
              "§i": ["§§0", "§§0", "§§0"],
              "§d": [1, 1, 1],
              "§6": [3, 3, 3],
              "§8": ["§§4o7k", "§§2bpw0", "§§6eer4"],
              "§e": ["§§2b854", "§§5mft4", "§§88eiw"],
              "§f": [
                {
                  "$": 0,
                  "pk": [12973, 12972],
                  "id": [111, 330],
                  "§a": [3, 0],
                  "wo": ["§", 2, 2],
                  "§5": [3, 0]
                },
                {
                  "$": 0,
                  "pk": [12978, 12979],
                  "id": [111, 115],
                  "§a": [1, 3],
                  "wo": ["§", 2, 2],
                  "§1": [1, 2],
                  "§0": ["§", 3, 3],
                  "§5": [1, 6]
                },
                {
                  "$": 0,
                  "pk": [12984, 12985],
                  "id": [111, 330],
                  "§a": [3, 0],
                  "wo": ["§", 2, 2],
                  "§1": [3, 4],
                  "§0": ["§", 11, 3],
                  "§5": [3, 0]
                }
              ],
              "§g": [
                { "pk": 12974, "id": "§4", "wo": "§2" },
                { "pk": 12980, "id": 262, "wo": "§2", "§1": 2, "§0": "§b" },
                { "pk": 12986, "id": 262, "wo": "§2", "§1": 4, "§0": "§b" }
              ]
            },
            [
              {
                "id": 54,
                "§7": 5,
                "§c": { "§3": { "§h": 2 } },
                "§i": "§4",
                "§d": "§4",
                "§6": 3,
                "§8": "§§cx2a8",
                "§e": "§§h9xns",
                "§f": {
                  "$": 0,
                  "pk": [13123, 13124],
                  "id": [111, 116],
                  "§a": [2, 3],
                  "wo": ["§", 2, 2],
                  "§1": [5, 23],
                  "§0": ["§", 3, 3],
                  "§5": [2, 5]
                },
                "§g": { "pk": "§4", "id": "§4", "wo": "§4" }
              }
            ]
          ]
        }
      }
    ]
  }
}
```
