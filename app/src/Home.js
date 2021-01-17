import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { ThemeProvider } from "@material-ui/styles";
import { logoutUser } from "./Firebase";
import { useHistory } from "react-router-dom";
import { theme } from "./App";
import { Recommendations } from "./Recommendations";
import { Checklist } from "./Checklist";

export function Home() {
    const history = useHistory();

    const handleLogout = (e) => {
        e.preventDefault();
        logoutUser(history);
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6">Sustain-A-Goal</Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginLeft: "auto" }}
                        onClick={handleLogout}
                    >
                        Sign Out
                    </Button>
                </Toolbar>
            </AppBar>
            <Recommendations />
            <Checklist />
        </ThemeProvider>
    );
}
