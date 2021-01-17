import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FilterDramaIcon from "@material-ui/icons/FilterDrama";
import PublicIcon from "@material-ui/icons/Public";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import OpacityIcon from "@material-ui/icons/Opacity";
import { getImpact, getFulfilledImpact } from "./Firebase";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 700,
    },
}));

export function Impact() {
    const [allGoalsImpact, setAllGoalsImpact] = useState({});
    const [fulfilledGoalsImpact, setFulfilledGoalsImpact] = useState({});
    const [openEmissions, setOpenEmissions] = useState(true);
    const [openWater, setOpenWater] = useState(true);

    const handleClickEmissions = () => {
        setOpenEmissions(!openEmissions);
    };

    const handleClickWater = () => {
        setOpenWater(!openWater);
    };

    useEffect(() => {
        getImpact(setAllGoalsImpact);
        getFulfilledImpact(setFulfilledGoalsImpact);
    }, []);

    const classes = useStyles();

    return (
        <div id="impact-container">
            <div className={classes.root}>
                <h3 id="impact-title" className="center-text">
                    Impact Report
                </h3>
                <List component="nav" aria-label="impact categories">
                    <ListItem button onClick={handleClickEmissions}>
                        <ListItemIcon>
                            <FilterDramaIcon />
                        </ListItemIcon>
                        <ListItemText id="emissions-title" primary="Emissions" />
                        {openEmissions ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openEmissions} timeout="auto" unmountOnExit>
                        <List component="div">
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <PublicIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        allGoalsImpact.emissions
                                            ? `You could be saving ${parseInt(
                                                  allGoalsImpact.emissions
                                              )} pounds of CO2 every year - check off those goals!`
                                            : "No emissions goals set!"
                                    }
                                />
                            </ListItem>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <PersonOutlineIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        fulfilledGoalsImpact.emissions
                                            ? `You're on track to save ${parseInt(
                                                  fulfilledGoalsImpact.emissions
                                              )} pounds of CO2 annually - nice!`
                                            : "No emissions goals checked off!"
                                    }
                                />
                            </ListItem>
                        </List>
                    </Collapse>

                    <Divider />

                    <ListItem button onClick={handleClickWater}>
                        <ListItemIcon>
                            <OpacityIcon />
                        </ListItemIcon>
                        <ListItemText id="water-title" primary="Water" />
                        {openWater ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openWater} timeout="auto" unmountOnExit>
                        <List component="div">
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <PublicIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        allGoalsImpact.water
                                            ? `You could be saving ${parseInt(
                                                  allGoalsImpact.water
                                              )} gallons of water every year - check off those goals!`
                                            : "No water goals set!"
                                    }
                                />
                            </ListItem>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <PersonOutlineIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        fulfilledGoalsImpact.water
                                            ? `You're on track to save ${parseInt(
                                                  fulfilledGoalsImpact.water
                                              )} gallons of water annually - nice!`
                                            : "No water goals checked off!"
                                    }
                                />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </div>
        </div>
    );
}
