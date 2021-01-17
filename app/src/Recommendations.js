import { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { DriveLessSlides } from "./DriveLessSlides";
import { EatLessMeatSlides } from "./EatLessMeatSlides";
import { TakeShorterShowersSlides } from "./TakeShorterShowersSlides";
import Slider from "@material-ui/core/Slider";
import {getSlideSeries, updateSlideSeries, updateSlideSeriesMaybeLater, updateSlideSeriesUpgrade } from "./Firebase";

export const SLIDES = {
    INTRO: 0,
    IMPACT: 1,
    ALREADYDOTHIS: 2,
    ADDGOAL: 3,
    MAYBELATER: 4,
};

const useStyles = makeStyles({
    slider: {
        width: "100%",
        marginLeft: "auto",
        height: 8,
    },
});

const marks = [
    {
        value: 1,
        label: "Casual Conserver",
    },
    {
        value: 2,
        label: "Friend of the Earth",
    },
    {
        value: 3,
        label: "Climate Warrior",
    },
];

const SustainabilitySlider = withStyles({
    root: {
        color: "#c8e6c9",
        height: 16,
    },
    thumb: {
        height: 32,
        width: 32,
        backgroundColor: "#fff",
        border: "3px solid currentColor",
        marginTop: -8,
        marginLeft: -12,
        "&:focus, &:hover, &$active": {
            boxShadow: "inherit",
        },
    },
    active: {},
    disabled: {},
    valueLabel: {
        left: "calc(-50% + 10px)",
    },
    markLabel: {
        marginTop: 10,
    },
    track: {
        height: 16,
        borderRadius: 4,
    },
    rail: {
        height: 16,
        borderRadius: 4,
    },
})(Slider);

export function Recommendations() {
    const classes = useStyles();

    const [sliderVal, setSliderVal] = useState(2);
    const [allSlideSeries, setAllSlideSeries] = useState([1]);
    const [sliderDisabled, setSliderDisabled] = useState(true);

    const handleSliderChange = () => {
        setSliderVal(document.getElementById("sus-slider").getElementsByTagName("input")[0].value);
    };

    const handleSlideSeriesChange = () => {
        updateSlideSeries(allSlideSeries);
    }

    const handleSlideSeriesMaybeLater = () => {
        updateSlideSeriesMaybeLater(allSlideSeries);
    }

    const handleSlideSeriesChangeUpgrade = (currGoal, nextGoal) => {
        updateSlideSeriesUpgrade(allSlideSeries, currGoal, nextGoal);
    }

    const allSlides = {
        0: <DriveLessSlides sliderVal={sliderVal}
                            handleSlideSeriesChange={handleSlideSeriesChange}
                            handleSlideSeriesMaybeLater={handleSlideSeriesMaybeLater}
                            handleSlideSeriesChangeUpgrade={handleSlideSeriesChangeUpgrade}
                            setSliderDisabled={setSliderDisabled}
                            />,
        1: <EatLessMeatSlides sliderVal={sliderVal}
                                handleSlideSeriesChange={handleSlideSeriesChange}
                                handleSlideSeriesMaybeLater={handleSlideSeriesMaybeLater}
                                handleSlideSeriesChangeUpgrade={handleSlideSeriesChangeUpgrade}
                                setSliderDisabled={setSliderDisabled}/>,
        2: <TakeShorterShowersSlides sliderVal={sliderVal}
                                        handleSlideSeriesChange={handleSlideSeriesChange}
                                        handleSlideSeriesMaybeLater={handleSlideSeriesMaybeLater}
                                        handleSlideSeriesChangeUpgrade={handleSlideSeriesChangeUpgrade}
                                        setSliderDisabled={setSliderDisabled}/>
    }

    useEffect(() => {
        getSlideSeries(setAllSlideSeries);
        handleSliderChange();
    }, [])

    return (
        <div id="recs-container">
            <h2 id="recs-title">Recommendations</h2>
            {allSlideSeries.length > 0 ? allSlides[allSlideSeries[0]] : <div id="all-recs-viewed">All recommendations viewed!</div>}

            <div id="slider-container">
                <SustainabilitySlider
                    id="sus-slider"
                    className={classes.slider}
                    color="secondary"
                    defaultValue={2}
                    aria-labelledby="discrete-slider-restrict"
                    step={null}
                    valueLabelDisplay="off"
                    marks={marks}
                    min={1}
                    max={3}
                    onChange={handleSliderChange}
                    disabled={sliderDisabled}
                />
            </div>
        </div>
    );
}
