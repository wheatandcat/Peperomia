import React, { Component } from "react";
import queryString from "query-string";
import styled from "styled-components";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";

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

    if (parsed.access_token) {
      this.setState({
        loading: true
      });
      const redirectUrl = window.localStorage.getItem("redirect_uri");
      const url = `${redirectUrl}?accessToken=${parsed.access_token}`;
      // アクセストークンが取得できた場合はリダイレクト
      window.location = url;
      console.log(`Bearer ${parsed.access_token}`);
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
    return (
      <Root>
        <Card>
          <Title>Alexaスキルとアカウントリンクする</Title>

          <Divider />

          {this.state.loading ? (
            <CircularProgress value={32} />
          ) : (
            <div id="LoginWithAmazon" onClick={this.onLogin}>
              <img
                border="0"
                alt="Login with Amazon"
                src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_156x32.png"
                width="156"
                height="32"
              />
            </div>
          )}
        </Card>
      </Root>
    );
  }
}

const Title = styled.div`
  background-color: #006835;
  color: #adcf01;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  background-color: #fff;
  width: 90%;
  height: 45%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Root = styled.div`
  background-color: #ccc;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
