import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import LeagueTable from "./LeagueTable";

describe("Tests the FixtureRow Component", () => {
    test("Expects to render no team data if empty array is passed", () => {
        const teamsData = [];

        render(<LeagueTable teamsData={teamsData} />);

        const noDataText = screen.getByText(
            /There are no teams data available/i
        );
        expect(noDataText).toBeInTheDocument();
    });
    test("Expects to find team names in DOM", () => {
        const teamsData = [
            {
                DRAW: 2,
                GA: 10,
                GD: -5,
                GF: 5,
                LOSE: 2,
                NAME: "Arsenal",
                PLAYED: 4,
                POINTS: 2,
                SLUG: "Arsenal",
                WIN: 0,
            },
            {
                DRAW: 1,
                GA: 5,
                GD: -1,
                GF: 4,
                LOSE: 2,
                NAME: "Manchester City",
                PLAYED: 4,
                POINTS: 4,
                SLUG: "Manchester-City",
                WIN: 1,
            },
            {
                DRAW: 3,
                GA: 10,
                GD: -5,
                GF: 5,
                LOSE: 2,
                NAME: "Chelsea",
                PLAYED: 5,
                POINTS: 3,
                SLUG: "Chelsea",
                WIN: 0,
            },
        ];

        render(
            <MemoryRouter initialEntries={['/']}>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={<LeagueTable teamsData={teamsData} />}
                />
            </Routes>
        </MemoryRouter>
        );

        const chelsea = screen.getByText(/Chelsea/i);
        const manchesterCity = screen.getByText(/Manchester City/i);
        const arsenal = screen.getByText(/Arsenal/i);
        expect(chelsea).toBeInTheDocument();
        expect(manchesterCity).toBeInTheDocument();
        expect(arsenal).toBeInTheDocument();
    });
});
