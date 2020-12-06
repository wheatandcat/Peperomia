import React, { memo, useCallback } from 'react';
import { Alert, Dimensions } from 'react-native';
import { useDeleteCalendarMutation } from 'queries/api/index';
import { ContextProps as CalendarsContextProps } from 'containers/Calendars';
import { copyShareURL } from 'lib/share';
import {
  useUpdateCalendarPublicMutation,
  UpdateCalendarPublicMutationVariables,
} from 'queries/api/index';
import Toast from 'react-native-root-toast';
import useCalendar from 'hooks/useCalendar';
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
  onShare: (open: boolean) => void;
  onAddItemDetail: () => void;
  onItemDetail: (itemDetailId: string) => void;
  create: boolean;
};

const Connected: React.FC<Props> = memo((props) => {
  const [updateCalendarPublicMutation] = useUpdateCalendarPublicMutation({
    async onCompleted(r) {
      const id = r.updateCalendarPublic.id;
      const open = r.updateCalendarPublic.public;

      if (open) {
        copyShareURL(String(id));
      } else {
        const { height } = Dimensions.get('window');

        let toast = Toast.show('リンクを非公開にしました', {
          duration: Toast.durations.LONG,
          position: height - 150,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });

        setTimeout(function () {
          Toast.hide(toast);
        }, 3000);
      }
    },
    onError(err) {
      Alert.alert('公開に失敗しました', err.message);
    },
  });

  const [deleteCalendarMutation] = useDeleteCalendarMutation({
    async onCompleted() {
      await props.refetchCalendars?.();

      props.navigation.popToTop();
    },
    onError(err) {
      Alert.alert('削除に失敗しました', err.message);
    },
  });

  const { data, loading, error, refetch } = useCalendar({
    variables: {
      date: props.date,
    },
    fetchPolicy: 'network-only',
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
        await refetch?.();
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
        await refetch?.();
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
          await refetch?.();
        },
      });
    },
    [props, data, refetch]
  );

  const onShare = useCallback(
    async (open: boolean) => {
      const variables: UpdateCalendarPublicMutationVariables = {
        calendar: {
          date: props.date,
          public: open,
        },
      };
      updateCalendarPublicMutation({ variables });
    },
    [props, updateCalendarPublicMutation]
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
      onShare={onShare}
      create={props.route.params.create || false}
    />
  );
});

export default Connected;
