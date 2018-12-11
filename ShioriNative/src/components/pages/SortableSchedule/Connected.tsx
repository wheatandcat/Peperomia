import React, { Component } from "react";
import { ItemProps } from "../../organisms/Schedule/Cards";
import Page from "../../templates/SortableSchedule/Page";

interface Props {
  items: ItemProps[];
  onChangeItems: (data: ItemProps[]) => void;
}

export interface State {
  items: ItemProps[];
}

export default class extends Component<Props, State> {
  state = { items: this.props.items || [] };

  render() {
    return <Page data={this.state.items} onChange={this.props.onChangeItems} />;
  }
}
