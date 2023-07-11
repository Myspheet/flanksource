import { getMatchDay, getMatchTime } from "../util";

function FixtureRow({ team }) {
    const isFixtureInvalid = (team) => {
        return (
            (team["club1Score"] === null && team["club2Score"] !== null) ||
            (team["club1Score"] !== null && team["club2Score"] === null)
        );
    };
    const matchDate = team["matchDate"];
    const matchDay = getMatchDay(matchDate);
    const matchTime = getMatchTime(matchDate);
    const isFuture = team["club1Score"] === null && team["club2Score"] === null;

    if (isFixtureInvalid(team) && !isFuture) return null;

    return (
        <div className={"Row"}>
            <div className="Date">
                {isFuture && <span>Upcoming Fixture</span>} Date: {matchDay}{" "}
                {!isFuture && `Time :${matchTime}`}
            </div>
            <div className="Fixture">
                <div className="Team Home">
                    {!!team["home"] ? team["club2"] : team["club1"]}
                </div>
                {!isFuture ? (
                    <div className="Score-Wrapper">
                        <div className="Score">
                            {!!team["home"]
                                ? team["club2Score"]
                                : team["club1Score"]}
                        </div>
                        <div className="Score">
                            {!!team["home"]
                                ? team["club1Score"]
                                : team["club2Score"]}
                        </div>
                    </div>
                ) : (
                    <div className="Time">{matchTime}</div>
                )}
                <div className="Team Away">
                    {!!team["home"] ? team["club1"] : team["club2"]}
                </div>
            </div>
        </div>
    );
}

export default FixtureRow;
