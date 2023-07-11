import {
    sortTeams,
    getClubMatchDetails,
    getAllTeamData,
    setClubDetails,
    setClubFixtures,
    getMatchDay,
} from "./util";

describe("Tests the Utility Functions", () => {
    test("Expects and array of teams to be sorted by points", () => {
        const teams = [
            {
                GD: -1,
                NAME: "Manchester City",
                POINTS: 1,
            },
            {
                GD: -5,
                NAME: "Arsenal",
                POINTS: 4,
            },
        ];

        const sortedTeams = sortTeams([...teams]);

        expect(sortedTeams).toEqual([
            {
                GD: -5,
                NAME: "Arsenal",
                POINTS: 4,
            },
            {
                GD: -1,
                NAME: "Manchester City",
                POINTS: 1,
            },
        ]);
    });

    test("Expects an array of teams to be sorted by GD if Points are equal", () => {
        const teams = [
            {
                GD: -5,
                NAME: "Manchester City",
                POINTS: 4,
            },
            {
                GD: -2,
                NAME: "Arsenal",
                POINTS: 4,
            },
            {
                GD: -3,
                NAME: "Chelsea",
                POINTS: 4,
            },
        ];

        const sortedTeams = sortTeams([...teams]);

        expect(sortedTeams).toEqual([
            {
                GD: -2,
                NAME: "Arsenal",
                POINTS: 4,
            },
            {
                GD: -3,
                NAME: "Chelsea",
                POINTS: 4,
            },
            {
                GD: -5,
                NAME: "Manchester City",
                POINTS: 4,
            },
        ]);
    });

    test("Expects the fixtures of the team to be updated", () => {
        const club = {
            FIXTURES: [
                {
                    club1: "Arsenal",
                    club1Score: 2,
                    club2: "Manchester United",
                    club2Score: 6,
                    home: 1,
                    matchDate: new Date("2021-01-04T17:00:00"),
                },
            ],
        };

        const matchDetails = {
            clubName: "Arsenal",
            awayClub: "Liverpool",
            firstScore: 2,
            secondScore: 3,
            matchDate: "2021-05-02T17:00:00",
            position: 0,
        };

        setClubFixtures(club, matchDetails);

        expect(club).toEqual({
            FIXTURES: [
                {
                    club1: "Arsenal",
                    club1Score: 2,
                    club2: "Manchester United",
                    club2Score: 6,
                    home: 1,
                    matchDate: new Date("2021-01-04T17:00:00"),
                },
                {
                    club1: "Arsenal",
                    club1Score: 2,
                    club2: "Liverpool",
                    club2Score: 3,
                    home: 0,
                    matchDate: new Date("2021-05-02T17:00:00"),
                },
            ],
        });
    });

    test("Expects the team details to be updated", () => {
        const club = {
            DRAW: 1,
            FIXTURES: [
                {
                    club1: "Arsenal",
                    club1Score: 0,
                    club2: "Leicester City",
                    club2Score: 0,
                    home: 0,
                    matchDate: new Date("2021-01-04T17:00:00"),
                },
            ],
            GA: 0,
            GD: 0,
            GF: 0,
            LOSE: 0,
            NAME: "Arsenal",
            PLAYED: 1,
            POINTS: 1,
            SLUG: "Arsenal",
            WIN: 0,
        };

        const matchDetails = {
            clubName: "Arsenal",
            awayClub: "Liverpool",
            firstScore: 2,
            secondScore: 3,
            matchDate: "2021-05-02T17:00:00",
            position: 0,
        };

        setClubDetails(club, matchDetails);

        expect(club).toEqual({
            DRAW: 1,
            FIXTURES: [
                {
                    club1: "Arsenal",
                    club1Score: 0,
                    club2: "Leicester City",
                    club2Score: 0,
                    home: 0,
                    matchDate: new Date("2021-01-04T17:00:00"),
                },
                {
                    club1: "Arsenal",
                    club1Score: 2,
                    club2: "Liverpool",
                    club2Score: 3,
                    home: 0,
                    matchDate: new Date("2021-05-02T17:00:00"),
                },
            ],
            GA: 3,
            GD: -1,
            GF: 2,
            LOSE: 1,
            NAME: "Arsenal",
            PLAYED: 2,
            POINTS: 1,
            SLUG: "Arsenal",
            WIN: 0,
        });
    });

    test('Expects to return match records from data', () => {
        const data = [
            {
                score: {
                  "Manchester United": 1,
                  "Leicester City": 2
                },
                date: "2021-05-04T14:00:00"
              }
        ];

        const clubFixtures = {};
        getAllTeamData(clubFixtures, data);
        expect(clubFixtures).toEqual({
            'Manchester United' :
            {
                DRAW: 0,
                FIXTURES: [{
                    club1: "Manchester United",
                    club1Score: 1,
                    club2: "Leicester City",
                    club2Score: 2,
                    home: 0,
                    matchDate: new Date("2021-05-04T14:00:00")
                }],
                GA: 2,
                GD: -1,
                GF: 1,
                LOSE: 1,
                NAME: "Manchester United",
                PLAYED: 1,
                POINTS: 0,
                SLUG: "Manchester-United",
                WIN: 0,
            },
            'Leicester City': {
                DRAW: 0,
                FIXTURES: [
                    {
                        club1: "Leicester City",
                        club1Score: 2,
                        club2: "Manchester United",
                        club2Score: 1,
                        home: 1,
                        matchDate: new Date("2021-05-04T14:00:00")
                    }
                ],
                GA: 1,
                GD: 1,
                GF: 2,
                LOSE: 0,
                NAME: "Leicester City",
                PLAYED: 1,
                POINTS: 3,
                SLUG: "Leicester-City",
                WIN: 1,
            }
        });
    });

    test('Expects to set the team name for future fixtures if the team name is empty', () => {
        const data = [
            {
                score: { "Manchester United": null, Liverpool: null },
                date: "2021-05-09T11:00:00"
            }
        ];

        const clubFixtures = {};
        getAllTeamData(clubFixtures, data);
        expect(clubFixtures).toEqual({
            'Manchester United': {
                DRAW: 0,
                FIXTURES: [{
                    club1: "Manchester United",
                    club1Score: null,
                    club2: "Liverpool",
                    club2Score: null,
                    home: 0,
                    matchDate: new Date("2021-05-09T11:00:00")
                }],
                GA: 0,
                GD: 0,
                GF: 0,
                LOSE: 0,
                NAME: "Manchester United",
                PLAYED: 0,
                POINTS: 0,
                SLUG: "Manchester-United",
                WIN: 0,
            },
            'Liverpool': {
                DRAW: 0,
                FIXTURES: [{
                    club1: "Liverpool",
                    club1Score: null,
                    club2: "Manchester United",
                    club2Score: null,
                    home: 1,
                    matchDate: new Date("2021-05-09T11:00:00")
                }],
                GA: 0,
                GD: 0,
                GF: 0,
                LOSE: 0,
                NAME: "Liverpool",
                PLAYED: 0,
                POINTS: 0,
                SLUG: "Liverpool",
                WIN: 0
            }
        })
    })

    test('Expects to update team records with latest future fixture', () => {
        const data = [
              {
                score: { "Manchester United": null, Liverpool: null },
                date: "2021-05-09T11:00:00"
              }
        ];

        const clubFixtures = {
            'Manchester United' :
            {
                DRAW: 0,
                FIXTURES: [{
                    club1: "Manchester United",
                    club1Score: 1,
                    club2: "Leicester City",
                    club2Score: 2,
                    home: 0,
                    matchDate: new Date("2021-05-04T14:00:00")
                }],
                GA: 2,
                GD: -1,
                GF: 1,
                LOSE: 1,
                NAME: "Manchester United",
                PLAYED: 1,
                POINTS: 0,
                SLUG: "Manchester-United",
                WIN: 0,
            },
            'Leicester City': {
                DRAW: 0,
                FIXTURES: [
                    {
                        club1: "Leicester City",
                        club1Score: 2,
                        club2: "Manchester United",
                        club2Score: 1,
                        home: 1,
                        matchDate: new Date("2021-05-04T14:00:00")
                    }
                ],
                GA: 1,
                GD: 1,
                GF: 2,
                LOSE: 0,
                NAME: "Leicester City",
                PLAYED: 1,
                POINTS: 3,
                SLUG: "Leicester-City",
                WIN: 1,
            }
        };

        getAllTeamData(clubFixtures, data);
        expect(clubFixtures).toEqual({
            'Manchester United' :
            {
                DRAW: 0,
                FIXTURES: [
                    {
                        club1: "Manchester United",
                        club1Score: 1,
                        club2: "Leicester City",
                        club2Score: 2,
                        home: 0,
                        matchDate: new Date("2021-05-04T14:00:00")
                    },
                    {
                        club1: "Manchester United",
                        club1Score: null,
                        club2: "Liverpool",
                        club2Score: null,
                        home: 0,
                        matchDate: new Date("2021-05-09T11:00:00")
                    }
                ],
                GA: 2,
                GD: -1,
                GF: 1,
                LOSE: 1,
                NAME: "Manchester United",
                PLAYED: 1,
                POINTS: 0,
                SLUG: "Manchester-United",
                WIN: 0,
            },
            'Leicester City': {
                DRAW: 0,
                FIXTURES: [
                    {
                        club1: "Leicester City",
                        club1Score: 2,
                        club2: "Manchester United",
                        club2Score: 1,
                        home: 1,
                        matchDate: new Date("2021-05-04T14:00:00")
                    }
                ],
                GA: 1,
                GD: 1,
                GF: 2,
                LOSE: 0,
                NAME: "Leicester City",
                PLAYED: 1,
                POINTS: 3,
                SLUG: "Leicester-City",
                WIN: 1,
            },
            'Liverpool': {
                DRAW: 0,
                FIXTURES: [{
                    club1: "Liverpool",
                    club1Score: null,
                    club2: "Manchester United",
                    club2Score: null,
                    home: 1,
                    matchDate: new Date("2021-05-09T11:00:00")
                }],
                GA: 0,
                GD: 0,
                GF: 0,
                LOSE: 0,
                NAME: "Liverpool",
                PLAYED: 0,
                POINTS: 0,
                SLUG: "Liverpool",
                WIN: 0
            }
        });
    });

    test('Expects to update team records with latest past fixture', () => {
        const data = [
            {
                score: { "Manchester United": 1, "Tottenham Hotspur": 1 },
                date: "2021-05-05T11:00:00"
            }
        ];

        const clubFixtures = {
            'Manchester United' :
            {
                DRAW: 0,
                FIXTURES: [{
                    club1: "Manchester United",
                    club1Score: 1,
                    club2: "Leicester City",
                    club2Score: 2,
                    home: 0,
                    matchDate: new Date("2021-05-04T14:00:00")
                }],
                GA: 2,
                GD: -1,
                GF: 1,
                LOSE: 1,
                NAME: "Manchester United",
                PLAYED: 1,
                POINTS: 0,
                SLUG: "Manchester-United",
                WIN: 0,
            },
            'Leicester City': {
                DRAW: 0,
                FIXTURES: [
                    {
                        club1: "Leicester City",
                        club1Score: 2,
                        club2: "Manchester United",
                        club2Score: 1,
                        home: 1,
                        matchDate: new Date("2021-05-04T14:00:00")
                    }
                ],
                GA: 1,
                GD: 1,
                GF: 2,
                LOSE: 0,
                NAME: "Leicester City",
                PLAYED: 1,
                POINTS: 3,
                SLUG: "Leicester-City",
                WIN: 1,
            }
        };

        getAllTeamData(clubFixtures, data);
        expect(clubFixtures).toEqual({
            'Manchester United' :
            {
                DRAW: 1,
                FIXTURES: [
                    {
                        club1: "Manchester United",
                        club1Score: 1,
                        club2: "Leicester City",
                        club2Score: 2,
                        home: 0,
                        matchDate: new Date("2021-05-04T14:00:00")
                    },
                    {
                        club1: "Manchester United",
                        club1Score: 1,
                        club2: "Tottenham Hotspur",
                        club2Score: 1,
                        home: 0,
                        matchDate: new Date("2021-05-05T11:00:00")
                    }
                ],
                GA: 3,
                GD: -1,
                GF: 2,
                LOSE: 1,
                NAME: "Manchester United",
                PLAYED: 2,
                POINTS: 1,
                SLUG: "Manchester-United",
                WIN: 0,
            },
            'Leicester City': {
                DRAW: 0,
                FIXTURES: [
                    {
                        club1: "Leicester City",
                        club1Score: 2,
                        club2: "Manchester United",
                        club2Score: 1,
                        home: 1,
                        matchDate: new Date("2021-05-04T14:00:00")
                    }
                ],
                GA: 1,
                GD: 1,
                GF: 2,
                LOSE: 0,
                NAME: "Leicester City",
                PLAYED: 1,
                POINTS: 3,
                SLUG: "Leicester-City",
                WIN: 1,
            },
            'Tottenham Hotspur': {
                DRAW: 1,
                FIXTURES: [{
                    club1: "Tottenham Hotspur",
                    club1Score: 1,
                    club2: "Manchester United",
                    club2Score: 1,
                    home: 1,
                    matchDate: new Date("2021-05-05T11:00:00")
                }],
                GA: 1,
                GD: 0,
                GF: 1,
                LOSE: 0,
                NAME: "Tottenham Hotspur",
                PLAYED: 1,
                POINTS: 1,
                SLUG: "Tottenham-Hotspur",
                WIN: 0,
            }
        });
    });

    test('Expects the date to be in the format 14/10', () => {
        const matchDay = getMatchDay(new Date("2021-05-04T14:00:00"));

        expect(matchDay).toBe("04/05");
    });
});
