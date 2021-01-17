import Button from "@material-ui/core/Button";

export function AddGoalSlide(props) {
    return (
        <>
            <div className="center-text">
                You're amazing! This goal has been added to your checklist. <br /> Let's go onto
                another recommendation!
            </div>
            <Button
                id="add-goal-next-rec-btn"
                variant="contained"
                color="secondary"
                onClick={props.handleSlideSeriesChange}
            >
                Next Recommendation
            </Button>
        </>
    );
}
