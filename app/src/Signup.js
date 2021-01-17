import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./App";
import { createUser } from "./Firebase";
import { useHistory } from "react-router-dom";

export function Signup() {
    const history = useHistory();

    const [errorState, setErrorState] = useState({
        error: false,
        errorType: "",
        errorMessage: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;
        createUser(email, password, history, setErrorState);
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <div id="signup-container">
                    <form id="signup-form" onSubmit={handleSubmit}>
                        <FormControl
                            required
                            error={errorState.error && errorState.errorType === "email"}
                        >
                            <InputLabel>Email address</InputLabel>
                            <Input
                                id="signup-email"
                                className="form-input"
                                aria-describedby="my-helper-text"
                            />
                            <FormHelperText>
                                {errorState.error && errorState.errorType === "email"
                                    ? errorState.errorMessage
                                    : ""}
                            </FormHelperText>
                        </FormControl>
                        <FormControl
                            required
                            error={errorState.error && errorState.errorType === "password"}
                        >
                            <InputLabel>Password</InputLabel>
                            <Input
                                id="signup-password"
                                className="form-input"
                                aria-describedby="my-helper-text"
                                type="password"
                            />
                            <FormHelperText>
                                {errorState.error && errorState.errorType === "password"
                                    ? errorState.errorMessage
                                    : ""}
                            </FormHelperText>
                        </FormControl>
                        <Button variant="contained" color="primary" type="submit">
                            Sign Up
                        </Button>
                    </form>
                </div>
            </ThemeProvider>
            <div id="landing-bg"></div>
        </>
    );
}
