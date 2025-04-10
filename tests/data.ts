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
        out: {"$$":1743249600000,"d":{"tournaments":[{"extraPoints":{"Jogos":"9§0§","Participação":"3§20§"},"id":35,"phases":{"$":0,"groupName":["A","OITAVAS"],"phase":[1,3],"§5":[3,3],"matches":[{"$":0,"id":[1,3,5],"§6":[5,5,5],"§11":[null,{"§3":{"§16":3,"§8":1}},{"§3":{"§8":2}}],"eta":["§D0","§D0","§D0"],"§12":[1,1,1],"§5":[3,3,3],"§7":["§D218000","§D3906000","§D10750000"],"§13":["§D3883000","§D9445000","§D13829000"],"§14":[{"$":0,"pk":[12973,12972],"id":[111,330],"§9":[3,0],"wo":["§2","§2"],"§4":[3,0]},{"$":0,"pk":[12978,12979],"id":[111,115],"§9":[1,3],"wo":["§2","§2"],"§1":[1,2],"§0":["§3","§3"],"§4":[1,6]},{"$":0,"pk":[12984,12985],"id":[111,330],"§9":[3,0],"wo":["§2","§2"],"§1":[3,4],"§0":["§10","§3"],"§4":[3,0]}],"§15":[{"pk":12974,"id":null,"wo":"§2"},{"pk":12980,"id":262,"wo":"§2","§1":2,"§0":"§10"},{"pk":12986,"id":262,"wo":"§2","§1":4,"§0":"§10"}]},[{"id":54,"§6":5,"§11":{"§3":{"§16":2}},"eta":null,"§12":null,"§5":3,"§7":"§D21698000","§13":"§D29017000","§14":{"$":0,"pk":[13123,13124],"id":[111,116],"§9":[2,3],"wo":["§2","§2"],"§1":[5,23],"§0":["§3","§3"],"§4":[2,5]},"§15":{"pk":null,"id":null,"wo":null}}]]}}]},"$":["sourceMatchWho","sourceMatchId",false,"winner","points","clubId","numFrames","startedAt","groupPos","wins","loser","details","tableNo","endedAt","players","referee","bonus"]}
    },
];