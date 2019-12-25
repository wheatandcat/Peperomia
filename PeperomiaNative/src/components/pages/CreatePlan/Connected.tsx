import * as ImageManipulator from 'expo-image-manipulator';
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
import { db, ResultError } from '../../../lib/db';
import { insert as insertItem, Item } from '../../../lib/db/item';
import { insert as insertCalendar, Calendar } from '../../../lib/db/calendar';
import { SuggestItem } from '../../../lib/suggest';
import getKind from '../../../lib/getKind';
import { useDidMount } from '../../../hooks/index';
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

  const onImage = useCallback((image: string) => {
    setState(s => ({
      ...s,
      image,
    }));
  }, []);

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
    (insertId: number, error: ResultError) => {
      if (error) {
        Alert.alert('保存に失敗しました');
        return;
      }

      if (state.input.date) {
        // 日付のデータがある場合ははcalendarに登録する
        db.transaction((tx: SQLite.Transaction) => {
          const item: Calendar = {
            itemId: insertId,
            date: state.input.date,
          };

          insertCalendar(tx, item, (_, err: ResultError) => {
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

    let image = '';
    if (state.image) {
      const manipResult = await ImageManipulator.manipulateAsync(
        state.image,
        [{ rotate: 0 }, { flip: ImageManipulator.FlipType.Vertical }],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG, base64: true }
      );

      image = manipResult.base64 || '';
    }

    db.transaction((tx: SQLite.Transaction) => {
      const item: Item = {
        title: state.input.title,
        kind: state.kind || getKind(state.input.title),
        image,
      };

      insertItem(tx, item, save);
    });
  }, [
    props.calendars,
    save,
    state.image,
    state.input.date,
    state.input.title,
    state.kind,
  ]);

  const onHome = useCallback(() => {
    props.navigation.goBack(null);
  }, [props.navigation]);

  return (
    <Page
      mode="new"
      title={state.input.title}
      date={state.input.date}
      image={state.image}
      kind={state.kind}
      suggestList={state.suggestList}
      onInput={onInput}
      onImage={onImage}
      onSave={onSave}
      onIcons={onIcons}
      onHome={onHome}
    />
  );
});
