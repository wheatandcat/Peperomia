import * as SQLite from 'expo-sqlite';
import React, {
  useState,
  memo,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import {
  Context as ItemsContext,
  ContextProps as ItemContextProps,
} from '../../../containers/Items';
import { db } from '../../../lib/db';
import { insert as insertCalendar, Calendar } from '../../../lib/db/calendar';
import { SuggestItem } from '../../../lib/suggest';
import getKind from '../../../lib/getKind';
import { useDidMount } from '../../../hooks/index';
import { createItem } from '../../../lib/item';
import Page from '../../templates/CreatePlan/Page';

type Props = {
  navigation: NavigationScreenProp<NavigationRoute>;
};

type State = {
  input: {
    title: string;
    date: string;
  };
  image: string;
  kind: string;
  suggestList: SuggestItem[];
};

export default (props: Props) => {
  const { items, refreshData, calendars } = useContext(ItemsContext);

  return (
    <Connect
      {...props}
      items={items}
      refreshData={refreshData}
      calendars={calendars}
    />
  );
};

type ConnectProps = Props &
  Pick<ItemContextProps, 'items' | 'refreshData' | 'calendars'>;

const Connect = memo((props: ConnectProps) => {
  const [state, setState] = useState<State>({
    input: { title: '', date: '' },
    image: '',
    kind: '',
    suggestList: [],
  });

  useDidMount(() => {
    const date = props.navigation.getParam('date', '');

    const suggestList = (props.items || []).map(item => ({
      title: item.title,
      kind: item.kind,
    }));

    setState(s => ({
      ...s,
      suggestList,
      input: {
        ...s.input,
        date,
      },
    }));
  });

  useEffect(() => {
    const image = props.navigation.getParam('image', '');
    if (image && image !== state.image) {
      setState(s => ({
        ...s,
        image,
      }));
    }

    const kind = props.navigation.getParam('kind', '');

    if (kind && kind !== state.kind) {
      setState(s => ({
        ...s,
        kind,
      }));
    }
  }, [props.navigation, state.image, state.kind]);

  const onIcons = useCallback(() => {
    props.navigation.navigate('Icons', {
      kind: getKind(state.input.title),
      onSelectIcon: (kind: string) => {
        props.navigation.navigate('CreatePlan', {
          kind: kind,
        });
      },
      onDismiss: () => {
        props.navigation.navigate('CreatePlan');
      },
      photo: true,
    });
  }, [props.navigation, state.input.title]);

  const pushCreateSchedule = useCallback(
    (itemId: number) => {
      if (props.refreshData) {
        props.refreshData();
      }

      props.navigation.navigate('CreateSchedule', {
        itemId,
        title: state.input.title,
      });
    },
    [props, state.input.title]
  );

  const onInput = useCallback((name: string, value: string) => {
    setState(s => ({
      ...s,
      input: {
        ...s.input,
        [name]: value,
      },
    }));
  }, []);

  const save = useCallback(
    (insertId: number) => {
      if (state.input.date) {
        // 日付のデータがある場合ははcalendarに登録する
        db.transaction((tx: SQLite.SQLTransaction) => {
          const item: Calendar = {
            itemId: insertId,
            date: state.input.date,
          };

          insertCalendar(tx, item, (_, err: SQLite.SQLError | null) => {
            if (err) {
              return;
            }

            pushCreateSchedule(insertId);
          });
        });
      } else {
        pushCreateSchedule(insertId);
      }
    },
    [pushCreateSchedule, state.input.date]
  );

  const onSave = useCallback(async () => {
    if (state.input.date) {
      const check = (props.calendars || []).find(
        calendar => calendar.date === state.input.date
      );

      if (check) {
        Alert.alert('同じ日にスケジュールが既に登録されています');
        return;
      }
    }

    const item = {
      title: state.input.title,
      kind: state.kind || getKind(state.input.title),
    };

    const insertID = await createItem(null, item);
    if (!insertID) {
      Alert.alert('保存に失敗しました');
      return;
    }

    save(Number(insertID));
  }, [props.calendars, save, state.input.date, state.input.title, state.kind]);

  const onHome = useCallback(() => {
    props.navigation.goBack(null);
  }, [props.navigation]);

  return (
    <Page
      mode="new"
      title={state.input.title}
      date={state.input.date}
      kind={state.kind}
      suggestList={state.suggestList}
      onInput={onInput}
      onSave={onSave}
      onIcons={onIcons}
      onHome={onHome}
    />
  );
});
