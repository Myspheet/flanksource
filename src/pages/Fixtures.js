import { compareAsc } from "date-fns";
import { useParams } from "react-router-dom";
import FixtureRow from "../components/FixtureRow";

function Fixtures({ teamsData }) {
    const params = useParams();
    const team = teamsData.find((val) => params.teamSlug === val["SLUG"]);
    const teamFixtures =
        team && Object.keys(team).length > 0 ? [...team["FIXTURES"]] : [];
    teamFixtures.sort((a, b) => compareAsc(a["matchDate"], b["matchDate"]));

    return (
        <div>
            {team ? (
                <>
            <div>
                <h3>{team && team["NAME"]} FIXTURES</h3>
            </div>
            <div className="Fixtures">
                {teamFixtures.length > 0
                    ? teamFixtures.map((team, index) => (
                          <FixtureRow key={index} team={team} />
                      ))
                    : "There are No Fixtures Available for this team"
                }
            </div></>) : "This Team Doesn't Exist"}
        </div>
    );
}

export default Fixtures;
