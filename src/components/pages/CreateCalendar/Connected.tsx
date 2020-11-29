import React, { memo, useCallback, useState } from 'react';
import { Alert } from 'react-native';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import { useCreateCalendarMutation, NewItem } from 'queries/api/index';
import { ContextProps as CalendarsContextProps } from 'containers/Calendars';
import Plain from './Plain';
import { Props as IndexProps } from './';

dayjs.extend(advancedFormat);

type Props = IndexProps & {
  date: string;
} & Pick<CalendarsContextProps, 'refetchCalendars'>;

export type ConnectedType = {
  date: string;
  onDismiss: () => void;
  onSave: (item: NewItem) => void;
  onIcons: (kind: string) => void;
} & State;

type State = {
  selectedKind: string;
};

const Connected: React.FC<Props> = memo((props) => {
  const [state, setState] = useState<State>({ selectedKind: '' });
  const [
    createCalendarMutation,
    createCalendarMutationData,
  ] = useCreateCalendarMutation({
    async onCompleted({ createCalendar }) {
      await props.refetchCalendars?.();

      props.navigation.navigate('Calendar', {
        date: dayjs(createCalendar.date).format('YYYY-MM-DDT00:00:00'),
        create: true,
      });
    },
    onError(err) {
      Alert.alert('保存に失敗しました', err.message);
    },
  });

  const onSave = useCallback(
    (item: NewItem) => {
      const variables = {
        calendar: {
          date: props.date,
          item,
        },
      };

      createCalendarMutation({ variables });
    },
    [createCalendarMutation, props.date]
  );

  const onDismiss = useCallback(() => {
    props.navigation.goBack();
  }, [props.navigation]);

  const onIcons = useCallback(
    (kind: string) => {
      props.navigation.navigate('Icons', {
        kind,
        onCallback: (selectedKind: string) => {
          setState((s) => ({
            ...s,
            selectedKind,
          }));
          props.navigation.goBack();
        },
      });
    },
    [props]
  );

  return (
    <Plain
      {...state}
      date={props.date}
      mutationData={createCalendarMutationData}
      onDismiss={onDismiss}
      onSave={onSave}
      onIcons={onIcons}
    />
  );
});

export default Connected;
