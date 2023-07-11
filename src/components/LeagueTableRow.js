import { Link } from "react-router-dom";

function LeagueTableRow({team, index}) {

  return (
        <tr className="LeagueTableRow">
            <td>{index + 1}</td>
            <td> <Link to={`/${team['SLUG']}/fixtures`}>{team['NAME']}</Link></td>
            <td>{team['PLAYED']}</td>
            <td>{team['WIN']}</td>
            <td>{team['DRAW']}</td>
            <td>{team['LOSE']}</td>
            <td>{team['GF']}</td>
            <td>{team['GA']}</td>
            <td>{team['GD']}</td>
            <td>{team['POINTS']}</td>
        </tr>
  )
}

export default LeagueTableRow