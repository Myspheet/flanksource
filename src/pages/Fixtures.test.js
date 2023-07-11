import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Fixtures from "./Fixtures";

const renderRoute = (teams, slug) => {
    return render(
        <MemoryRouter initialEntries={[`/${slug}/fixtures`]}>
            <Routes>
                <Route
                    exact
                    path="/:teamSlug/fixtures"
                    element={<Fixtures teamsData={teams} />}
                />
            </Routes>
        </MemoryRouter>
    );
}
describe("Tests the FixtureRow Component", () => {
    test("Expects to render team doesn't exist text when empty teamData array is received", () => {
        const team = [];

        renderRoute(team, 'Arsenal');

        const noTeamText = screen.getByText(/This Team Doesn't Exist/i);
        expect(noTeamText).toBeInTheDocument();
    });

    test("Expects to render team doesn't exist text when team not found in teams array", () => {
        const team = [
            {
                SLUG: "Arsenal",
                FIXTURES: [],
            },
            {
                SLUG: "Manchester United",
                FIXTURES: [],
            },
        ];

        renderRoute(team, 'Chelsea');

        const noTeamText = screen.getByText(/This Team Doesn't Exist/i);
        expect(noTeamText).toBeInTheDocument();
    });

    test("Expects to render empty fixtures when team doesn't have a fixture", () => {
        const team = [
            {
                SLUG: "Arsenal",
                FIXTURES: [],
            },
            {
                SLUG: "Manchester United",
                FIXTURES: [],
            },
        ];

        renderRoute(team, 'Arsenal');

        const noFixtureText = screen.getByText(
            /There are No Fixtures Available for this team/i
        );
        expect(noFixtureText).toBeInTheDocument();
    });

    test("Expects to render a list of fixtures", () => {
        const team = [
            {
                SLUG: "Arsenal",
                FIXTURES: [],
            },
            {
                SLUG: "Manchester-United",
                NAME: "Manchester United",
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
            },
        ];

        renderRoute(team, 'Manchester-United');

        const teamName = screen.getAllByText('Manchester United');
        expect(teamName).toHaveLength(2);
    });
});
