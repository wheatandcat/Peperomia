import React from "react";
import "typeface-roboto";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import { BrowserRouter, Route } from "react-router-dom";
import Page from "./components/pages/Schedule/Connected";
import LoginWithAmazon from "./components/pages/LoginWithAmazon/Page";

const theme = createMuiTheme({
  palette: {
    primary: green
  }
});

export default () => (
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <div>
        <Route path="/login/amazon" component={LoginWithAmazon} />
        <Route path="/share/:id" component={Page} />
        <Route path="/:id" component={Page} />
      </div>
    </MuiThemeProvider>
  </BrowserRouter>
);
