import React, { Component } from "react";
import { Navbar, Jumbotron, SideNav } from "./components";

// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
        <Jumbotron />
        <SideNav />
      </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
