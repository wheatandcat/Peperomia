import React, { Component } from "react";
import SortableList from "react-native-sortable-list";
import getKind from "../../../lib/getKind";
import Card from "../../molecules/Schedule/Card";
import Row from "./Row";

type DataKey = string | number;

export interface ItemProps {
  id: string;
  title: string;
  moveMinutes: number | null;
}

export interface Props {
  data: ItemProps[];
  onChange: (data: any) => void;
}

export interface RowProps {
  data: ItemProps;
  active: boolean;
}

export default class extends Component<Props> {
  renderItem({ data, active }: { data: ItemProps; active: boolean }) {
    return (
      <Row active={active}>
        <Card id={data.id} title={data.title} kind={getKind(data.title)} />
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
    const obj = this.props.data.reduce((o, c) => ({ ...o, [c.id]: c }), {});

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
