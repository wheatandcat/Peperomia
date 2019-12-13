import * as SQLite from 'expo-sqlite';
import React, { Component } from 'react';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { db, ResultError } from '../../../lib/db';
import {
  selectByItemId,
  ItemDetail,
  update as updateItemDetail,
} from '../../../lib/db/itemDetail';
import Page from './Page';

type Props = {
  navigation: NavigationScreenProp<NavigationRoute>;
  onAdd: (items: ItemDetail[]) => void;
  onSort: (items: ItemDetail[]) => void;
  onDelete: () => void;
};

type State = {
  items: ItemDetail[];
  refresh: string;
};

export default class extends Component<Props, State> {
  state = { items: [], refresh: '' };

  componentDidMount() {
    const itemId = this.props.navigation.getParam('itemId', '1');

    this.getData(itemId);
  }

  componentDidUpdate() {
    const refresh = this.props.navigation.getParam('refresh', '');
    const itemId = this.props.navigation.getParam('itemId', '1');

    if (this.state.refresh === refresh) {
      return;
    }

    this.setState({ refresh: refresh });
    this.getData(itemId);
  }

  getData = (itemId: string) => {
    db.transaction((tx: SQLite.Transaction) => {
      selectByItemId(tx, itemId, this.setItems);
    });
  };

  setItems = (data: ItemDetail[], error: ResultError) => {
    if (error) {
      return;
    }

    const prioritys = data.map(item => item.priority);
    const uniquePrioritys = prioritys.filter(
      (x: number, i: number, self: number[]) => self.indexOf(x) === i
    );

    // priorityが重複していない
    if (prioritys.length === uniquePrioritys.length) {
      this.props.navigation.setParams({
        items: data,
      });
      this.setState({ items: data });
    }

    // priorityが重複している場合はid順でpriorityをupdateする
    const items: ItemDetail[] = data.map((item: ItemDetail, index: number) => ({
      ...item,
      priority: index + 1,
    }));

    db.transaction((tx: SQLite.Transaction) => {
      items.forEach(async (item, index) => {
        item.priority = index + 1;
        await updateItemDetail(tx, item, this.save);
      });
    });

    this.setState({ items: items });
  };

  save = () => {};

  onScheduleDetail = (id: string) => {
    const itemId = this.props.navigation.getParam('itemId', '1');

    this.props.navigation.navigate('ScheduleDetail', {
      scheduleDetailId: id,
      refreshData: () => this.getData(itemId),
    });
  };

  render() {
    return (
      <Page
        data={this.state.items}
        onScheduleDetail={this.onScheduleDetail}
        onAdd={() => this.props.onAdd(this.state.items)}
        onSort={() => this.props.onSort(this.state.items)}
        onDelete={this.props.onDelete}
      />
    );
  }
}
