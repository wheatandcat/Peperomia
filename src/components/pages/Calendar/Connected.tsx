import React, { memo, useCallback } from 'react';
import { Alert } from 'react-native';
import { useCalendarQuery } from 'queries/api/index';
import { useDeleteCalendarMutation } from 'queries/api/index';
import { ContextProps as CalendarsContextProps } from 'containers/Calendars';
import { Props as IndexProps } from './';
import Plain, { QueryProps } from './Plain';

export type CalendarType = QueryData<QueryProps, 'calendar'>;
export type ItemDetailType = ArrayType<CalendarType['item']['itemDetails']>;

type Props = IndexProps & {
  date: string;
} & Pick<CalendarsContextProps, 'refetchCalendars'>;

export type ConnectedType = {
  onDismiss: () => void;
  onDelete: () => void;
  onAddItemDetail: () => void;
  create: boolean;
};

const Connected: React.FC<Props> = memo((props) => {
  const [deleteCalendarMutation] = useDeleteCalendarMutation({
    async onCompleted() {
      await props.refetchCalendars?.();

      props.navigation.popToTop();
    },
    onError(err) {
      Alert.alert('保存に失敗しました', err.message);
    },
  });

  const { data, loading, error } = useCalendarQuery({
    variables: {
      date: props.date,
    },
  });

  const onDismiss = useCallback(async () => {
    await props.refetchCalendars?.();

    props.navigation.popToTop();
  }, [props]);

  const onDelete = useCallback(() => {
    const variables = {
      calendar: {
        date: props.date,
      },
    };

    deleteCalendarMutation({ variables });
  }, [deleteCalendarMutation, props.date]);

  const onAddItemDetail = useCallback(() => {
    props.navigation.navigate('AddItemDetail', {
      date: props.date,
      itemId: data?.calendar?.item.id || '',
      priority: (data?.calendar?.item.itemDetails?.length || 0) + 1,
      onCallback: async () => {
        await props.refetchCalendars?.();
      },
    });
  }, [props, data]);

  return (
    <Plain
      data={data}
      loading={loading}
      error={error}
      onDismiss={onDismiss}
      onAddItemDetail={onAddItemDetail}
      onDelete={onDelete}
      create={props.route.params.create || false}
    />
  );
});

export default Connected;
