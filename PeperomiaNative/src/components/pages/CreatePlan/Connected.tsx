import React, { useState, memo, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'lib/navigation';
import { useItems, ContextProps as ItemContextProps } from 'containers/Items';
import { useAuth } from 'containers/Auth';
import { SuggestItem } from 'lib/suggest';
import getKind from 'lib/getKind';
import { useDidMount } from 'hooks/index';
import { createItem } from 'lib/item';
import { createCalendar } from 'lib/calendar';
import Page from 'components/templates/CreatePlan/Page';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreatePlan'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'CreatePlan'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

type State = {
  input: {
    title: string;
    date: string;
  };
  kind: string;
  suggestList: SuggestItem[];
};

const CreatePlan: React.FC<Props> = (props) => {
  const { items, refreshData, calendars } = useItems();

  return (
    <Connect
      {...props}
      items={items}
      refreshData={refreshData}
      calendars={calendars}
    />
  );
};

export default CreatePlan;

type ConnectProps = Props &
  Pick<ItemContextProps, 'items' | 'refreshData' | 'calendars'>;

const Connect: React.FC<ConnectProps> = memo((props) => {
  const { uid } = useAuth();
  const [state, setState] = useState<State>({
    input: { title: '', date: '' },
    kind: '',
    suggestList: [],
  });

  const date = props.route?.params?.date || '';
  const kind = props.route?.params?.kind || '';

  useDidMount(() => {
    const suggestList = (props.items || []).map((item) => ({
      title: item.title,
      kind: item.kind,
    }));

    setState((s) => ({
      ...s,
      suggestList,
      input: {
        ...s.input,
        date,
      },
    }));
  });

  useEffect(() => {
    if (kind && kind !== state.kind) {
      setState((s) => ({
        ...s,
        kind,
      }));
    }
  }, [kind, state.kind]);

  const onIcons = useCallback(() => {
    props.navigation.navigate('Icons', {
      kind: getKind(state.input.title),
      onSelectIcon: (selectedKind: string) => {
        props.navigation.navigate('CreatePlan', {
          kind: selectedKind,
        });
      },
      onDismiss: () => {
        props.navigation.navigate('CreatePlan');
      },
      photo: true,
    });
  }, [props.navigation, state.input.title]);

  const pushCreateSchedule = useCallback(
    (itemId: number | string) => {
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
    setState((s) => ({
      ...s,
      input: {
        ...s.input,
        [name]: value,
      },
    }));
  }, []);

  const save = useCallback(
    async (insertId: number | string) => {
      if (state.input.date) {
        // 日付のデータがある場合ははcalendarに登録する
        const calendar = {
          itemId: insertId,
          date: state.input.date,
        };

        const insertID = await createCalendar(uid, calendar);

        if (!insertID) {
          Alert.alert('保存に失敗しました');
          return;
        }

        pushCreateSchedule(insertId);
      } else {
        pushCreateSchedule(insertId);
      }
    },
    [pushCreateSchedule, state.input.date, uid]
  );

  const onSave = useCallback(async () => {
    if (state.input.date) {
      const check = (props.calendars || []).find(
        (calendar) => calendar.date === state.input.date
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

    const insertID = await createItem(uid, item);
    if (!insertID) {
      Alert.alert('保存に失敗しました');
      return;
    }

    save(insertID);
  }, [
    props.calendars,
    save,
    state.input.date,
    state.input.title,
    state.kind,
    uid,
  ]);

  const onHome = useCallback(() => {
    props.navigation.goBack();
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
