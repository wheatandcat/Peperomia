import React, { useState, memo, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'lib/navigation';
import { useItems, ContextProps as ItemContextProps } from 'containers/Items';
import { useAuth } from 'containers/Auth';
import { UpdateCalendar } from 'domain/calendar';
import getKind from 'lib/getKind';
import { SuggestItem } from 'lib/suggest';
import { useDidMount } from 'hooks/index';
import { updateItem } from 'lib/item';
import { createCalendar, updateCalendar } from 'lib/calendar';
import Page from 'components/templates/CreatePlan/Page';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditPlan'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'EditPlan'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
  title: string;
  kind: string;
};

type ConnectedProps = Pick<
  ItemContextProps,
  'items' | 'refreshData' | 'calendars'
> &
  Props;

type PlanProps = Props &
  Pick<ItemContextProps, 'items' | 'refreshData'> & {
    input: {
      title: string;
      date: string;
    };
    kind: string;
    onInput: (name: string, value: any) => void;
    onSave: () => void;
    onIcons: () => void;
    onHome: () => void;
  };

type State = {
  input: {
    title: string;
    date: string;
  };
  kind: string;
  calendar: UpdateCalendar;
};

const EditPlan: React.FC<Props> = (props) => {
  const { refreshData, items, calendars } = useItems();

  return (
    <Connected
      {...props}
      items={items}
      refreshData={refreshData}
      calendars={calendars}
    />
  );
};

export default EditPlan;

export const Connected: React.FC<ConnectedProps> = memo((props) => {
  const { uid } = useAuth();
  const id = props.route?.params?.id || 0;
  const kind = props.route?.params?.kind || '';

  const [state, setState] = useState<State>({
    input: { title: '', date: '' },
    kind: '',
    calendar: {
      id: 0,
      itemId: 0,
      date: '',
    },
  });

  useDidMount(() => {
    let input: {
      date: string;
      title: string;
    } = {
      date: '',
      title: '',
    };

    const calendar = (props.calendars || []).find(
      (item) => Number(id) === Number(item.itemId)
    );

    if (calendar && calendar.date) {
      input.date = calendar.date;
      setState((s) => ({
        ...s,
        ...state,
        calendar,
      }));
    }

    const schedule = (props.items || []).find(
      (item) => Number(id) === Number(item.id)
    );

    if (schedule && schedule.title) {
      input.title = schedule.title;
    }

    setState((s) => ({
      ...s,
      input,

      kind,
    }));
  });

  useEffect(() => {
    if (kind !== state.kind) {
      setState((s) => ({
        ...s,
        kind,
      }));
    }
  }, [kind, state]);

  const onInput = useCallback(
    (name: string, value: any) => {
      const input = {
        ...state.input,
        [name]: value,
      };

      setState((s) => ({
        ...s,
        input,
      }));
    },
    [state]
  );

  const save = useCallback(() => {
    props.navigation.navigate('Schedule', {
      itemId: id,
      title: state.input.title,
    });
  }, [props.navigation, id, state.input.title]);

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
      id,
      title: state.input.title,
      kind: state.kind || getKind(state.input.title),
    };

    const ok = await updateItem(uid, item);
    if (!ok) {
      Alert.alert('保存に失敗しました');
      return;
    }

    save();

    if (!state.input.date) {
      return;
    }

    if (state.calendar.id) {
      const calendar = {
        ...state.calendar,
        id: state.calendar.id || '',
        date: state.input.date,
      };
      const ok2 = await updateCalendar(uid, calendar);
      if (!ok2) {
        Alert.alert('保存に失敗しました');
        return;
      }
    } else {
      const calendar = {
        itemId: id,
        date: state.input.date,
      };
      const insertID = await createCalendar(uid, calendar);
      if (!insertID) {
        Alert.alert('保存に失敗しました');
        return;
      }
    }

    if (props.refreshData) {
      props.refreshData();
    }
  }, [
    props,
    id,
    save,
    state.calendar,
    state.input.date,
    state.input.title,
    state.kind,
    uid,
  ]);

  const onIcons = useCallback(() => {
    props.navigation.navigate('Icons', {
      kind: getKind(state.input.title),
      onSelectIcon: (selectedKind: string) => {
        props.navigation.navigate('EditPlan', {
          kind: selectedKind,
        });
      },
      onDismiss: () => {
        props.navigation.navigate('EditPlan');
      },
      photo: true,
    });
  }, [props.navigation, state.input.title]);

  const onHome = useCallback(() => {
    props.navigation.goBack();
  }, [props.navigation]);

  return (
    <Plan
      {...props}
      input={state.input}
      kind={state.kind}
      items={props.items}
      refreshData={props.refreshData}
      onInput={onInput}
      onSave={onSave}
      onIcons={onIcons}
      onHome={onHome}
    />
  );
});

type PlanState = {
  suggestList: SuggestItem[];
};

const Plan = memo((props: PlanProps) => {
  const [state, setState] = useState<PlanState>({
    suggestList: [],
  });

  useDidMount(() => {
    const suggestList = (props.items || []).map((item) => ({
      title: item.title,
      kind: item.kind,
    }));

    setState((s) => ({
      ...s,
      suggestList,
    }));
  });

  const onSave = useCallback(async () => {
    await props.onSave();

    if (props.refreshData) {
      props.refreshData();
    }
  }, [props]);

  return (
    <Page
      mode="edit"
      title={props.input.title}
      date={props.input.date}
      kind={props.kind}
      suggestList={state.suggestList}
      onInput={props.onInput}
      onSave={onSave}
      onIcons={props.onIcons}
      onHome={props.onHome}
    />
  );
});
