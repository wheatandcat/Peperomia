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
};

const Connected: React.FC<Props> = (props) => {
  const { data, loading, error } = useItemDetailQuery({
    variables: {
      date: props.date,
      itemId: props.itemId,
      itemDetailId: props.itemDetailId,
    },
  });

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
    />
  );
};

export default memo(Connected);
