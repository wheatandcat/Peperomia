import React, { createContext, Component } from 'react';
import { Item } from '../lib/db/item';
import { SelectCalendar } from '../lib/db/calendar';
import { SelectItemDetail } from '../domain/itemDetail';
import { getItems } from '../lib/item';
import { getItemDetails } from '../lib/itemDetail';
import { getCalendars } from '../lib/calendar';

export const Context = createContext<ContextProps>({});
const { Provider } = Context;

type ItemAbout = {
  itemId: number | string;
  about: string;
};

type Props = {};

type State = {
  loading: boolean;
  items: Item[];
  itemDetails: SelectItemDetail[];
  about: ItemAbout[];
  calendars: SelectCalendar[];
};

export type ContextProps = Partial<
  Pick<State, 'items' | 'itemDetails' | 'about' | 'calendars'> & {
    refreshData: () => void;
    itemsLoading: boolean;
  }
>;

class Connected extends Component<Props, State> {
  state = {
    loading: true,
    calendarsLoading: true,
    items: [],
    itemDetails: [],
    about: [],
    calendars: [],
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({
      loading: true,
    });
    const items = await getItems<Item[]>(null);

    this.setState({
      items: items,
      about: [],
    });

    items.map(async (val: Item) => {
      const itemDetails = await getItemDetails<SelectItemDetail[]>(
        null,
        String(val.id)
      );
      this.setItemsDetail(itemDetails);
    });

    const calendars = await getCalendars<SelectCalendar[]>(null);

    this.setState({
      calendars,
    });
  };

  setItemsDetail = (data: SelectItemDetail[]) => {
    const names = data.map((val: SelectItemDetail) => val.title).join(' → ');
    const itemId = data[0].itemId;
    const about = [
      ...this.state.about,
      {
        itemId: itemId,
        about: names,
      },
    ];

    this.setState({
      about,
      loading: false,
      itemDetails: [...this.state.itemDetails, ...data],
    });
  };

  render() {
    return (
      <Provider
        value={{
          items: this.state.items,
          itemDetails: this.state.itemDetails,
          calendars: this.state.calendars,
          about: this.state.about,
          refreshData: this.getData,
          itemsLoading: this.state.loading,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default Connected;

export const Consumer = Context.Consumer;
