module.exports.testData = [
    {
        in: {
            tournaments:
                [{
                    extraPoints: { Jogos: '9§0§', Participação: '3§20§' }, id: 35,
                    phases: [
                        {
                            groupName: 'A', phase: 1, clubId: 3,
                            matches: [
                                {
                                    id: 1, numFrames: 5, details: null, eta: '2025-03-29T12:00:00.000Z',
                                    tableNo: 1, clubId: 3, startedAt: '2025-03-29T12:03:38.000Z', endedAt: '2025-03-29T13:04:43.000Z',
                                    players: [
                                        { pk: 12973, id: 111, wins: 3, wo: false, points: 3 },
                                        { pk: 12972, id: 330, wins: 0, wo: false, points: 0 }
                                    ],
                                    referee: { pk: 12974, id: null, wo: false }
                                },
                                {
                                    id: 3, numFrames: 5, details: { winner: { bonus: 3, groupPos: 1 } }, eta: '2025-03-29T12:00:00.000Z',
                                    tableNo: 1, clubId: 3, startedAt: '2025-03-29T13:05:06.000Z', endedAt: '2025-03-29T14:37:25.000Z',
                                    players: [
                                        { pk: 12978, id: 111, wins: 1, wo: false, sourceMatchId: 1, sourceMatchWho: 'winner', points: 1 },
                                        { pk: 12979, id: 115, wins: 3, wo: false, sourceMatchId: 2, sourceMatchWho: 'winner', points: 6 }
                                    ],
                                    referee: { pk: 12980, id: 262, wo: false, sourceMatchId: 2, sourceMatchWho: 'loser' }
                                },
                                {
                                    id: 5, numFrames: 5, details: { winner: { groupPos: 2 } }, eta: '2025-03-29T12:00:00.000Z',
                                    tableNo: 1, clubId: 3, startedAt: '2025-03-29T14:59:10.000Z', endedAt: '2025-03-29T15:50:29.000Z',
                                    players: [
                                        { pk: 12984, id: 111, wins: 3, wo: false, sourceMatchId: 3, sourceMatchWho: 'loser', points: 3 },
                                        { pk: 12985, id: 330, wins: 0, wo: false, sourceMatchId: 4, sourceMatchWho: 'winner', points: 0 }], referee:
                                        { pk: 12986, id: 262, wo: false, sourceMatchId: 4, sourceMatchWho: 'loser' }
                                }]
                        },
                        {
                            groupName: 'OITAVAS', phase: 3, clubId: 3,
                            matches: [
                                {
                                    id: 54, numFrames: 5, details: { winner: { bonus: 2 } }, eta: null,
                                    tableNo: null, clubId: 3, startedAt: '2025-03-29T18:01:38.000Z', endedAt: '2025-03-29T20:03:37.000Z',
                                    players: [
                                        { pk: 13123, id: 111, wins: 2, wo: false, sourceMatchId: 5, sourceMatchWho: 'winner', points: 2 },
                                        { pk: 13124, id: 116, wins: 3, wo: false, sourceMatchId: 23, sourceMatchWho: 'winner', points: 5 }
                                    ],
                                    referee: { pk: null, id: null, wo: null }
                                }]
                        }]
                }]
        },
        out: { "$$": "m8u5sw00", "$": ["sourceMatchWho", "sourceMatchId", false, "winner", "points", "clubId", "numFrames", "startedAt", "groupPos", "wins", "loser", "details", "tableNo", "endedAt", "players", "referee", "bonus", "eta"], "d": { "tournaments": [{ "extraPoints": { "Jogos": "9§0§", "Participação": "3§20§" }, "id": 35, "phases": { "$": 0, "groupName": ["A", "OITAVAS"], "phase": [1, 3], "§5": [3, 3], "matches": [{ "$": 0, "id": [1, 3, 5], "§6": [5, 5, 5], "§b": [null, { "§3": { "§g": 3, "§8": 1 } }, { "§3": { "§8": 2 } }], "§h": ["§§0", "§§0", "§§0"], "§c": [1, 1, 1], "§5": [3, 3, 3], "§7": ["§§4o7k", "§§2bpw0", "§§6eer4"], "§d": ["§§2b854", "§§5mft4", "§§88eiw"], "§e": [{ "$": 0, "pk": [12973, 12972], "id": [111, 330], "§9": [3, 0], "wo": ["§2", "§2"], "§4": [3, 0] }, { "$": 0, "pk": [12978, 12979], "id": [111, 115], "§9": [1, 3], "wo": ["§2", "§2"], "§1": [1, 2], "§0": ["§3", "§3"], "§4": [1, 6] }, { "$": 0, "pk": [12984, 12985], "id": [111, 330], "§9": [3, 0], "wo": ["§2", "§2"], "§1": [3, 4], "§0": ["§a", "§3"], "§4": [3, 0] }], "§f": [{ "pk": 12974, "id": null, "wo": "§2" }, { "pk": 12980, "id": 262, "wo": "§2", "§1": 2, "§0": "§a" }, { "pk": 12986, "id": 262, "wo": "§2", "§1": 4, "§0": "§a" }] }, [{ "id": 54, "§6": 5, "§b": { "§3": { "§g": 2 } }, "§h": null, "§c": null, "§5": 3, "§7": "§§cx2a8", "§d": "§§h9xns", "§e": { "$": 0, "pk": [13123, 13124], "id": [111, 116], "§9": [2, 3], "wo": ["§2", "§2"], "§1": [5, 23], "§0": ["§3", "§3"], "§4": [2, 5] }, "§f": { "pk": null, "id": null, "wo": null } }]] } }] } }
    },
    {
        in: {
            "rows": [{
                "tournamentId": 38,
                "playerId": 111,
                "createdAt": "2025-04-03T14:29:46.286Z"
            },
            {
                "tournamentId": 38,
                "playerId": 262,
                "createdAt": "2025-04-04T17:29:29.472Z"
            }, { "tournamentId": 37, "playerId": 15, "createdAt": "2025-04-04T17:29:43.095Z" }, { "tournamentId": 38, "playerId": 21, "createdAt": "2025-04-04T17:30:04.695Z" }, { "tournamentId": 37, "playerId": 77, "createdAt": "2025-04-04T17:30:50.076Z" }, { "tournamentId": 38, "playerId": 275, "createdAt": "2025-04-04T17:32:24.081Z" }, { "tournamentId": 38, "playerId": 414, "createdAt": "2025-04-04T17:33:19.122Z" }, { "tournamentId": 38, "playerId": 267, "createdAt": "2025-04-04T17:36:26.493Z" }, { "tournamentId": 38, "playerId": 260, "createdAt": "2025-04-04T17:45:07.497Z" }, { "tournamentId": 37, "playerId": 58, "createdAt": "2025-04-04T17:45:27.676Z" }, { "tournamentId": 38, "playerId": 226, "createdAt": "2025-04-04T17:59:27.182Z" }, { "tournamentId": 38, "playerId": 397, "createdAt": "2025-04-04T18:07:37.136Z" }, { "tournamentId": 37, "playerId": 101, "createdAt": "2025-04-04T18:20:52.113Z" }, { "tournamentId": 38, "playerId": 24, "createdAt": "2025-04-04T18:22:22.254Z" }, { "tournamentId": 37, "playerId": 69, "createdAt": "2025-04-04T18:27:44.746Z" }, { "tournamentId": 38, "playerId": 330, "createdAt": "2025-04-04T18:30:36.329Z" }, { "tournamentId": 38, "playerId": 412, "createdAt": "2025-04-04T19:26:22.304Z" }, { "tournamentId": 37, "playerId": 221, "createdAt": "2025-04-04T20:10:41.953Z" }, { "tournamentId": 37, "playerId": 270, "createdAt": "2025-04-05T00:23:48.285Z" }, { "tournamentId": 38, "playerId": 116, "createdAt": "2025-04-05T00:27:01.903Z" }, { "tournamentId": 37, "playerId": 25, "createdAt": "2025-04-05T09:21:55.739Z" }, { "tournamentId": 38, "playerId": 334, "createdAt": "2025-04-05T12:00:40.912Z" }, { "tournamentId": 37, "playerId": 259, "createdAt": "2025-04-06T13:22:39.810Z" }, { "tournamentId": 38, "playerId": 55, "createdAt": "2025-04-06T14:26:50.207Z" }]
        },
        out: {"$$":"m91gcr72","d":{"rows":{"$":0,"tournamentId":[38,38,37,38,37,38,38,38,38,37,38,38,37,38,37,38,38,37,37,38,37,38,37,38],"playerId":[111,262,15,21,77,275,414,267,260,58,226,397,101,24,69,330,412,221,270,116,25,334,259,55],"createdAt":["§§0","§§1luz0y","§§1lv9jd","§§1lvq7d","§§1lwp7y","§§1lypr7","§§1lzw84","§§1m3wsv","§§1mf2t7","§§1mfidq","§§1mxi5c","§§1n8076","§§1np1lv","§§1nqz5s","§§1nxvzw","§§1o1ke3","§§1q1a5u","§§1rmacz","§§20ns7j","§§20rxlt","§§2jvtd9","§§2pjz1e","§§47x95g","§§4a7s4x"]}}}
    },
    {
        in: {"rows":[{"id":212,"name":"Rafael (SC)","categoryId":3,"alias":"Rafael (SC)","clubId":null,"cityId":23,"status":"inactive","imgId":208,"suspended":null,"isVirtual":false},{"id":421,"name":"Paulo Roberto Volpe ","categoryId":2,"alias":"Tuta","clubId":30,"cityId":18,"status":"active","imgId":339,"suspended":null,"isVirtual":false},{"id":282,"name":"Alex Sandro Fernando Do Prado ","categoryId":2,"alias":"Coco","clubId":27,"cityId":10,"status":"active","imgId":307,"suspended":null,"isVirtual":false},{"id":412,"name":"Uidas Almeida De Oliveira ","categoryId":2,"alias":"Uidas ","clubId":2,"cityId":4,"status":"active","imgId":322,"suspended":null,"isVirtual":false},{"id":293,"name":"Aparecido Jose Di Santo","categoryId":1,"alias":"Zé Do Dito","clubId":7,"cityId":36,"status":"active","imgId":297,"suspended":null,"isVirtual":false},{"id":330,"name":"Mario Dalfre Junior","categoryId":2,"alias":"Dalfre ","clubId":26,"cityId":14,"status":"active","imgId":324,"suspended":null,"isVirtual":false},{"id":334,"name":"Diego Ramos Valerio","categoryId":2,"alias":"Ramos","clubId":17,"cityId":37,"status":"active","imgId":306,"suspended":null,"isVirtual":false},{"id":471,"name":"Kellerman Jurasseche","categoryId":3,"alias":"Magrao","clubId":null,"cityId":38,"status":"active","imgId":329,"suspended":"","isVirtual":false},{"id":63,"name":"Rodrigo Marchiori Mazak ","categoryId":2,"alias":"Mazak","clubId":26,"cityId":23,"status":"active","imgId":249,"suspended":null,"isVirtual":false},{"id":207,"name":"Marco (SC)","categoryId":3,"alias":"Marco (SC)","clubId":null,"cityId":23,"status":"inactive","imgId":0,"suspended":null,"isVirtual":false}]},
        out: {"$":[false,"active","Rafael (SC)","Marco (SC)","inactive"],"d":{"rows":{"$":0,"id":[212,421,282,412,293,330,334,471,63,207],"name":["§2","Paulo Roberto Volpe ","Alex Sandro Fernando Do Prado ","Uidas Almeida De Oliveira ","Aparecido Jose Di Santo","Mario Dalfre Junior","Diego Ramos Valerio","Kellerman Jurasseche","Rodrigo Marchiori Mazak ","§3"],"categoryId":[3,2,2,2,1,2,2,3,2,3],"alias":["§2","Tuta","Coco","Uidas ","Zé Do Dito","Dalfre ","Ramos","Magrao","Mazak","§3"],"clubId":[null,30,27,2,7,26,17,null,26,null],"cityId":[23,18,10,4,36,14,37,38,23,23],"status":["§4","§1","§1","§1","§1","§1","§1","§1","§1","§4"],"imgId":[208,339,307,322,297,324,306,329,249,0],"suspended":[null,null,null,null,null,null,null,"",null,null],"isVirtual":["§0","§0","§0","§0","§0","§0","§0","§0","§0","§0"]}}}
    }
];