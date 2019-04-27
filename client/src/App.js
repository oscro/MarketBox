import React, { Component } from "react";
import { Navbar } from "./components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, NoMatch, SignIn, SignUp, SignInCom, SignUpCom } from "./pages";

// Theme for the website with a primary and secondary color set in the theme constant below
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#212121" },
    secondary: { main: "#eceff1" }
  },
  typography: { useNextVariants: true }
});

class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Navbar />
          <Router>
            <div>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/signincompany" component={SignInCom} />
                <Route exact path="/signup/user" component={SignUp} />
                <Route exact path="/signup/company" component={SignUpCom} />
                <Route component={NoMatch} />
              </Switch>
            </div>
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
