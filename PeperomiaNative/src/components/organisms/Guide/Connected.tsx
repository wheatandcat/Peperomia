import React, { Component } from "react";
import Welcome from "./Welcome";
import Share from "./Share";

export interface State {
  page: number;
}

interface Props {
  onFinish: () => void;
}

const pages = [Welcome, Share];

export default class extends Component<Props, State> {
  state = {
    page: 0
  };

  onNext = () => {
    const page = this.state.page + 1;

    if (page >= pages.length) {
      this.onFinish();
      return;
    }

    this.setState({
      page
    });
  };

  onFinish = () => {
    this.props.onFinish();
  };

  render() {
    const Page = pages[this.state.page];

    return <Page onNext={this.onNext} />;
  }
}
