import Button from "@material-ui/core/Button";

export function ImpactSlide(props) {
    return (
        <>
            <h3 id="impact-rec-title">{props.title}</h3>
            <div id="impact-rec-desc" className="center-text">{props.rec}</div>
            <div id="impact-rec-impact" className="center-text">{props.impact}</div>
            <h4 id="set-goal-question" className="center-text">Set this goal?</h4>
            <div id="impact-buttons-container">
                <Button variant="contained" color="secondary" onClick={props.onAlreadyDoThisClick}>
                    I already do this
                </Button>
                <Button id="yes-set-goal-button" variant="contained" color="secondary" onClick={props.onAddGoalClick}>
                    Yes, set this goal
                </Button>
                <Button variant="contained" color="secondary" onClick={props.onMaybeLaterClick}>
                    Maybe later
                </Button>
            </div>
        </>
    );
}
