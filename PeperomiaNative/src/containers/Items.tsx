import { SQLite } from "expo-sqlite";
import React, { createContext, Component } from "react";
import { db, ResultError } from "../lib/db";
import { select as selectItems, Item } from "../lib/db/item";
import {
  selectByItemId as selectItemDetailByItemId,
  ItemDetail
} from "../lib/db/itemDetail";

const Context = createContext({});
const { Provider } = Context;

type ItemAbout = {
  itemId: number;
  about: string;
};

type Props = {};

type State = {
  loading: boolean;
  items: Item[];
  itemDetails: ItemDetail[];
  about: ItemAbout[];
};

export type ContextProps = Partial<
  Pick<State, "items" | "itemDetails" | "about"> & {
    refreshData: () => void;
    itemsLoading: Boolean;
  }
>;

class Connected extends Component<Props, State> {
  state = {
    loading: true,
    items: [],
    itemDetails: [],
    about: []
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState({
      loading: true
    });

    db.transaction((tx: SQLite.Transaction) => {
      selectItems(tx, this.setItems);
    });
  };

  setItems = (data: Item[], error: ResultError) => {
    if (error || !data || data.length === 0) {
      this.setState({
        loading: false
      });
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

  setItemsDetail = (data: ItemDetail[], error: ResultError) => {
    if (error || !data || data.length === 0) {
      this.setState({
        loading: false
      });
      return;
    }

    const names = data.map((val: ItemDetail) => val.title).join(" → ");
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
      loading: false,
      itemDetails: [...this.state.itemDetails, ...data]
    });
  };

  render() {
    return (
      <Provider
        value={{
          items: this.state.items,
          itemDetails: this.state.itemDetails,
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

export default Connected;
export const Consumer = Context.Consumer;
