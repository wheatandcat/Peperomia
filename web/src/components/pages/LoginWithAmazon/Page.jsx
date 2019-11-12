import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import queryString from "query-string";
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
    loading: false
  };

  componentDidMount() {
    console.log(window.location.origin + window.location.pathname);

    const parsed = queryString.parse(window.location.search);
    if (parsed.accessToken) {
      this.setState({
        loading: true
      });
    }
    if (parsed.access_token) {
      this.setState({
        loading: true
      });
      const redirectUrl = window.localStorage.getItem("redirect_uri");
      const url = `${redirectUrl}?accessToken=${parsed.access_token}`;
      // アクセストークンが取得できた場合はリダイレクト
      //alert(url);
      window.location = `${url}?accessToken=${parsed.access_token}`;
    }
  }

  onLogin = async () => {
    const parsed = queryString.parse(window.location.search);
    if (!parsed.redirect_uri) {
      return;
    }
    await window.localStorage.setItem("redirect_uri", parsed.redirect_uri);

    const options = { scope: "profile" };
    global.amazon.Login.authorize(
      options,
      window.location.origin + window.location.pathname
    );
  };

  render() {
    if (this.state.loading) {
      return <div>読込中</div>;
    }
    return (
      <div>
        <Card>
          <CardContent>
            <div>1</div>
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
