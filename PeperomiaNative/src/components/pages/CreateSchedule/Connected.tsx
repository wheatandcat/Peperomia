import * as SQLite from 'expo-sqlite';
import React, { Component } from 'react';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { Alert } from 'react-native';
import { db, ResultError } from '../../../lib/db';
import { Item, select1st } from '../../../lib/db/item';
import {
  selectByItemId,
  ItemDetail,
  update as updateItemDetail,
} from '../../../lib/db/itemDetail';
import { ItemProps } from '../../organisms/Schedule/Cards';
import Page from '../../templates/CreateSchedule/Page';

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>;
}

interface State {
  item: Item;
  items: ItemProps[];
  refresh: string;
}

export default class extends Component<Props, State> {
  state = {
    item: { title: '', kind: '', image: '' },
    items: [],
    refresh: '0',
  };

  componentDidMount() {
    const itemId = this.props.navigation.getParam('itemId', '1');

    db.transaction((tx: SQLite.Transaction) => {
      select1st(tx, itemId, this.setItem);
      selectByItemId(tx, itemId, this.setItems);
    });
  }

  componentDidUpdate() {
    const refresh = this.props.navigation.getParam('refresh', '0');

    if (refresh !== this.state.refresh) {
      const itemId = this.props.navigation.getParam('itemId', '1');
      db.transaction((tx: SQLite.Transaction) => {
        selectByItemId(tx, itemId, this.setItems);
      });

      this.setState({ refresh });
    }
  }

  setItem = (data: Item, error: ResultError) => {
    if (error) {
      return;
    }

    this.setState({
      item: {
        title: data.title,
        kind: data.kind,
        image: data.image,
      },
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

  onCreateScheduleDetail = () => {
    const itemId = this.props.navigation.getParam('itemId', '1');

    this.props.navigation.navigate('CreateScheduleDetail', {
      itemId,
    });
  };

  onScheduleDetail = (id: string) => {
    this.props.navigation.navigate('ScheduleDetail', {
      scheduleDetailId: id,
      priority: this.state.items.length + 1,
    });
  };

  onFinish = () => {
    if (this.state.items.length === 0) {
      Alert.alert(
        'まだ予定の設定がありません',
        '本当に完了しますか？',
        [
          {
            text: 'キャンセル',
            style: 'cancel',
          },
          {
            text: '完了する',
            onPress: () => {
              this.props.navigation.navigate('Home', { refresh: true });
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      this.props.navigation.navigate('Home', { refresh: true });
    }
  };

  onGoBack = () => {
    if (this.state.items.length === 0) {
      Alert.alert(
        'まだ予定の設定がありません',
        '本当に閉じますか？',
        [
          {
            text: 'キャンセル',
            style: 'cancel',
          },
          {
            text: '閉じる',
            onPress: () => {
              this.props.navigation.navigate('Home', { refresh: true });
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      this.props.navigation.navigate('Home', { refresh: true });
    }
  };

  render() {
    return (
      <Page
        title={this.state.item.title}
        kind={this.state.item.kind}
        image={this.state.item.image}
        data={this.state.items}
        onScheduleDetail={this.onScheduleDetail}
        onCreateScheduleDetail={this.onCreateScheduleDetail}
        onFinish={this.onFinish}
        onGoBack={this.onGoBack}
      />
    );
  }
}
