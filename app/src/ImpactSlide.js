import Button from "@material-ui/core/Button";

export function ImpactSlide(props) {
    return (
        <>
            <div>{props.rec}</div>
            <div>{props.impact}</div>
            <div>Set this goal?</div>
            <Button variant="contained" color="secondary" onClick={props.onAlreadyDoThisClick}>
                I already do this
            </Button>
            <Button variant="contained" color="secondary" onClick={props.onAddGoalClick}>
                Yes, set this goal
            </Button>
            <Button variant="contained" color="secondary" onClick={props.onMaybeLaterClick}>
                Maybe later
            </Button>
        </>
    );
}
