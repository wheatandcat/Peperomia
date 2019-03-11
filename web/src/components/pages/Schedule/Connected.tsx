import React, { Component } from "react";
import { getPlan } from "../../../lib/firebase";

import Page from "./Page";

interface State {}

interface Props {}

export default class extends Component<Props, State> {
  state = {
    loading: true
  };

  async componentDidMount() {
    const result = await getPlan();
  }

  render() {
    return <Page />;
  }
}
