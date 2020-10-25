import React, { memo, useCallback } from 'react';
import { useCreateCalendarMutation, NewItem } from 'queries/api/index';
import Plain from './Plain';
import { Props as IndexProps } from './';

type Props = IndexProps & {
  date: string;
};

export type ConnectedType = {
  onDismiss: () => void;
  onSave: (item: NewItem) => void;
};

const Connected: React.FC<Props> = memo((props) => {
  const [
    createCalendarMutation,
    createCalendarMutationData,
  ] = useCreateCalendarMutation();

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

  return (
    <Plain
      mutationData={createCalendarMutationData}
      onDismiss={onDismiss}
      onSave={onSave}
    />
  );
});

export default Connected;
