import React, { memo, useCallback } from 'react';
import { Alert } from 'react-native';
import { useCalendarQuery, useDeleteCalendarMutation } from 'queries/api/index';
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
  onUpdate: () => void;
  onDelete: () => void;
  onAddItemDetail: () => void;
  onItemDetail: (itemDetailId: string) => void;
  create: boolean;
};

const Connected: React.FC<Props> = memo((props) => {
  const [deleteCalendarMutation] = useDeleteCalendarMutation({
    async onCompleted() {
      await props.refetchCalendars?.();

      props.navigation.popToTop();
    },
    onError(err) {
      Alert.alert('削除に失敗しました', err.message);
    },
  });

  const { data, loading, error, refetch } = useCalendarQuery({
    variables: {
      date: props.date,
    },
    nextFetchPolicy: 'network-only',
  });

  const onDismiss = useCallback(async () => {
    await props.refetchCalendars?.();

    props.navigation.popToTop();
  }, [props]);

  const onUpdate = useCallback(() => {
    const itemDetail = (data?.calendar?.item?.itemDetails || []).find(
      (v) => v?.priority === 1
    );

    props.navigation.navigate('EditItemDetail', {
      date: props.date,
      itemId: data?.calendar?.item.id || '',
      itemDetailId: itemDetail?.id || '',
      onCallback: async () => {
        await props.refetchCalendars?.();
        await refetch();
      },
    });
  }, [props, refetch, data]);

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
        await refetch();
      },
    });
  }, [props, data, refetch]);

  const onItemDetail = useCallback(
    (itemDetailId: string) => {
      props.navigation.navigate('ItemDetail', {
        date: props.date,
        itemId: data?.calendar?.item.id || '',
        itemDetailId,
        onCallback: async () => {
          await refetch();
        },
      });
    },
    [props, data, refetch]
  );

  return (
    <Plain
      data={data}
      loading={loading}
      error={error}
      onDismiss={onDismiss}
      onAddItemDetail={onAddItemDetail}
      onUpdate={onUpdate}
      onDelete={onDelete}
      onItemDetail={onItemDetail}
      create={props.route.params.create || false}
    />
  );
});

export default Connected;
