import React, { Component } from "react";
import "typeface-roboto";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Page from "./components/pages/Schedule/Connected";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: green
  }
});
class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <div>
            <Route path="/:id" component={Page} />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
