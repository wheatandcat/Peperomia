import React, { memo, useCallback } from 'react';
import { useCalendarQuery } from 'queries/api/index';
import { Props as IndexProps } from './';
import Plain, { QueryProps } from './Plain';

export type CalendarType = QueryData<QueryProps, 'calendar'>;
export type ItemDetailType = ArrayType<CalendarType['item']['itemDetails']>;

type Props = IndexProps & {
  date: string;
};

export type ConnectedType = {
  onDismiss: () => void;
  create: boolean;
};

const Connected: React.FC<Props> = memo((props) => {
  const { data, loading, error } = useCalendarQuery({
    variables: {
      date: props.date,
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
      onDismiss={onDismiss}
      create={props.route.params.create || false}
    />
  );
});

export default Connected;
