import * as SQLite from 'expo-sqlite';
import React, { Component } from 'react';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import uuidv1 from 'uuid/v1';
import { db } from '../../../lib/db';
import { Item } from '../../../lib/db/item';
import {
  ItemDetail,
  delete1st,
  selectByItemId,
  sortItemDetail,
} from '../../../lib/db/itemDetail';
import { getItemByID } from '../../../lib/item';
import { getItemDetailByID } from '../../../lib/itemDetail';
import { ContextProps } from '../../../containers/Items';
import Page from './Page';

type State = {
  item: Item;
  itemDetail: ItemDetail;
};

type Props = Pick<ContextProps, 'refreshData'> & {
  navigation: NavigationScreenProp<NavigationRoute>;
  onEdit: (
    title: string,
    kind: string,
    place: string,
    url: string,
    memo: string,
    moveMinutes: number,
    priority: number
  ) => void;
};

export default class extends Component<Props, State> {
  state = {
    item: {
      id: 0,
      title: '',
      image: '',
      kind: '',
    },
    itemDetail: {
      id: 0,
      itemId: 0,
      kind: '',
      title: '',
      memo: '',
      place: '',
      url: '',
      moveMinutes: 0,
      priority: 0,
    },
  };

  async componentDidMount() {
    const scheduleDetailId = this.props.navigation.getParam(
      'scheduleDetailId',
      '1'
    );
    const itemDetail = await getItemDetailByID<ItemDetail>(
      null,
      String(scheduleDetailId)
    );

    const item = await getItemByID<Item>(null, String(itemDetail?.id));

    this.setState({ item, itemDetail });
  }

  onDismiss = () => {
    this.props.navigation.goBack();
  };

  onCreateScheduleDetail = () => {
    const {
      title,
      kind,
      place,
      url,
      memo,
      moveMinutes,
      priority,
    } = this.state.itemDetail;
    this.props.onEdit(title, kind, place, url, memo, moveMinutes, priority);
  };

  onDelete = () => {
    db.transaction((tx: SQLite.SQLTransaction) => {
      delete1st(
        tx,
        String(this.state.itemDetail.id),
        (_, error: SQLite.SQLError | null) => {
          if (error) {
            return;
          }
          selectByItemId(
            tx,
            String(this.state.itemDetail.itemId),
            itemDetails => {
              if (itemDetails.length === 0) {
                this.onPushSchedule([], null);
              } else {
                sortItemDetail(tx, itemDetails, this.onPushSchedule);
              }
            }
          );
        }
      );
    });
  };

  onPushSchedule = (_: ItemDetail[], error: SQLite.SQLError | null) => {
    if (error) {
      return;
    }

    if (this.props.refreshData) {
      this.props.refreshData();
      this.props.navigation.navigate('Schedule', {
        itemId: this.state.itemDetail.itemId,
        title: this.state.item.title,
        refresh: uuidv1(),
      });
    }
  };

  render() {
    if (this.state.itemDetail.id === 0) {
      return null;
    }
    return (
      <Page
        {...this.state.itemDetail}
        onDismiss={this.onDismiss}
        onDelete={this.onDelete}
        onCreateScheduleDetail={this.onCreateScheduleDetail.bind(this)}
      />
    );
  }
}
