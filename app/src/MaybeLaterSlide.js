import Button from "@material-ui/core/Button";

export function MaybeLaterSlide(props) {
    return (<>
        <div>No worries! We'll come back to this goal later. Let's see another recommendation, shall we?</div>
        <Button variant="contained" color="secondary" onClick={props.handleSlideSeriesMaybeLater}>
            Next Recommendation
        </Button>
    </>);
}
