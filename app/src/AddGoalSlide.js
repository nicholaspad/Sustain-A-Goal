import Button from "@material-ui/core/Button";

export function AddGoalSlide(props) {
    return (
    <>
        <div>You're amazing! This goal has been added to your checklist. Let's go onto another recommendation!</div>
        <Button variant="contained" color="secondary" onClick={props.handleSlideSeriesChange}>
            Next Recommendation
        </Button>
    </>
    );
}
