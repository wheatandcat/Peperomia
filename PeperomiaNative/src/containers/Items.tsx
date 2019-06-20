import { SQLite } from "expo-sqlite";
import React, { createContext, Component } from "react";
import { db } from "../lib/db";
import { select as selectItems, Item } from "../lib/db/item";
import {
  selectByItemId as selectItemDetailByItemId,
  ItemDetail
} from "../lib/db/itemDetail";

const Context = createContext({});
const { Provider } = Context;

interface ItemAbout {
  itemId: number;
  about: string;
}

interface Props {}

interface State {
  loading: boolean;
  items: Item[];
  about: ItemAbout[];
}

export default class extends Component<Props, State> {
  state = {
    loading: true,
    items: [],
    about: []
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    db.transaction((tx: SQLite.Transaction) => {
      selectItems(tx, this.setItems);
    });
  };

  setItems = (data: any, error: any) => {
    if (error) {
      return;
    }
    this.setState({
      items: data,
      about: []
    });

    data.map((val: Item) => {
      db.transaction((tx: SQLite.Transaction) => {
        selectItemDetailByItemId(tx, String(val.id), this.setItemsDetail);
      });
    });
  };

  setItemsDetail = (data: any, error: any) => {
    if (error || !data || data.length === 0) {
      return;
    }

    const names = data.map((val: ItemDetail) => val.title).join("→");
    const itemId = data[0].itemId;
    const about = [
      ...this.state.about,
      {
        itemId: itemId,
        about: names
      }
    ];

    this.setState({
      about,
      loading: false
    });
  };

  render() {
    return (
      <Provider
        value={{
          items: this.state.items,
          about: this.state.about,
          refreshData: this.getData,
          itemsLoading: this.state.loading
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export const Consumer = Context.Consumer;
