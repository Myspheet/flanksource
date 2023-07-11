import "./App.css";
import LeagueTable from "./pages/LeagueTable";
import { data } from "./data";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Fixtures from "./pages/Fixtures";
import { getAllTeamData } from "./util";

function App() {
    const [teamsData, setTeamsData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const allFixtures = {};

        try {
            getAllTeamData(allFixtures, data);
            const keys = Object.keys(allFixtures);
            const teamsDataArray = [];
            keys.forEach((key) => teamsDataArray.push(allFixtures[key]));
            setTeamsData(teamsDataArray);
        } catch (error) {
            setError(
                "There was a problem reading the data or the data may contain invalid valid data"
            );
            console.log(error.message);
        }
    }, []);

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Link to="/">League Table</Link>
                </header>
                {error === "" ? (
                    <main>
                        <Routes>
                            <Route
                                exact
                                path="/"
                                element={
                                    <LeagueTable teamsData={[...teamsData]} />
                                }
                            />
                            <Route
                                exact
                                path="/:teamSlug/fixtures"
                                element={
                                    <Fixtures teamsData={[...teamsData]} />
                                }
                            />
                        </Routes>
                    </main>
                ) : (
                    <h3>{error}</h3>
                )}
            </div>
        </Router>
    );
}

export default App;
