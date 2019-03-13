import React, { Component } from "react";
import { getPlan } from "../../../lib/firebase";
import { Item, ItemDetail } from "../../../lib/item";

import Page from "./Page";

interface State {
  loading: boolean;
  item: Item;
  itemDetails: ItemDetail[];
}

interface Props {
  match: any;
}

export default class extends Component<Props, State> {
  state = {
    loading: true,
    item: {
      id: 0,
      title: "",
      kind: "",
      image: ""
    },
    itemDetails: []
  };

  async componentDidMount() {
    const result = await getPlan(this.props.match.params.id);
    if (!result) {
      return;
    }

    this.setState({
      loading: false,
      item: result.item,
      itemDetails: result.itemDetails
    });
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    return <Page item={this.state.item} itemDetails={this.state.itemDetails} />;
  }
}
