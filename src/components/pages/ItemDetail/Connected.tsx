import React, { memo, useCallback } from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import { useItemDetailQuery } from 'queries/api/index';
import { Props as IndexProps } from './';
import Plain from './Plain';

dayjs.extend(advancedFormat);

type Props = IndexProps & {
  date: string;
  itemId: string;
  itemDetailId: string;
};

export type ConnectedType = {
  date: string;
  onDismiss: () => void;
  onUpdate: () => void;
};

const Connected: React.FC<Props> = (props) => {
  const { data, loading, error, refetch } = useItemDetailQuery({
    variables: {
      date: props.date,
      itemId: props.itemId,
      itemDetailId: props.itemDetailId,
    },
  });

  const onCallback = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const onUpdate = useCallback(() => {
    props.navigation.navigate('EditItemDetail', {
      date: props.date,
      itemId: props.itemId,
      itemDetailId: props.itemDetailId,
      onCallback,
    });
  }, [props, onCallback]);

  const onDismiss = useCallback(() => {
    props.navigation.goBack();
  }, [props.navigation]);

  return (
    <Plain
      data={data}
      loading={loading}
      error={error}
      date={props.date}
      onDismiss={onDismiss}
      onUpdate={onUpdate}
    />
  );
};

export default memo(Connected);
