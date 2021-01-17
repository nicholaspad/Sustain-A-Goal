import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import { useState, useEffect } from "react";
import { getGoals, updateGoalStatus } from "./Firebase";

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: "20%",
        marginTop: 50,
        width: "100%",
        maxWidth: 400,
    },
}));

export function Checklist() {
    const classes = useStyles();

    const [goals, setGoals] = useState({});

    const handleToggle = (goalString, currFulfilled, goalType) => {
        // updateGoalStatus(goalString, currFulfilled, goalType);
    };

    useEffect(() => {
        getGoals("emissions", setGoals);
    }, []);

    return (
        <>
            <List className={classes.root}>
                {Object.keys(goals).map((goal) => {
                    const labelId = `checkbox-list-secondary-label-${goal}`;
                    return (
                        <ListItem key={goal} button>
                            {/* <ListItemAvatar>
                                <Avatar
                                    alt={`Avatar n°${value + 1}`}
                                    src={`/static/images/avatar/${value + 1}.jpg`}
                                />
                            </ListItemAvatar> */}
                            <ListItemText id={labelId} primary={goal} />
                            <ListItemSecondaryAction>
                                <Checkbox
                                    edge="end"
                                    onClick={handleToggle(
                                        goal,
                                        goals[goal].fulfilled,
                                        goals[goal].goalType
                                    )}
                                    checked={goals[goal].fulfilled}
                                    inputProps={{ "aria-labelledby": labelId }}
                                    disabled={goals[goal].alreadyDoing}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
        </>
    );
}
