import React, { Component } from "react";
import { ItemDetail } from "../../../lib/db/itemDetail";
import Page from "../../templates/SortableSchedule/Page";

export interface SortableItemDetail extends ItemDetail {
  tmpId?: number;
}

interface Props {
  items: SortableItemDetail[];
  onChangeItems: (data: ItemDetail[]) => void;
}

export interface State {
  items: ItemDetail[];
  ready: boolean;
}

export default class extends Component<Props, State> {
  state = { items: this.props.items, ready: true };

  componentDidMount() {
    const items = this.state.items.map(item => ({
      ...item,
      tmpId: item.id,
      id: item.priority
    }));

    this.setState({ ready: false, items });
  }

  render() {
    return <Page data={this.state.items} onChange={this.props.onChangeItems} />;
  }
}
