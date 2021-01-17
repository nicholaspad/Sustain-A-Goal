import Button from "@material-ui/core/Button";

export function MaybeLaterSlide(props) {
    return (
        <>
            <div className="center-text">
                No worries! We'll come back to this goal later. <br /> Let's see another
                recommendation, shall we?
            </div>
            <Button
                variant="contained"
                color="secondary"
                onClick={props.handleSlideSeriesMaybeLater}
                id="maybe-later-next-rec"
            >
                Next Recommendation
            </Button>
        </>
    );
}
