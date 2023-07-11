import { getMinutes, getHours, getDate, getMonth } from "date-fns";

export const setClubFixtures = (club, matchDetails) => {
    const { clubName, awayClub, firstScore, secondScore, matchDate, position } =
        matchDetails;

    club["FIXTURES"].push({
        club1: clubName,
        club2: awayClub,
        club1Score: firstScore,
        club2Score: secondScore,
        home: position,
        matchDate: new Date(matchDate),
    });
};

export const setClubDetails = (club, matchDetails) => {
    const { clubName, firstScore, secondScore } = matchDetails;

    club["GF"] += firstScore;
    club["GA"] += secondScore;
    club["GD"] = club["GF"] - club["GA"];
    club["NAME"] = clubName;
    club["SLUG"] = clubName.toString().split(" ").join("-");

    club["WIN"] += firstScore > secondScore ? 1 : 0;
    club["DRAW"] += firstScore === secondScore ? 1 : 0;
    club["LOSE"] += firstScore < secondScore ? 1 : 0;
    club["POINTS"] = club["WIN"] * 3 + club["DRAW"] * 1;
    club["PLAYED"] = club["WIN"] + club["DRAW"] + club["LOSE"];
    setClubFixtures(club, matchDetails);
};

export const getClubMatchDetails = (
    clubFixtures,
    clubName,
    awayClub,
    firstScore,
    secondScore,
    matchDate,
    position
) => {
    const matchDetails = {
        clubName,
        awayClub,
        firstScore,
        secondScore,
        matchDate,
        position,
    };
    if (!clubFixtures[clubName]) {
        clubFixtures[clubName] = {
            GF: 0,
            GA: 0,
            GD: 0,
            WIN: 0,
            DRAW: 0,
            LOSE: 0,
            FIXTURES: [],
            POINTS: 0,
            PLAYED: 0,
            NAME: '',
            SLUG: ''
        };

        const club = clubFixtures[clubName];

        if (firstScore !== null && secondScore !== null) {
            setClubDetails(club, matchDetails);
        } else {
            if(!club['NAME'] && !club['SLUG']) {
                club['NAME'] = clubName;
                club['SLUG'] = clubName.toString().split(" ").join("-");
            }
            setClubFixtures(club, matchDetails);
        }
    } else {
        const club = clubFixtures[clubName];
        if (firstScore !== null && secondScore !== null) {
            setClubDetails(club, matchDetails);
        } else {
            setClubFixtures(club, matchDetails);
        }
    }
};

export const getAllTeamData = (allTeams, data) => {
    data.forEach((fixture) => {
        const teamKey = Object.keys(fixture.score);
        const scoreArray = [];
        for (let i = 0; i < teamKey.length; i++) {
            scoreArray.push(fixture.score[teamKey[i]]);
        }

        getClubMatchDetails(
            allTeams,
            teamKey[0].toString(),
            teamKey[1].toString(),
            scoreArray[0],
            scoreArray[1],
            fixture.date,
            0
        );
        getClubMatchDetails(
            allTeams,
            teamKey[1].toString(),
            teamKey[0].toString(),
            scoreArray[1],
            scoreArray[0],
            fixture.date,
            1
        );
    });
};

export const sortTeams = (teams) => {
    return teams.sort((a, b) => {
        if (a["POINTS"] === b["POINTS"]) return b["GD"] - a["GD"];

        return b["POINTS"] - a["POINTS"];
    });
};

export const getMatchDay = (matchDate) => {
    return `${
        getDate(matchDate) < 10 ? "0" + getDate(matchDate) : getDate(matchDate)
    }/${
        getMonth(matchDate) < 9
            ? "0" + (getMonth(matchDate) + 1)
            : getMonth(matchDate) + 1
    }`;
};
export const getMatchTime = (matchDate) => {
    return `${
        getHours(matchDate) < 10
            ? "0" + getHours(matchDate)
            : getHours(matchDate)
    }:${
        getMinutes(matchDate) < 10
            ? "0" + getMinutes(matchDate)
            : getMinutes(matchDate)
    }`;
};
