import { IntroSlide } from "./IntroSlide";
import { ImpactSlide } from "./ImpactSlide";
import { AlreadyDoThisSlide } from "./AlreadyDoThisSlide";
import { AddGoalSlide } from "./AddGoalSlide";
import { MaybeLaterSlide } from "./MaybeLaterSlide";
import { useState } from "react";
import { SLIDES } from "./Recommendations";
import { updateGoals, updateImpact } from "./Firebase";
import FastfoodIcon from "@material-ui/icons/Fastfood";

// in pounds of CO2
const DIET_EMISSIONS = {
    MEAT_RICH_DAY: 15.8,
    MEAT_RICH_YEAR: 5767,
    LOW_MEAT_DAY: 8.62,
    LOW_MEAT_YEAR: 3146,
    VEGPESC_DAY: 8.3,
    VEGPESC_YEAR: 3030,
    VEGAN_DAY: 6.3,
    VEGAN_YEAR: 2299,
};

export function EatLessMeatSlides(props) {
    const [currSlide, setCurrSlide] = useState(0);

    const sliderValToRes = {
        1: {
            label: "Casual Conserver",
            res: "to swap carbon-intensive meats with chicken",
            goal: "Swap beef, lamb, or pork with chicken",
            reducedBy: DIET_EMISSIONS.MEAT_RICH_YEAR - DIET_EMISSIONS.LOW_MEAT_YEAR,
        },
        2: {
            label: "Friend of the Earth",
            res: "a Vegeterian or Pescatarian diet",
            goal: "Try a vegeterian or pescatarian diet",
            reducedBy: DIET_EMISSIONS.MEAT_RICH_YEAR - DIET_EMISSIONS.VEGPESC_YEAR,
        },
        3: {
            label: "Climate Warrior",
            res: "a Vegan diet",
            goal: "Go for a vegan diet",
            reducedBy: DIET_EMISSIONS.MEAT_RICH_YEAR - DIET_EMISSIONS.VEGAN_YEAR,
        },
    };

    const response = sliderValToRes[props.sliderVal];

    const handleIntroClick = (e) => {
        e.preventDefault();
        props.setSliderDisabled(false);
        setCurrSlide(SLIDES.IMPACT);
    };

    const handleAlreadyDoThisClick = (e) => {
        e.preventDefault();
        updateGoals(response.goal, "emissions", response.reducedBy);
        updateImpact(response.reducedBy, "emissions");
        props.setSliderDisabled(true);
        setCurrSlide(SLIDES.ALREADYDOTHIS);
    };

    const handleAddGoalClick = (e) => {
        e.preventDefault();
        updateGoals(response.goal, "emissions", response.reducedBy);
        updateImpact(response.reducedBy, "emissions");
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
        const summary = `Assuming you consume a meat-rich diet, your meals alone cause ${DIET_EMISSIONS.MEAT_RICH_DAY} pounds of CO2 per day, or ${DIET_EMISSIONS.MEAT_RICH_YEAR} pounds of CO2 per year, to be emitted!`;

        return `${summary} Since you've chosen to be a ${yourLabel}, we recommend trying ${yourRes} to reduce your meat consumption.`;
    };

    const getImpactStatement = (level) => {
        if (level === "1")
            return `By carpooling with one other person daily, you can approximately halve your daily CO2 emissions from meals to ${DIET_EMISSIONS.LOW_MEAT_DAY} pounds, or ${DIET_EMISSIONS.LOW_MEAT_YEAR} pounds per year. How impressive!`;
        else if (level === "2") {
            return `By changing to a Pescatarian, or even better, Vegeterian diet, you can cut down your daily meal emissions to ${DIET_EMISSIONS.VEGPESC_DAY} pounds of CO2 per day, or ${DIET_EMISSIONS.VEGPESC_YEAR} pounds per year.  That's fantastic!`;
        } else if (level === "3") {
            return `By committing to a Vegan diet, you can reduce your daily meal emissions to ${DIET_EMISSIONS.VEGAN_DAY} pounds of CO2 per day, or ${DIET_EMISSIONS.VEGAN_YEAR} per year. You're amazing, Climate Warrior!`;
        }
    };

    return (
        <>
            {
                [
                    <IntroSlide
                        title="Eat Less Meat"
                        description="Inefficient energy transformation, deforestation for agricultural land, cow's methane-filled burps--these are just 
                        several reasons why meat production is a major source of anthropogenic emissions. If every individual were to transition to 
                        a low-or-no-meat diet, we can much sooner achieve our emission-reduction goals. 
                        "
                        hasInput={false}
                        onClick={handleIntroClick}
                        icon={<FastfoodIcon id="rec-icon" />}
                    />,
                    <ImpactSlide
                        title="Eat Less Meat"
                        rec={getRecommendation()}
                        impact={getImpactStatement(props.sliderVal)}
                        onAlreadyDoThisClick={handleAlreadyDoThisClick}
                        onAddGoalClick={handleAddGoalClick}
                        onMaybeLaterClick={handleMaybeLaterClick}
                        icon={<FastfoodIcon id="rec-icon" />}
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
