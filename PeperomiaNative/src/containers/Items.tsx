import React, {
  FC,
  createContext,
  memo,
  useState,
  useCallback,
  useContext,
} from 'react';
import { SelectItem } from '../domain/item';
import { SelectCalendar } from '../domain/calendar';
import { SelectItemDetail } from '../domain/itemDetail';
import { getItems } from '../lib/item';
import { getItemDetails } from '../lib/itemDetail';
import { getCalendars } from '../lib/calendar';
import { useDidMount } from '../hooks/index';
import { Context as AuthContext } from './Auth';

export const Context = createContext<ContextProps>({});
const { Provider } = Context;

type ItemAbout = {
  itemId: number | string;
  about: string;
};

type Props = {};

type State = {
  loading: boolean;
  items: SelectItem[];
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

const initState = {
  loading: true,
  calendarsLoading: true,
  items: [],
  itemDetails: [],
  about: [],
  calendars: [],
};

const Connected: FC<Props> = memo(props => {
  const [state, setState] = useState<State>(initState);
  const { uid } = useContext(AuthContext);

  const setItemsDetail = useCallback(
    (data: SelectItemDetail[]) => {
      const names = data.map((val: SelectItemDetail) => val.title).join(' → ');
      const itemId = data[0].itemId;

      const about = [
        ...state.about,
        {
          itemId,
          about: names,
        },
      ];

      setState(s => ({
        ...s,
        about,
        loading: false,
        itemDetails: [...state.itemDetails, ...data],
      }));
    },
    [state]
  );

  const getData = useCallback(async () => {
    setState(s => ({
      ...s,
      loading: true,
    }));

    const items = await getItems(uid);

    setState(s => ({
      ...s,
      items: items,
      about: [],
    }));

    items.map(async val => {
      const itemDetails = await getItemDetails(uid, String(val.id));

      if (!itemDetails || itemDetails.length === 0) {
        return;
      }

      setItemsDetail(itemDetails);
    });

    const calendars = await getCalendars(uid);

    setState(s => ({
      ...s,
      calendars,
    }));
  }, [setItemsDetail, uid]);

  useDidMount(() => {
    getData();
  });

  return (
    <Provider
      value={{
        items: state.items,
        itemDetails: state.itemDetails,
        calendars: state.calendars,
        about: state.about,
        refreshData: getData,
        itemsLoading: state.loading,
      }}
    >
      {props.children}
    </Provider>
  );
});

export default Connected;

export const Consumer = Context.Consumer;
