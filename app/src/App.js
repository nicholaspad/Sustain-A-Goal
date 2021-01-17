import "./App.css";
import { createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Redirect, useHistory } from "react-router-dom";
import { Landing } from "./Landing";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { Home } from "./Home";

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#b3e5fc",
        },
        secondary: {
            main: "#c8e6c9",
        },
    },
    typography: {
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        fontSize: 16,
    },
});

function App() {
    return (
        <Router>
            <Route exact path={"/"}>
                <Redirect to={"/landing"} />
            </Route>
            <Route exact path={"/landing"}>
                <Landing />
            </Route>
            <Route exact path={"/login"}>
                <Login />
            </Route>
            <Route exact path={"/sign-up"}>
                <Signup />
            </Route>
            <Route exact path={"/home"}>
                <Home />
            </Route>
        </Router>
    );
}

export default App;
