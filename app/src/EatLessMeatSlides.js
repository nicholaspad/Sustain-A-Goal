import { IntroSlide } from "./IntroSlide";
import { ImpactSlide } from "./ImpactSlide";
import { AlreadyDoThisSlide } from "./AlreadyDoThisSlide";
import { AddGoalSlide } from "./AddGoalSlide";
import { MaybeLaterSlide } from "./MaybeLaterSlide";
import { useState } from "react";
import { SLIDES } from "./Recommendations";
import { updateGoals, updateImpact } from "./Firebase";

export function EatLessMeatSlides(props) {

    const [currSlide, setCurrSlide] = useState(0);

    // const calculateEmissions = (POUNDS_CO2_PER_MILE) => {
    //     const NUM_DAYS_PER_YEAR = 365;
    //     const POUNDS_CO2_PER_YEAR =  numMilesTraveled * NUM_DAYS_PER_YEAR * POUNDS_CO2_PER_MILE;
    //     return POUNDS_CO2_PER_YEAR;
    // }
 
    const getYourCarEmissions = () => {
        const POUNDS_CO2_PER_MILE = 0.96;
        return calculateEmissions(POUNDS_CO2_PER_MILE)
    }

    const getYourPublicTransportEmissions = () => {
        const POUNDS_CO2_PER_MILE = 0.22;
        return calculateEmissions(POUNDS_CO2_PER_MILE)
    }

    const yourCarEmissions = getYourCarEmissions();
    const yourPublicTransportEmissions = getYourPublicTransportEmissions();
    const diffCarAndPublicTransport = yourCarEmissions - yourPublicTransportEmissions

    const sliderValToRes = {
        "1": {
            label: "Casual Conserver",
            res: "Swap carbon-intensive meats with chicken",
            goal: "Swap beef/lamb/pork with chicken",
            reducedTo: yourCarEmissions/2,
            reducedBy: yourCarEmissions/2
        },
        "2": {
            label: "Friend of the Earth",
            res: "Vegeterian or Pescatarian diet",
            goal: "Try a vegeterian or pescatarian diet",
            reducedTo: yourPublicTransportEmissions,
            reducedBy: diffCarAndPublicTransport
        },
        "3": {
            label: "Climate Warrior",
            res: "Vegan diet",
            goal: "Go for a vegan diet", 
            reducedTo: 0,
            reducedBy: yourCarEmissions
        }
    }

    const response = sliderValToRes[props.sliderVal]

    const handleIntroClick = (e) => {
        e.preventDefault();
        props.setSliderDisabled(false);
        setCurrSlide(SLIDES.IMPACT);
    };

    const handleAlreadyDoThisClick = (e) => {
        e.preventDefault();
        updateGoals(response.goal, "emissions", response.reducedBy, true);
        updateImpact(response.reducedBy)
        props.setSliderDisabled(true);
        setCurrSlide(SLIDES.ALREADYDOTHIS);
    };

    const handleAddGoalClick = (e) => {
        e.preventDefault();
        updateGoals(response.goal, "emissions", response.reducedBy, false);
        updateImpact(response.reducedBy)
        props.setSliderDisabled(true);
        setCurrSlide(SLIDES.ADDGOAL);
    };

    const handleMaybeLaterClick = (e) => {
        e.preventDefault();
        props.setSliderDisabled(true);
        setCurrSlide(SLIDES.MAYBELATER);
    };

    const getRecommendation = () => {

        const yourLabel = response.label
        const yourRes = response.res
        const summary = `Assuming you consume a meat-rich diet, your meals alone contribute 5,767 pounds of CO2 per year!`

        return `${summary} Since you've chosen to be a ${yourLabel}, we recommend ${yourRes} as a new mode of daily transportation.`;
    };

    const getImpactStatement = (level) => {
        if (level === "1")
            return `By carpooling with one other person daily, you can halve your annual CO2 emissions to only ${yourCarEmissions/2} pounds. What an awesome improvement!`;
        else if (level === "2") {   
            return `By using public transportation, particularly subways or metros, you can cut down your annual CO2 emissions by 76% to ${yourPublicTransportEmissions} pounds. That's amazing!`
        } 
        else if (level === "3") {   
            return `By biking everyday, you can cut down your annual CO2 emissions to zero. That would be perfect, Climate Warrior!`
        } 

    };

    return (
        <>
            {
                [
                    <IntroSlide
                        title="Eat Less Meat"
                        description="Transportation accounts for the largest fraction of total greenhouse gas emissions in the U.S., 
                        primarily from burning fossil fuels for petroleum-based vehicles like our cars. Therefore, it is especially 
                        vital to explore cleaner modes of transportation for our daily travels."
                        hasInput={false}
                        onSubmit={handleIntroClick}
                    />,
                    <ImpactSlide
                        title="Drive Less"
                        rec={getRecommendation()}
                        impact={getImpactStatement(props.sliderVal)}
                        onAlreadyDoThisClick={handleAlreadyDoThisClick}
                        onAddGoalClick={handleAddGoalClick}
                        onMaybeLaterClick={handleMaybeLaterClick}
                    />,
                    <AlreadyDoThisSlide 
                        handleSlideSeriesChange={props.handleSlideSeriesChange}
                        handleSlideSeriesChangeUpgrade={props.handleSlideSeriesChangeUpgrade}
                        currSliderVal={props.sliderVal}
                        sliderValToRes={sliderValToRes}
                        nextImpact={getImpactStatement(parseInt(props.sliderVal)+1+"")}
                    />,
                    <AddGoalSlide handleSlideSeriesChange={props.handleSlideSeriesChange}/>,
                    <MaybeLaterSlide handleSlideSeriesMaybeLater={props.handleSlideSeriesMaybeLater}/>,
                ][currSlide]
            }
        </>
    );
}
