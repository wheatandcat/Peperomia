import React, { Component } from "react";
import SortableList from "react-native-sortable-list";
import { ItemDetail } from "../../../lib/db/itemDetail";
import getKind from "../../../lib/getKind";
import Card from "../../molecules/Schedule/Card";
import Row from "./Row";

type DataKey = string | number;

export interface Props {
  data: ItemDetail[];
  onChange: (data: any) => void;
}

export interface RowProps {
  data: ItemDetail;
  active: boolean;
}

export default class extends Component<Props> {
  renderItem({ data, active }: { data: ItemDetail; active: boolean }) {
    return (
      <Row active={active}>
        <Card {...data} kind={getKind(data.title)} />
      </Row>
    );
  }

  onChange = (nextOrder: DataKey[]) => {
    const data = nextOrder.map(id => {
      return this.props.data.find(item => Number(item.id) === Number(id));
    });

    this.props.onChange(data);
  };

  render() {
    const obj = this.props.data.reduce(
      (o, c) => ({ ...o, [String(c.id)]: c }),
      {}
    );

    return (
      <SortableList
        data={obj}
        renderRow={this.renderItem.bind(this)}
        style={{ flex: 1 }}
        onChangeOrder={this.onChange}
      />
    );
  }
}
