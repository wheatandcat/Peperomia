import React, { memo, useCallback } from 'react';
import { Alert } from 'react-native';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import {
  useDeleteItemDetailMutation,
  useUpdateMainItemDetailMutation,
} from 'queries/api/index';
import useItemDetail from 'hooks/useItemDetail';
import { Props as IndexProps } from './';
import Plain from './Plain';

dayjs.extend(advancedFormat);

type Props = IndexProps & {
  date: string;
  itemId: string;
  itemDetailId: string;
  onCallback: () => Promise<void>;
};

export type ConnectedType = {
  date: string;
  onDismiss: () => void;
  onUpdate: () => void;
  onUpdateMain: () => void;
  onDelete: () => void;
};

const Connected: React.FC<Props> = (props) => {
  const [deleteItemDetailMutation] = useDeleteItemDetailMutation({
    async onCompleted() {
      await props.onCallback();

      props.navigation.goBack();
    },
    onError(err) {
      Alert.alert('削除に失敗しました', err.message);
    },
  });
  const [updateMainItemDetailMutation] = useUpdateMainItemDetailMutation({
    async onCompleted() {
      await props.onCallback();

      props.navigation.goBack();
    },
    onError(err) {
      Alert.alert('変更に失敗しました', err.message);
    },
  });

  const { data, loading, error, refetch } = useItemDetail({
    variables: {
      date: props.date,
      itemId: props.itemId,
      itemDetailId: props.itemDetailId,
    },
  });

  const onCallback = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const onDismiss = useCallback(() => {
    props.navigation.goBack();
  }, [props.navigation]);

  const onUpdate = useCallback(() => {
    props.navigation.navigate('EditItemDetail', {
      date: props.date,
      itemId: props.itemId,
      itemDetailId: props.itemDetailId,
      onCallback,
    });
  }, [props, onCallback]);

  const onUpdateMain = useCallback(() => {
    const variables = {
      itemDetail: {
        id: props.itemDetailId,
        date: props.date,
        itemId: props.itemId,
      },
    };

    updateMainItemDetailMutation({ variables });
  }, [updateMainItemDetailMutation, props]);

  const onDelete = useCallback(() => {
    const variables = {
      itemDetail: {
        id: props.itemDetailId,
        date: props.date,
        itemId: props.itemId,
      },
    };

    deleteItemDetailMutation({ variables });
  }, [deleteItemDetailMutation, props]);

  return (
    <Plain
      data={data}
      loading={loading}
      error={error}
      date={props.date}
      onDismiss={onDismiss}
      onUpdate={onUpdate}
      onUpdateMain={onUpdateMain}
      onDelete={onDelete}
    />
  );
};

export default memo(Connected);
