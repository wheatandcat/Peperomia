import React, { memo, useCallback, useState } from 'react';
import { Alert } from 'react-native';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import {
  useCreateItemDetailMutation,
  NewItem,
  NewItemDetail,
} from 'queries/api/index';
import Plain from './Plain';
import { Props as IndexProps } from './';

dayjs.extend(advancedFormat);

type Props = IndexProps & {
  date: string;
  itemId: string;
  priority: number;
  onCallback: () => void;
};

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
    createItemDetailMutation,
    createItemDetailMutationData,
  ] = useCreateItemDetailMutation({
    async onCompleted() {
      await props?.onCallback?.();

      props.navigation.goBack();
    },
    onError(err) {
      Alert.alert('保存に失敗しました', err.message);
    },
  });

  const onSave = useCallback(
    (item: NewItem) => {
      const itemDetail: NewItemDetail = {
        ...item,
        priority: props.priority,
        date: props.date,
        itemId: props.itemId,
      };

      const variables = {
        itemDetail,
      };

      createItemDetailMutation({ variables });
    },
    [createItemDetailMutation, props]
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
      mutationData={createItemDetailMutationData}
      onDismiss={onDismiss}
      onSave={onSave}
      onIcons={onIcons}
    />
  );
});

export default Connected;
