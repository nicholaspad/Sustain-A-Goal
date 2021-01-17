import { IntroSlide } from "./IntroSlide";
import { ImpactSlide } from "./ImpactSlide";
import { AlreadyDoThisSlide } from "./AlreadyDoThisSlide";
import { AddGoalSlide } from "./AddGoalSlide";
import { MaybeLaterSlide } from "./MaybeLaterSlide";
import { useState } from "react";
import { SLIDES } from "./Recommendations";
import { updateGoals, updateImpact } from "./Firebase";
import BathtubIcon from "@material-ui/icons/Bathtub";

export function TakeShorterShowersSlides(props) {
    const [currSlide, setCurrSlide] = useState(0);
    const [showerLength, setShowerLength] = useState(0);

    const getNewShowerTime = () => {
        const REDUCE = 2;
        return showerLength - REDUCE;
    };

    const getYourWaterUsage = () => {
        const GALLONS_WATER_PER_MINUTE = 5;
        const DAYS_IN_YEAR = 365;
        return GALLONS_WATER_PER_MINUTE * showerLength * DAYS_IN_YEAR;
    };

    const getYourReducedWaterUsage = () => {
        const GALLONS_WATER_PER_MINUTE = 5;
        const DAYS_IN_YEAR = 365;
        return Math.max(GALLONS_WATER_PER_MINUTE * (showerLength - 2) * DAYS_IN_YEAR, 0);
    };

    const getYourReducedWaterBathUsage = () => {
        const GALLONS_WATER_PER_MINUTE = 5;
        const DAYS_IN_YEAR = 365;
        return GALLONS_WATER_PER_MINUTE * showerLength * DAYS_IN_YEAR;
    };

    const getYourReducedWaterShowerheadUsage = () => {
        const GALLONS_WATER_PER_MINUTE = 1.5;
        const DAYS_IN_YEAR = 365;
        return GALLONS_WATER_PER_MINUTE * showerLength * DAYS_IN_YEAR;
    };

    const yourWaterUsage = getYourWaterUsage();
    const yourReducedWaterUsage = getYourReducedWaterUsage();
    const diffWaterUsage = yourWaterUsage - yourReducedWaterUsage;

    const BATH_AVERAGE_GALLONS = 50 * 365;
    const yourReducedWaterBathUsage = getYourReducedWaterBathUsage();
    const diffWaterBathUsage = BATH_AVERAGE_GALLONS - yourReducedWaterBathUsage;

    const yourReducedWaterShowerheadUsage = getYourReducedWaterShowerheadUsage();
    const diffWaterShowerheadUsage = yourWaterUsage - yourReducedWaterShowerheadUsage;

    const sliderValToRes = {
        1: {
            label: "Casual Conserver",
            res: "reducing your shower time by 2 minutes",
            goal: "Reduce shower time by 2 minutes",
            reducedTo: yourReducedWaterUsage,
            reducedBy: diffWaterUsage,
        },
        2: {
            label: "Friend of the Earth",
            res: "taking showers instead of baths",
            goal: "Take showers, not baths",
            reducedTo: yourReducedWaterBathUsage,
            reducedBy: diffWaterBathUsage,
        },
        3: {
            label: "Climate Warrior",
            res: "using a 1.5 GPM shower head flow-reducer",
            goal: "Use a 1-and-a-half GPM shower head flow-reducer",
            reducedTo: yourReducedWaterShowerheadUsage,
            reducedBy: diffWaterShowerheadUsage,
        },
    };

    const response = sliderValToRes[props.sliderVal];

    const handleIntroSubmit = (e) => {
        e.preventDefault();
        setShowerLength(document.getElementById("intro-input").value);
        props.setSliderDisabled(false);
        setCurrSlide(SLIDES.IMPACT);
    };

    const handleAlreadyDoThisClick = (e) => {
        e.preventDefault();
        updateGoals(response.goal, "water", response.reducedBy);
        updateImpact(response.reducedBy, "water");
        props.setSliderDisabled(true);
        setCurrSlide(SLIDES.ALREADYDOTHIS);
    };

    const handleAddGoalClick = (e) => {
        e.preventDefault();
        updateGoals(response.goal, "water", response.reducedBy);
        updateImpact(response.reducedBy, "water");
        props.setSliderDisabled(true);
        setCurrSlide(SLIDES.ADDGOAL);
    };

    const handleMaybeLaterClick = (e) => {
        e.preventDefault();
        props.setSliderDisabled(true);
        setCurrSlide(SLIDES.MAYBELATER);
    };

    const getRecommendation = () => {
        const yourLabel = response.label;
        const yourRes = response.res;
        const summary = `Assuming you shower for ${showerLength} minutes everydayday, your showers alone sum up to 
        ${yourWaterUsage} gallons of water used per year!`;

        return `${summary} Since you've chosen to be a ${yourLabel}, we recommend ${yourRes} in order to reduce your water usage.`;
    };

    const getImpactStatement = (level) => {
        if (level === "1")
            return `By simply reducing your shower time by 2 minutes, you can save ${diffWaterUsage} gallons of water annually. What a great improvement!`;
        else if (level === "2") {
            return `By taking showers instead of baths, you can save ${diffWaterBathUsage} gallons of water in a year. You rock!`;
        } else if (level === "3") {
            return `By switching to a low-flow shower head,  you can preserve ${diffWaterShowerheadUsage} gallons of water for the coming year. You're killing it, Climate Warrior!`;
        }
    };

    return (
        <>
            {
                [
                    <IntroSlide
                        title="Shorten Showers"
                        description="Taking shorter showers is a simple but necessary step in preserving vital water resources,
                        while also reducing the energy, emissions, and ccosts needed to heat the water: definitely a win-win situation."
                        hasInput={true}
                        inputQuestion="How long are your showers on average?"
                        unit="minutes"
                        onSubmit={handleIntroSubmit}
                        icon={<BathtubIcon id="rec-icon" />}
                    />,
                    <ImpactSlide
                        title="Shorten Showers"
                        rec={getRecommendation()}
                        impact={getImpactStatement(props.sliderVal)}
                        onAlreadyDoThisClick={handleAlreadyDoThisClick}
                        onAddGoalClick={handleAddGoalClick}
                        onMaybeLaterClick={handleMaybeLaterClick}
                        icon={<BathtubIcon id="rec-icon" />}
                    />,
                    <AlreadyDoThisSlide
                        handleSlideSeriesChange={props.handleSlideSeriesChange}
                        handleSlideSeriesChangeUpgrade={props.handleSlideSeriesChangeUpgrade}
                        currSliderVal={props.sliderVal}
                        sliderValToRes={sliderValToRes}
                        nextImpact={getImpactStatement(parseInt(props.sliderVal) + 1 + "")}
                    />,
                    <AddGoalSlide handleSlideSeriesChange={props.handleSlideSeriesChange} />,
                    <MaybeLaterSlide
                        handleSlideSeriesMaybeLater={props.handleSlideSeriesMaybeLater}
                    />,
                ][currSlide]
            }
        </>
    );
}
