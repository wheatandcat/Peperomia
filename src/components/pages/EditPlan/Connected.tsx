import React, { useState, memo, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { ActionSheetOptions } from '@expo/react-native-action-sheet';
import { ContextProps as ItemContextProps } from 'containers/Items';
import { ContextProps as AuthContextProps } from 'containers/Auth';
import { UpdateCalendar } from 'domain/calendar';
import { getKind } from 'peperomia-util';
import { useDidMount } from 'hooks/index';
import { updateItem } from 'lib/item';
import { createCalendar, updateCalendar } from 'lib/calendar';
import { Props } from './';
import Plain from './Plain';

type ConnectedProps = Props &
  Pick<ItemContextProps, 'items' | 'refreshData' | 'calendars'> &
  Pick<AuthContextProps, 'uid'> & {
    showActionSheetWithOptions: (
      options: ActionSheetOptions,
      callback: (i: number) => void
    ) => void;
  };

type State = {
  input: {
    title: string;
    date: string;
  };
  kind: string;
  calendar: UpdateCalendar;
};

export type ConnectType = {
  input: {
    title: string;
    date: string;
  };
  kind: string;
  onInput: (name: string, value: any) => void;
  onSave: () => void;
  onIcons: () => void;
  onHome: () => void;
  showActionSheetWithOptions: (
    options: ActionSheetOptions,
    callback: (i: number) => void
  ) => void;
};

const Connected: React.FC<ConnectedProps> = memo((props) => {
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
      (item) => String(id) === String(item.itemId)
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
      (item) => String(id) === String(item.id)
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

    const ok = await updateItem(props.uid, item);
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
      const ok2 = await updateCalendar(props.uid, calendar);
      if (!ok2) {
        Alert.alert('保存に失敗しました');
        return;
      }
    } else {
      const calendar = {
        itemId: id,
        date: state.input.date,
      };
      const insertID = await createCalendar(props.uid, calendar);
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
        props.navigation.navigate('EditPlan', {});
      },
      photo: true,
    });
  }, [props.navigation, state.input.title]);

  const onHome = useCallback(() => {
    props.navigation.goBack();
  }, [props.navigation]);

  return (
    <Plain
      {...props}
      input={state.input}
      kind={state.kind}
      items={props.items}
      refreshData={props.refreshData}
      onInput={onInput}
      onSave={onSave}
      onIcons={onIcons}
      onHome={onHome}
      showActionSheetWithOptions={props.showActionSheetWithOptions}
    />
  );
});

export default Connected;
