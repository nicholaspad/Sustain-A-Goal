import Button from "@material-ui/core/Button";

export function AlreadyDoThisSlide(props) {
    const sliderValToRes = props.sliderValToRes;
    const currSliderVal = props.currSliderVal;
    const currGoal = sliderValToRes[currSliderVal].goal
    let nextGoal = ""

    if(currSliderVal === "1" || currSliderVal === "2" )
        nextGoal = sliderValToRes[parseInt(currSliderVal)+1+""].goal 

    return (
        <>
            {
                currSliderVal === "3" ? 
                <>
                    <div className="center-text">Yay, you're a superstar!</div>
                    <Button variant="contained" color="secondary" onClick={props.handleSlideSeriesChange}>
                        Next Recommendation
                    </Button>
                </> : 
                <>
                    <div className="center-text">Yay, you're already a star! But superstar status is within reach by upgrading to one level higher 🥺</div>
                    <div className="center-text">{props.nextImpact}</div>
                    <div id="already-do-this-button-container">
                        <Button variant="contained" color="secondary" onClick={() => props.handleSlideSeriesChangeUpgrade(currGoal, nextGoal)}>
                            Yes, upgrade my goal
                        </Button>
                        <Button variant="contained" color="secondary" onClick={props.handleSlideSeriesChange}>
                            Next Recommendation
                        </Button>
                    </div>
                </>
            }
        </>
    );
}
