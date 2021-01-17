import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { useState, useEffect } from "react";
import { updateGoalStatus, getGoals } from "./Firebase";

const useStyles = makeStyles((theme) => ({
    root: {
        // marginLeft: "20%",
        marginTop: 50,
        width: "100%",
        maxWidth: 400,
    },
}));

export function Checklist() {
    const classes = useStyles();

    const [goals, setGoals] = useState({});
    
    useEffect(() => {
        getGoals(setGoals);
    }, []);

    return (
        <div id="checklist-container">
            <h3>Goals Checklist</h3>
            <List className={classes.root}>
                {Object.keys(goals).length === 0 ? 
                        <ListItem key={0} button>
                            <ListItemText primary="No goals (yet)!" />
                            <ListItemSecondaryAction>
                                <Checkbox
                                    edge="end"
                                    checked={false}
                                    disabled={true}
                                />
                            </ListItemSecondaryAction>
                        </ListItem> 
                    :
                    Object.keys(goals).map((goal) => {
                    const labelId = `checkbox-list-secondary-label-${goal}`;
                    const currGoal = goals[goal];
            
                    if (!goals[goal]) return <></>;

                    const goalType = goals[goal].goalType;

                    return (
                        <ListItem key={goal} button>
                            <ListItemText id={labelId} primary={goal} />
                            <ListItemSecondaryAction>
                                <Checkbox
                                    edge="end"
                                    onChange={() => {
                                        updateGoalStatus(goal, currGoal.fulfilled, goalType);
                                    }}
                                    checked={currGoal.alreadyDoing || currGoal.fulfilled}
                                    inputProps={{ "aria-labelledby": labelId }}
                                    disabled={currGoal.alreadyDoing}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
        </div>
    );
}
