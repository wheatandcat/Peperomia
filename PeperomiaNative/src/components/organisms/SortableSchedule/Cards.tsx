import React, { Component } from "react";
import SortableList from "react-native-sortable-list";
import { SortableItemDetail } from "../../pages/SortableSchedule/Connected";
import Card from "../../molecules/Schedule/Card";
import Row from "./Row";

type DataKey = string | number;

export interface Props {
  data: SortableItemDetail[];
  onChange: (data: any) => void;
}

export default class extends Component<Props> {
  renderItem({ data, active }: { data: SortableItemDetail; active: boolean }) {
    return (
      <Row active={active}>
        <Card {...data} kind={data.kind} />
      </Row>
    );
  }

  onChange = (nextOrder: DataKey[]) => {
    const data = nextOrder.map(id => {
      return this.props.data.find(item => Number(item.id) === Number(id));
    });

    const result = data.map(item => ({ ...item, id: item && item.tmpId }));

    this.props.onChange(result);
  };

  render() {
    const obj = this.props.data.reduce(
      (o, c) => ({ ...o, [String(c.id)]: c }),
      {}
    );

    return (
      <SortableList
        data={obj}
        renderRow={this.renderItem}
        style={{ flex: 1 }}
        onChangeOrder={this.onChange}
      />
    );
  }
}
