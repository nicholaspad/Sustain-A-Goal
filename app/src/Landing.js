import { Button } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import { theme } from "./App.js";

export function Landing() {
    const history = useHistory();

    return (
        <>
            <ThemeProvider theme={theme}>
                <div id="landing-container">
                    <div id="landing-button-container">
                        <div id="landing-site-name">Sustain-A-Goal</div>
                        <Button
                            id="landing-login-button"
                            variant="contained"
                            color="primary"
                            onClick={() => history.push("/login")}
                        >
                            Login
                        </Button>
                        <Button
                            id="landing-signup-button"
                            variant="contained"
                            color="secondary"
                            onClick={() => history.push("/sign-up")}
                        >
                            Signup
                        </Button>
                    </div>
                </div>
            </ThemeProvider>
            <div id="landing-bg"></div>
        </>
    );
}
