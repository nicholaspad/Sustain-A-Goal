import { Button } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import { theme } from "./App.js";

export function Landing() {
    const history = useHistory();

    return (
        <>
            <ThemeProvider theme={theme}>
                <Button variant="contained" color="primary" onClick={() => history.push("/login")}>
                    Login
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => history.push("/sign-up")}
                >
                    Signup
                </Button>
            </ThemeProvider>
        </>
    );
}
