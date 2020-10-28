import React, { memo, useCallback, useState } from 'react';
import { useCreateCalendarMutation, NewItem } from 'queries/api/index';
import Plain from './Plain';
import { Props as IndexProps } from './';

type Props = IndexProps & {
  date: string;
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
      mutationData={createCalendarMutationData}
      onDismiss={onDismiss}
      onSave={onSave}
      onIcons={onIcons}
    />
  );
});

export default Connected;
