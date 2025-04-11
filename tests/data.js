module.exports.testData = [
    {
        name: 'Simple array', 
        in: [{
                id: 1,
                name: 'name1'
            }, {
                id: 2,
                name: 'name2'
            }],
        out: {
            d: {
                $: 0,
                id: [1, 2],
                name: ['name1', 'name2']
            }
        }
    },
    {
        name: 'players/id/tournaments',
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
        out: {"$$":"m8u5sw00","$":["sourceMatchWho","sourceMatchId",false,"winner",null,"points","clubId","numFrames","startedAt","groupPos","wins","loser","details","tableNo","endedAt","players","referee","bonus","eta"],"d":{"tournaments":[{"extraPoints":{"Jogos":"9§0§","Participação":"3§20§"},"id":35,"phases":{"$":0,"groupName":["A","OITAVAS"],"phase":[1,3],"§6":[3,3],"matches":[{"$":0,"id":[1,3,5],"§7":[5,5,5],"§c":["§4",{"§3":{"§h":3,"§9":1}},{"§3":{"§9":2}}],"§i":["§§0","§§0","§§0"],"§d":[1,1,1],"§6":[3,3,3],"§8":["§§4o7k","§§2bpw0","§§6eer4"],"§e":["§§2b854","§§5mft4","§§88eiw"],"§f":[{"$":0,"pk":[12973,12972],"id":[111,330],"§a":[3,0],"wo":["§",2,2],"§5":[3,0]},{"$":0,"pk":[12978,12979],"id":[111,115],"§a":[1,3],"wo":["§",2,2],"§1":[1,2],"§0":["§",3,3],"§5":[1,6]},{"$":0,"pk":[12984,12985],"id":[111,330],"§a":[3,0],"wo":["§",2,2],"§1":[3,4],"§0":["§",11,3],"§5":[3,0]}],"§g":[{"pk":12974,"id":"§4","wo":"§2"},{"pk":12980,"id":262,"wo":"§2","§1":2,"§0":"§b"},{"pk":12986,"id":262,"wo":"§2","§1":4,"§0":"§b"}]},[{"id":54,"§7":5,"§c":{"§3":{"§h":2}},"§i":"§4","§d":"§4","§6":3,"§8":"§§cx2a8","§e":"§§h9xns","§f":{"$":0,"pk":[13123,13124],"id":[111,116],"§a":[2,3],"wo":["§",2,2],"§1":[5,23],"§0":["§",3,3],"§5":[2,5]},"§g":{"pk":"§4","id":"§4","wo":"§4"}}]]}}]}}
    },
    {
        name: 'tournaments/id/players',
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
        name: 'v_players',
        in: {"rows":[{"id":212,"name":"Rafael (SC)","categoryId":3,"alias":"Rafael (SC)","clubId":null,"cityId":23,"status":"inactive","imgId":208,"suspended":null,"isVirtual":false},{"id":421,"name":"Paulo Roberto Volpe ","categoryId":2,"alias":"Tuta","clubId":30,"cityId":18,"status":"active","imgId":339,"suspended":null,"isVirtual":false},{"id":282,"name":"Alex Sandro Fernando Do Prado ","categoryId":2,"alias":"Coco","clubId":27,"cityId":10,"status":"active","imgId":307,"suspended":null,"isVirtual":false},{"id":412,"name":"Uidas Almeida De Oliveira ","categoryId":2,"alias":"Uidas ","clubId":2,"cityId":4,"status":"active","imgId":322,"suspended":null,"isVirtual":false},{"id":293,"name":"Aparecido Jose Di Santo","categoryId":1,"alias":"Zé Do Dito","clubId":7,"cityId":36,"status":"active","imgId":297,"suspended":null,"isVirtual":false},{"id":330,"name":"Mario Dalfre Junior","categoryId":2,"alias":"Dalfre ","clubId":26,"cityId":14,"status":"active","imgId":324,"suspended":null,"isVirtual":false},{"id":334,"name":"Diego Ramos Valerio","categoryId":2,"alias":"Ramos","clubId":17,"cityId":37,"status":"active","imgId":306,"suspended":null,"isVirtual":false},{"id":471,"name":"Kellerman Jurasseche","categoryId":3,"alias":"Magrao","clubId":null,"cityId":38,"status":"active","imgId":329,"suspended":"","isVirtual":false},{"id":63,"name":"Rodrigo Marchiori Mazak ","categoryId":2,"alias":"Mazak","clubId":26,"cityId":23,"status":"active","imgId":249,"suspended":null,"isVirtual":false},{"id":207,"name":"Marco (SC)","categoryId":3,"alias":"Marco (SC)","clubId":null,"cityId":23,"status":"inactive","imgId":0,"suspended":null,"isVirtual":false}]},
        out: {"$":[false,null,"active","Rafael (SC)","Marco (SC)","inactive"],"d":{"rows":{"$":0,"id":[212,421,282,412,293,330,334,471,63,207],"name":["§",3,"Paulo Roberto Volpe ","Alex Sandro Fernando Do Prado ","Uidas Almeida De Oliveira ","Aparecido Jose Di Santo","Mario Dalfre Junior","Diego Ramos Valerio","Kellerman Jurasseche","Rodrigo Marchiori Mazak ",4],"categoryId":[3,2,2,2,1,2,2,3,2,3],"alias":["§",3,"Tuta","Coco","Uidas ","Zé Do Dito","Dalfre ","Ramos","Magrao","Mazak",4],"clubId":["§1",30,27,2,7,26,17,"§1",26,"§1"],"cityId":[23,18,10,4,36,14,37,38,23,23],"status":["§",5,2,2,2,2,2,2,2,2,5],"imgId":[208,339,307,322,297,324,306,329,249,0],"suspended":["§",1,1,1,1,1,1,1,"",1,1],"isVirtual":["§",0,0,0,0,0,0,0,0,0,0]}}}
    }, {
        name: 'tournaments/i/matches',
        in: {"tournaments":[{"winners":[],"id":38,"phases":[{"groupName":"A","phase":1,"clubId":20,"matches":[{"id":1,"numFrames":5,"details":null,"eta":"2025-04-26T12:00:00.000Z","tableNo":1,"clubId":20,"startedAt":null,"endedAt":null,"players":[{"pk":14499,"id":412,"wins":0,"wo":false,"points":0},{"pk":14500,"id":334,"wins":0,"wo":false,"points":0}],"referee":{"pk":14501,"id":21,"wo":false}},{"id":2,"numFrames":5,"details":null,"eta":"2025-04-26T12:00:00.000Z","tableNo":1,"clubId":20,"startedAt":null,"endedAt":null,"players":[{"pk":14502,"id":21,"wins":0,"wo":false,"points":0},{"pk":14503,"id":111,"wins":0,"wo":false,"points":0}],"referee":{"pk":14504,"id":null,"wo":false,"sourceMatchId":1,"sourceMatchWho":"loser"}},{"id":3,"numFrames":5,"details":{"winner":{"bonus":3,"groupPos":1}},"eta":"2025-04-26T12:00:00.000Z","tableNo":1,"clubId":20,"startedAt":null,"endedAt":null,"players":[{"pk":14505,"id":null,"wins":0,"wo":false,"sourceMatchId":1,"sourceMatchWho":"winner","points":0},{"pk":14506,"id":null,"wins":0,"wo":false,"sourceMatchId":2,"sourceMatchWho":"winner","points":0}],"referee":{"pk":14507,"id":null,"wo":false,"sourceMatchId":2,"sourceMatchWho":"loser"}},{"id":4,"numFrames":5,"details":null,"eta":"2025-04-26T12:00:00.000Z","tableNo":1,"clubId":20,"startedAt":null,"endedAt":null,"players":[{"pk":14508,"id":null,"wins":0,"wo":false,"sourceMatchId":1,"sourceMatchWho":"loser","points":0},{"pk":14509,"id":null,"wins":0,"wo":false,"sourceMatchId":2,"sourceMatchWho":"loser","points":0}],"referee":{"pk":14510,"id":null,"wo":false,"sourceMatchId":3,"sourceMatchWho":"winner"}},{"id":5,"numFrames":5,"details":{"winner":{"groupPos":2}},"eta":"2025-04-26T12:00:00.000Z","tableNo":1,"clubId":20,"startedAt":null,"endedAt":null,"players":[{"pk":14511,"id":null,"wins":0,"wo":false,"sourceMatchId":3,"sourceMatchWho":"loser","points":0},{"pk":14512,"id":null,"wins":0,"wo":false,"sourceMatchId":4,"sourceMatchWho":"winner","points":0}],"referee":{"pk":14513,"id":null,"wo":false,"sourceMatchId":4,"sourceMatchWho":"loser"}}]},{"groupName":"B","phase":1,"clubId":20,"matches":[{"id":6,"numFrames":5,"details":null,"eta":"2025-04-26T12:00:00.000Z","tableNo":2,"clubId":20,"startedAt":null,"endedAt":null,"players":[{"pk":14514,"id":330,"wins":0,"wo":false,"points":0},{"pk":14515,"id":55,"wins":0,"wo":false,"points":0}],"referee":{"pk":14516,"id":226,"wo":false}},{"id":7,"numFrames":5,"details":null,"eta":"2025-04-26T12:00:00.000Z","tableNo":2,"clubId":20,"startedAt":null,"endedAt":null,"players":[{"pk":14517,"id":226,"wins":0,"wo":false,"points":0},{"pk":14518,"id":414,"wins":0,"wo":false,"points":0}],"referee":{"pk":14519,"id":null,"wo":false,"sourceMatchId":6,"sourceMatchWho":"loser"}},{"id":8,"numFrames":5,"details":{"winner":{"bonus":3,"groupPos":1}},"eta":"2025-04-26T12:00:00.000Z","tableNo":2,"clubId":20,"startedAt":null,"endedAt":null,"players":[{"pk":14520,"id":null,"wins":0,"wo":false,"sourceMatchId":6,"sourceMatchWho":"winner","points":0},{"pk":14521,"id":null,"wins":0,"wo":false,"sourceMatchId":7,"sourceMatchWho":"winner","points":0}],"referee":{"pk":14522,"id":null,"wo":false,"sourceMatchId":7,"sourceMatchWho":"loser"}},{"id":9,"numFrames":5,"details":null,"eta":"2025-04-26T12:00:00.000Z","tableNo":2,"clubId":20,"startedAt":null,"endedAt":null,"players":[{"pk":14523,"id":null,"wins":0,"wo":false,"sourceMatchId":6,"sourceMatchWho":"loser","points":0},{"pk":14524,"id":null,"wins":0,"wo":false,"sourceMatchId":7,"sourceMatchWho":"loser","points":0}],"referee":{"pk":14525,"id":null,"wo":false,"sourceMatchId":8,"sourceMatchWho":"winner"}},{"id":10,"numFrames":5,"details":{"winner":{"groupPos":2}},"eta":"2025-04-26T12:00:00.000Z","tableNo":2,"clubId":20,"startedAt":null,"endedAt":null,"players":[{"pk":14526,"id":null,"wins":0,"wo":false,"sourceMatchId":8,"sourceMatchWho":"loser","points":0},{"pk":14527,"id":null,"wins":0,"wo":false,"sourceMatchId":9,"sourceMatchWho":"winner","points":0}],"referee":{"pk":14528,"id":null,"wo":false,"sourceMatchId":9,"sourceMatchWho":"loser"}}]},{"groupName":"C","phase":1,"clubId":26,"matches":[{"id":11,"numFrames":5,"details":null,"eta":"2025-04-26T12:00:00.000Z","tableNo":3,"clubId":26,"startedAt":null,"endedAt":null,"players":[{"pk":14529,"id":116,"wins":0,"wo":false,"points":0},{"pk":14530,"id":24,"wins":0,"wo":false,"points":0}],"referee":{"pk":14531,"id":262,"wo":false}},{"id":12,"numFrames":5,"details":null,"eta":"2025-04-26T12:00:00.000Z","tableNo":3,"clubId":26,"startedAt":null,"endedAt":null,"players":[{"pk":14532,"id":262,"wins":0,"wo":false,"points":0},{"pk":14533,"id":267,"wins":0,"wo":false,"points":0}],"referee":{"pk":14534,"id":null,"wo":false,"sourceMatchId":11,"sourceMatchWho":"loser"}},{"id":13,"numFrames":5,"details":{"winner":{"bonus":3,"groupPos":1}},"eta":"2025-04-26T12:00:00.000Z","tableNo":3,"clubId":26,"startedAt":null,"endedAt":null,"players":[{"pk":14535,"id":null,"wins":0,"wo":false,"sourceMatchId":11,"sourceMatchWho":"winner","points":0},{"pk":14536,"id":null,"wins":0,"wo":false,"sourceMatchId":12,"sourceMatchWho":"winner","points":0}],"referee":{"pk":14537,"id":null,"wo":false,"sourceMatchId":12,"sourceMatchWho":"loser"}},{"id":14,"numFrames":5,"details":null,"eta":"2025-04-26T12:00:00.000Z","tableNo":3,"clubId":26,"startedAt":null,"endedAt":null,"players":[{"pk":14538,"id":null,"wins":0,"wo":false,"sourceMatchId":11,"sourceMatchWho":"loser","points":0},{"pk":14539,"id":null,"wins":0,"wo":false,"sourceMatchId":12,"sourceMatchWho":"loser","points":0}],"referee":{"pk":14540,"id":null,"wo":false,"sourceMatchId":13,"sourceMatchWho":"winner"}},{"id":15,"numFrames":5,"details":{"winner":{"groupPos":2}},"eta":"2025-04-26T12:00:00.000Z","tableNo":3,"clubId":26,"startedAt":null,"endedAt":null,"players":[{"pk":14541,"id":null,"wins":0,"wo":false,"sourceMatchId":13,"sourceMatchWho":"loser","points":0},{"pk":14542,"id":null,"wins":0,"wo":false,"sourceMatchId":14,"sourceMatchWho":"winner","points":0}],"referee":{"pk":14543,"id":null,"wo":false,"sourceMatchId":14,"sourceMatchWho":"loser"}}]},{"groupName":"D","phase":1,"clubId":26,"matches":[{"id":16,"numFrames":5,"details":null,"eta":"2025-04-26T12:00:00.000Z","tableNo":4,"clubId":26,"startedAt":null,"endedAt":null,"players":[{"pk":14544,"id":260,"wins":0,"wo":false,"points":0},{"pk":14545,"id":397,"wins":0,"wo":false,"points":0}],"referee":{"pk":14546,"id":275,"wo":false}},{"id":17,"numFrames":5,"details":null,"eta":"2025-04-26T12:00:00.000Z","tableNo":4,"clubId":26,"startedAt":null,"endedAt":null,"players":[{"pk":14547,"id":275,"wins":0,"wo":false,"points":0},{"pk":14548,"id":null,"wins":0,"wo":false,"points":0}],"referee":{"pk":14549,"id":null,"wo":false,"sourceMatchId":16,"sourceMatchWho":"loser"}},{"id":18,"numFrames":5,"details":{"winner":{"bonus":3,"groupPos":1}},"eta":"2025-04-26T12:00:00.000Z","tableNo":4,"clubId":26,"startedAt":null,"endedAt":null,"players":[{"pk":14550,"id":null,"wins":0,"wo":false,"sourceMatchId":16,"sourceMatchWho":"winner","points":0},{"pk":14551,"id":null,"wins":0,"wo":false,"sourceMatchId":17,"sourceMatchWho":"winner","points":0}],"referee":{"pk":14552,"id":null,"wo":false,"sourceMatchId":17,"sourceMatchWho":"loser"}},{"id":19,"numFrames":5,"details":null,"eta":"2025-04-26T12:00:00.000Z","tableNo":4,"clubId":26,"startedAt":null,"endedAt":null,"players":[{"pk":14553,"id":null,"wins":0,"wo":false,"sourceMatchId":16,"sourceMatchWho":"loser","points":0},{"pk":14554,"id":null,"wins":0,"wo":false,"sourceMatchId":17,"sourceMatchWho":"loser","points":0}],"referee":{"pk":14555,"id":null,"wo":false,"sourceMatchId":18,"sourceMatchWho":"winner"}},{"id":20,"numFrames":5,"details":{"winner":{"groupPos":2}},"eta":"2025-04-26T12:00:00.000Z","tableNo":4,"clubId":26,"startedAt":null,"endedAt":null,"players":[{"pk":14556,"id":null,"wins":0,"wo":false,"sourceMatchId":18,"sourceMatchWho":"loser","points":0},{"pk":14557,"id":null,"wins":0,"wo":false,"sourceMatchId":19,"sourceMatchWho":"winner","points":0}],"referee":{"pk":14558,"id":null,"wo":false,"sourceMatchId":19,"sourceMatchWho":"loser"}}]},{"groupName":"QUARTAS","phase":2,"clubId":20,"matches":[{"id":21,"numFrames":5,"details":{"winner":{"bonus":2}},"eta":null,"tableNo":null,"clubId":20,"startedAt":null,"endedAt":null,"players":[{"pk":14559,"id":null,"wins":0,"wo":false,"sourceMatchId":8,"sourceMatchWho":"winner","points":0},{"pk":14560,"id":null,"wins":0,"wo":false,"sourceMatchId":20,"sourceMatchWho":"winner","points":0}],"referee":{"pk":null,"id":null,"wo":null}},{"id":22,"numFrames":5,"details":{"winner":{"bonus":2}},"eta":null,"tableNo":null,"clubId":20,"startedAt":null,"endedAt":null,"players":[{"pk":14561,"id":null,"wins":0,"wo":false,"sourceMatchId":18,"sourceMatchWho":"winner","points":0},{"pk":14562,"id":null,"wins":0,"wo":false,"sourceMatchId":10,"sourceMatchWho":"winner","points":0}],"referee":{"pk":null,"id":null,"wo":null}},{"id":23,"numFrames":5,"details":{"winner":{"bonus":2}},"eta":null,"tableNo":null,"clubId":20,"startedAt":null,"endedAt":null,"players":[{"pk":14563,"id":null,"wins":0,"wo":false,"sourceMatchId":3,"sourceMatchWho":"winner","points":0},{"pk":14564,"id":null,"wins":0,"wo":false,"sourceMatchId":15,"sourceMatchWho":"winner","points":0}],"referee":{"pk":null,"id":null,"wo":null}},{"id":24,"numFrames":5,"details":{"winner":{"bonus":2}},"eta":null,"tableNo":null,"clubId":20,"startedAt":null,"endedAt":null,"players":[{"pk":14565,"id":null,"wins":0,"wo":false,"sourceMatchId":13,"sourceMatchWho":"winner","points":0},{"pk":14566,"id":null,"wins":0,"wo":false,"sourceMatchId":5,"sourceMatchWho":"winner","points":0}],"referee":{"pk":null,"id":null,"wo":null}}]},{"groupName":"SEMI-FINAIS","phase":3,"clubId":20,"matches":[{"id":25,"numFrames":5,"details":{"winner":{"bonus":2}},"eta":null,"tableNo":null,"clubId":20,"startedAt":null,"endedAt":null,"players":[{"pk":14567,"id":null,"wins":0,"wo":false,"sourceMatchId":22,"sourceMatchWho":"winner","points":0},{"pk":14568,"id":null,"wins":0,"wo":false,"sourceMatchId":24,"sourceMatchWho":"winner","points":0}],"referee":{"pk":null,"id":null,"wo":null}},{"id":26,"numFrames":5,"details":{"winner":{"bonus":2}},"eta":null,"tableNo":null,"clubId":20,"startedAt":null,"endedAt":null,"players":[{"pk":14569,"id":null,"wins":0,"wo":false,"sourceMatchId":21,"sourceMatchWho":"winner","points":0},{"pk":14570,"id":null,"wins":0,"wo":false,"sourceMatchId":23,"sourceMatchWho":"winner","points":0}],"referee":{"pk":null,"id":null,"wo":null}}]},{"groupName":"FINAL","phase":4,"clubId":20,"matches":[{"id":27,"numFrames":5,"details":{"loser":{"finalPos":2},"winner":{"bonus":3,"finalPos":1}},"eta":null,"tableNo":null,"clubId":20,"startedAt":null,"endedAt":null,"players":[{"pk":14571,"id":null,"wins":0,"wo":false,"sourceMatchId":25,"sourceMatchWho":"winner","points":0},{"pk":14572,"id":null,"wins":0,"wo":false,"sourceMatchId":26,"sourceMatchWho":"winner","points":0}],"referee":{"pk":null,"id":null,"wo":null}}]},{"groupName":"TERCEIRO","phase":4,"clubId":20,"matches":[{"id":28,"numFrames":5,"details":{"loser":{"finalPos":4},"winner":{"bonus":1,"finalPos":3}},"eta":null,"tableNo":null,"clubId":20,"startedAt":null,"endedAt":null,"players":[{"pk":14573,"id":null,"wins":0,"wo":false,"sourceMatchId":25,"sourceMatchWho":"loser","points":0},{"pk":14574,"id":null,"wins":0,"wo":false,"sourceMatchId":26,"sourceMatchWho":"loser","points":0}],"referee":{"pk":null,"id":null,"wo":null}}]}]}]},
        out:{"$$":"m9y64qo0","$":[null,"sourceMatchWho","sourceMatchId",false,"winner","points","loser","wins","numFrames","startedAt","groupPos","bonus","details","tableNo","endedAt","players","referee","clubId","finalPos","eta"],"d":{"tournaments":[{"winners":[],"id":38,"phases":{"$":0,"groupName":["A","B","C","D","QUARTAS","SEMI-FINAIS","FINAL","TERCEIRO"],"phase":[1,1,1,1,2,3,4,4],"§h":[20,20,26,26,20,20,20,20],"matches":[{"$":0,"id":[1,2,3,4,5],"§8":[5,5,5,5,5],"§c":["§",0,0,{"§4":{"§b":3,"§a":1}},0,{"§4":{"§a":2}}],"§j":["§§0","§§0","§§0","§§0","§§0"],"§d":[1,1,1,1,1],"§h":[20,20,20,20,20],"§9":["§",0,0,0,0,0],"§e":["§",0,0,0,0,0],"§f":[{"$":0,"pk":[14499,14500],"id":[412,334],"§7":[0,0],"wo":["§",3,3],"§5":[0,0]},{"$":0,"pk":[14502,14503],"id":[21,111],"§7":[0,0],"wo":["§",3,3],"§5":[0,0]},{"$":0,"pk":[14505,14506],"id":["§",0,0],"§7":[0,0],"wo":["§",3,3],"§2":[1,2],"§1":["§",4,4],"§5":[0,0]},{"$":0,"pk":[14508,14509],"id":["§",0,0],"§7":[0,0],"wo":["§",3,3],"§2":[1,2],"§1":["§",6,6],"§5":[0,0]},{"$":0,"pk":[14511,14512],"id":["§",0,0],"§7":[0,0],"wo":["§",3,3],"§2":[3,4],"§1":["§",6,4],"§5":[0,0]}],"§g":[{"pk":14501,"id":21,"wo":"§3"},{"pk":14504,"id":"§0","wo":"§3","§2":1,"§1":"§6"},{"pk":14507,"id":"§0","wo":"§3","§2":2,"§1":"§6"},{"pk":14510,"id":"§0","wo":"§3","§2":3,"§1":"§4"},{"pk":14513,"id":"§0","wo":"§3","§2":4,"§1":"§6"}]},{"$":0,"id":[6,7,8,9,10],"§8":[5,5,5,5,5],"§c":["§",0,0,{"§4":{"§b":3,"§a":1}},0,{"§4":{"§a":2}}],"§j":["§§0","§§0","§§0","§§0","§§0"],"§d":[2,2,2,2,2],"§h":[20,20,20,20,20],"§9":["§",0,0,0,0,0],"§e":["§",0,0,0,0,0],"§f":[{"$":0,"pk":[14514,14515],"id":[330,55],"§7":[0,0],"wo":["§",3,3],"§5":[0,0]},{"$":0,"pk":[14517,14518],"id":[226,414],"§7":[0,0],"wo":["§",3,3],"§5":[0,0]},{"$":0,"pk":[14520,14521],"id":["§",0,0],"§7":[0,0],"wo":["§",3,3],"§2":[6,7],"§1":["§",4,4],"§5":[0,0]},{"$":0,"pk":[14523,14524],"id":["§",0,0],"§7":[0,0],"wo":["§",3,3],"§2":[6,7],"§1":["§",6,6],"§5":[0,0]},{"$":0,"pk":[14526,14527],"id":["§",0,0],"§7":[0,0],"wo":["§",3,3],"§2":[8,9],"§1":["§",6,4],"§5":[0,0]}],"§g":[{"pk":14516,"id":226,"wo":"§3"},{"pk":14519,"id":"§0","wo":"§3","§2":6,"§1":"§6"},{"pk":14522,"id":"§0","wo":"§3","§2":7,"§1":"§6"},{"pk":14525,"id":"§0","wo":"§3","§2":8,"§1":"§4"},{"pk":14528,"id":"§0","wo":"§3","§2":9,"§1":"§6"}]},{"$":0,"id":[11,12,13,14,15],"§8":[5,5,5,5,5],"§c":["§",0,0,{"§4":{"§b":3,"§a":1}},0,{"§4":{"§a":2}}],"§j":["§§0","§§0","§§0","§§0","§§0"],"§d":[3,3,3,3,3],"§h":[26,26,26,26,26],"§9":["§",0,0,0,0,0],"§e":["§",0,0,0,0,0],"§f":[{"$":0,"pk":[14529,14530],"id":[116,24],"§7":[0,0],"wo":["§",3,3],"§5":[0,0]},{"$":0,"pk":[14532,14533],"id":[262,267],"§7":[0,0],"wo":["§",3,3],"§5":[0,0]},{"$":0,"pk":[14535,14536],"id":["§",0,0],"§7":[0,0],"wo":["§",3,3],"§2":[11,12],"§1":["§",4,4],"§5":[0,0]},{"$":0,"pk":[14538,14539],"id":["§",0,0],"§7":[0,0],"wo":["§",3,3],"§2":[11,12],"§1":["§",6,6],"§5":[0,0]},{"$":0,"pk":[14541,14542],"id":["§",0,0],"§7":[0,0],"wo":["§",3,3],"§2":[13,14],"§1":["§",6,4],"§5":[0,0]}],"§g":[{"pk":14531,"id":262,"wo":"§3"},{"pk":14534,"id":"§0","wo":"§3","§2":11,"§1":"§6"},{"pk":14537,"id":"§0","wo":"§3","§2":12,"§1":"§6"},{"pk":14540,"id":"§0","wo":"§3","§2":13,"§1":"§4"},{"pk":14543,"id":"§0","wo":"§3","§2":14,"§1":"§6"}]},{"$":0,"id":[16,17,18,19,20],"§8":[5,5,5,5,5],"§c":["§",0,0,{"§4":{"§b":3,"§a":1}},0,{"§4":{"§a":2}}],"§j":["§§0","§§0","§§0","§§0","§§0"],"§d":[4,4,4,4,4],"§h":[26,26,26,26,26],"§9":["§",0,0,0,0,0],"§e":["§",0,0,0,0,0],"§f":[{"$":0,"pk":[14544,14545],"id":[260,397],"§7":[0,0],"wo":["§",3,3],"§5":[0,0]},{"$":0,"pk":[14547,14548],"id":[275,"§0"],"§7":[0,0],"wo":["§",3,3],"§5":[0,0]},{"$":0,"pk":[14550,14551],"id":["§",0,0],"§7":[0,0],"wo":["§",3,3],"§2":[16,17],"§1":["§",4,4],"§5":[0,0]},{"$":0,"pk":[14553,14554],"id":["§",0,0],"§7":[0,0],"wo":["§",3,3],"§2":[16,17],"§1":["§",6,6],"§5":[0,0]},{"$":0,"pk":[14556,14557],"id":["§",0,0],"§7":[0,0],"wo":["§",3,3],"§2":[18,19],"§1":["§",6,4],"§5":[0,0]}],"§g":[{"pk":14546,"id":275,"wo":"§3"},{"pk":14549,"id":"§0","wo":"§3","§2":16,"§1":"§6"},{"pk":14552,"id":"§0","wo":"§3","§2":17,"§1":"§6"},{"pk":14555,"id":"§0","wo":"§3","§2":18,"§1":"§4"},{"pk":14558,"id":"§0","wo":"§3","§2":19,"§1":"§6"}]},{"$":0,"id":[21,22,23,24],"§8":[5,5,5,5],"§c":[{"§4":{"§b":2}},{"§4":{"§b":2}},{"§4":{"§b":2}},{"§4":{"§b":2}}],"§j":["§",0,0,0,0],"§d":["§",0,0,0,0],"§h":[20,20,20,20],"§9":["§",0,0,0,0],"§e":["§",0,0,0,0],"§f":[{"$":0,"pk":[14559,14560],"id":["§",0,0],"§7":[0,0],"wo":["§",3,3],"§2":[8,20],"§1":["§",4,4],"§5":[0,0]},{"$":0,"pk":[14561,14562],"id":["§",0,0],"§7":[0,0],"wo":["§",3,3],"§2":[18,10],"§1":["§",4,4],"§5":[0,0]},{"$":0,"pk":[14563,14564],"id":["§",0,0],"§7":[0,0],"wo":["§",3,3],"§2":[3,15],"§1":["§",4,4],"§5":[0,0]},{"$":0,"pk":[14565,14566],"id":["§",0,0],"§7":[0,0],"wo":["§",3,3],"§2":[13,5],"§1":["§",4,4],"§5":[0,0]}],"§g":[{"pk":"§0","id":"§0","wo":"§0"},{"pk":"§0","id":"§0","wo":"§0"},{"pk":"§0","id":"§0","wo":"§0"},{"pk":"§0","id":"§0","wo":"§0"}]},{"$":0,"id":[25,26],"§8":[5,5],"§c":[{"§4":{"§b":2}},{"§4":{"§b":2}}],"§j":["§",0,0],"§d":["§",0,0],"§h":[20,20],"§9":["§",0,0],"§e":["§",0,0],"§f":[{"$":0,"pk":[14567,14568],"id":["§",0,0],"§7":[0,0],"wo":["§",3,3],"§2":[22,24],"§1":["§",4,4],"§5":[0,0]},{"$":0,"pk":[14569,14570],"id":["§",0,0],"§7":[0,0],"wo":["§",3,3],"§2":[21,23],"§1":["§",4,4],"§5":[0,0]}],"§g":[{"pk":"§0","id":"§0","wo":"§0"},{"pk":"§0","id":"§0","wo":"§0"}]},[{"id":27,"§8":5,"§c":{"§6":{"§i":2},"§4":{"§b":3,"§i":1}},"§j":"§0","§d":"§0","§h":20,"§9":"§0","§e":"§0","§f":{"$":0,"pk":[14571,14572],"id":["§",0,0],"§7":[0,0],"wo":["§",3,3],"§2":[25,26],"§1":["§",4,4],"§5":[0,0]},"§g":{"pk":"§0","id":"§0","wo":"§0"}}],[{"id":28,"§8":5,"§c":{"§6":{"§i":4},"§4":{"§b":1,"§i":3}},"§j":"§0","§d":"§0","§h":20,"§9":"§0","§e":"§0","§f":{"$":0,"pk":[14573,14574],"id":["§",0,0],"§7":[0,0],"wo":["§",3,3],"§2":[25,26],"§1":["§",6,6],"§5":[0,0]},"§g":{"pk":"§0","id":"§0","wo":"§0"}}]]}}]}}
    }
]
//.slice(-1);