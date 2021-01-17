import { IntroSlide } from "./IntroSlide";
import { ImpactSlide } from "./ImpactSlide";
import { AlreadyDoThisSlide } from "./AlreadyDoThisSlide";
import { AddGoalSlide } from "./AddGoalSlide";
import { MaybeLaterSlide } from "./MaybeLaterSlide";
import { useState } from "react";
import { SLIDES } from "./Recommendations";
import { updateGoals } from "./Firebase";

export function DriveLessSlides(props) {
    const [currSlide, setCurrSlide] = useState(0);
    const [numMilesTraveled, setNumMilesTraveled] = useState(0);

    const handleIntroClick = (e) => {
        e.preventDefault();
        setCurrSlide(SLIDES.IMPACT);
    };

    const handleIntroSubmit = (e) => {
        e.preventDefault();
        console.log(document.getElementById("intro-input").value);
        setNumMilesTraveled(document.getElementById("intro-input").value);
        setCurrSlide(SLIDES.IMPACT);
    };

    const handleAlreadyDoThisClick = (e) => {
        e.preventDefault();
        updateGoals("Drive Less Already", "emissions", 10, true);
        setCurrSlide(SLIDES.ALREADYDOTHIS);
    };

    const handleAddGoalClick = (e) => {
        e.preventDefault();
        updateGoals("Drive Less New", "emissions", 10, false);
        setCurrSlide(SLIDES.ADDGOAL);
    };

    const handleMaybeLaterClick = (e) => {
        e.preventDefault();
        setCurrSlide(SLIDES.MAYBELATER);
    };

    // hard coding
    const getRecommendation = () => {
        if (props.sliderVal === "1")
            return "hello you have traveled " + numMilesTraveled + " miles";

        if (props.sliderVal === "2")
            return "yessss you have traveled " + numMilesTraveled + " miles";

        return "YASSSS you have traveled " + numMilesTraveled + " miles";
    };

    const getImpactStatement = () => {
        return props.sliderVal;
    };

    return (
        <>
            {
                [
                    <IntroSlide
                        title="Drive Less"
                        description="Drive Less is good"
                        hasInput={true}
                        inputQuestion="How many miles do you travel per day on average?"
                        unit="miles"
                        onSubmit={handleIntroSubmit}
                    />,
                    <ImpactSlide
                        rec={getRecommendation()}
                        impact={getImpactStatement()}
                        onAlreadyDoThisClick={handleAlreadyDoThisClick}
                        onAddGoalClick={handleAddGoalClick}
                        onMaybeLaterClick={handleMaybeLaterClick}
                    />,
                    <AlreadyDoThisSlide />,
                    <AddGoalSlide />,
                    <MaybeLaterSlide />,
                ][currSlide]
            }
        </>
    );
}
