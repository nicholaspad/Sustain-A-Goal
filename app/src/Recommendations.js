import { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { DriveLessSlides } from "./DriveLessSlides";
import Slider from "@material-ui/core/Slider";

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

    const handleSliderChange = () => {
        setSliderVal(document.getElementById("sus-slider").getElementsByTagName("input")[0].value);
    };

    return (
        <>
            <div id="recommendations-title">Recommendations</div>
            <DriveLessSlides sliderVal={sliderVal} />

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
                />
            </div>
        </>
    );
}
