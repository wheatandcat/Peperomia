import React, { memo, useCallback, useState } from 'react';
import { Alert } from 'react-native';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import {
  NewItem,
  UpdateItemDetailMutationVariables,
  useItemDetailQuery,
  useUpdateItemDetailMutation,
} from 'queries/api/index';
import Plain from './Plain';
import { Props as IndexProps } from './';

dayjs.extend(advancedFormat);

type Props = IndexProps & {
  date: string;
  itemId: string;
  itemDetailId: string;
  onCallback: () => void;
};

export type ConnectedType = {
  date: string;
  onDismiss: () => void;
  onSave: (updateItemDetail: NewItem) => void;
  onIcons: (kind: string) => void;
} & State;

type State = {
  selectedKind: string;
};

const Connected: React.FC<Props> = memo((props) => {
  const [state, setState] = useState<State>({ selectedKind: '' });
  const [
    updateItemDetailMutation,
    updateItemDetailMutationData,
  ] = useUpdateItemDetailMutation({
    async onCompleted() {
      await props?.onCallback?.();

      props.navigation.goBack();
    },
    onError(err) {
      Alert.alert('保存に失敗しました', err.message);
    },
  });
  const { data, loading, error } = useItemDetailQuery({
    variables: {
      date: props.date,
      itemId: props.itemId,
      itemDetailId: props.itemDetailId,
    },
  });

  const onSave = useCallback(
    (item: NewItem) => {
      const itemDetail = data?.itemDetail!;

      const variables: UpdateItemDetailMutationVariables = {
        itemDetail: {
          ...item,
          id: itemDetail.id || '',
          priority: itemDetail.priority || 0,
          date: props.date,
          itemId: props.itemId,
        },
      };

      updateItemDetailMutation({ variables });
    },
    [updateItemDetailMutation, props, data]
  );

  const onDismiss = useCallback(() => {
    props.navigation.goBack();
  }, [props.navigation]);

  const onIcons = useCallback(
    (kind: string) => {
      props.navigation.navigate('Icons', {
        kind,
        onSelectIcon: (selectedKind: string) => {
          setState((s) => ({
            ...s,
            selectedKind,
          }));
        },
      });
    },
    [props]
  );

  return (
    <Plain
      {...state}
      date={props.date}
      data={data}
      loading={loading}
      error={error}
      mutationData={updateItemDetailMutationData}
      onDismiss={onDismiss}
      onSave={onSave}
      onIcons={onIcons}
    />
  );
});

export default Connected;
