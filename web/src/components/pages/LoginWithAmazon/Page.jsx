import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

window.onAmazonLoginReady = function() {
  console.log(process.env);

  global.amazon.Login.setClientId(process.env.REACT_APP_AMAZON_LOGIN_CLIENT_ID);
};
(function(d) {
  var a = d.createElement("script");
  a.type = "text/javascript";
  a.async = true;
  a.id = "amazon-login-sdk";
  a.src = "https://assets.loginwithamazon.com/sdk/na/login1.js";
  d.getElementById("amazon-root").appendChild(a);
})(document);

export default class extends Component {
  state = {
    loading: true
  };

  onLogin = () => {
    const options = { scope: "profile" };
    global.amazon.Login.authorize(
      options,
      "http://localhost:3000/login/amazon"
    );
  };

  render() {
    return (
      <div>
        <Card>
          <CardContent>
            <div id="LoginWithAmazon" onClick={this.onLogin}>
              <img
                border="0"
                alt="Login with Amazon"
                src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_156x32.png"
                width="156"
                height="32"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
