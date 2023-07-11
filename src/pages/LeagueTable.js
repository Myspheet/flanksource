import LeagueTableRow from "../components/LeagueTableRow";
import { sortTeams } from "../util";

function LeagueTable({ teamsData }) {
    const sortedTeams = sortTeams([...teamsData]);
    return (
        <>
        { sortedTeams.length > 0 ? (<div>
            <table>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Club</th>
                        <th>Played</th>
                        <th>Won</th>
                        <th>Drawn</th>
                        <th>Lost</th>
                        <th>GF</th>
                        <th>GA</th>
                        <th>GD</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTeams.map((team, index) => (
                        <LeagueTableRow
                            key={index + 1}
                            team={team}
                            index={index}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    ) : "There are no teams data available"}
    </>
    );
}

export default LeagueTable;
