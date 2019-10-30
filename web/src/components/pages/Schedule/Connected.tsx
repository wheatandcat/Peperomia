import React, { Component } from "react";
import { getPlan, onSnapshot, Plan } from "../../../lib/firebase";
import { Item, ItemDetail } from "../../../lib/item";
import Page from "./Page";
import Private from "./Private";

interface State {
  loading: boolean;
  item: Item;
  share: boolean;
  itemDetails: ItemDetail[];
  createDate: number;
  updating: boolean;
}

interface Props {
  match: any;
}

export default class extends Component<Props, State> {
  state = {
    loading: true,
    share: true,
    item: {
      id: 0,
      title: "",
      kind: "",
      image: ""
    },
    itemDetails: [],
    createDate: 0,
    updating: false
  };

  async componentDidMount() {
    if (this.props.match.params.id === "login") {
      return;
    }

    await this.getData();
    onSnapshot(this.props.match.params.id, this.onSnapshot);
  }

  getData = async () => {
    const result = await getPlan(this.props.match.params.id);

    if (!result) {
      return;
    }

    this.setState({
      loading: false,
      item: result.item,
      itemDetails: result.itemDetails,
      share: result.share,
      createDate: result.createDate.seconds
    });
  };

  onSnapshot = async (data: Plan) => {
    if (this.state.createDate === data.createDate.seconds) {
      return;
    }

    this.setState({
      updating: true
    });

    //データを更新
    await this.getData();

    setTimeout(() => {
      this.setState({
        updating: false
      });
    }, 3000);
  };

  render() {
    if (this.state.loading && !this.state.updating) {
      return null;
    }

    if (!this.state.share && !this.state.updating) {
      return <Private />;
    }

    return (
      <Page
        item={this.state.item}
        itemDetails={this.state.itemDetails}
        updating={this.state.updating}
      />
    );
  }
}
