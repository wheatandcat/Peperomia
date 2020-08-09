import React, { useState, useCallback, memo } from 'react';
import { ContextProps as ItemsContextProps } from 'containers/Items';
import { ItemDetail as ItemDetailParam } from 'domain/itemDetail';
import { Props as IndexProps } from './';
import ScheduleDetail from './Connected';
import EditScheduleDetail from 'components/pages/EditScheduleDetail';

type State = ItemDetailParam & {
  itemDetailId: string | number;
  mode: string;
};

export type Props = IndexProps & Pick<ItemsContextProps, 'refreshData'>;

const initialState = (): State => ({
  title: '',
  memo: '',
  kind: '',
  url: '',
  place: '',
  moveMinutes: 0,
  priority: 0,
  itemDetailId: 0,
  mode: 'show',
});

const ScheduleDetailSwitch: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(initialState());

  const itemDetailId = props.route.params.itemDetailId || '1';

  const onEdit = useCallback(
    (
      title: string,
      kind: string,
      place: string,
      url: string,
      memoText: string,
      moveMinutes: number,
      priority: number
    ) => {
      setState((s) => ({
        ...s,
        title,
        kind,
        memo: memoText,
        place,
        url,
        moveMinutes,
        priority,
        itemDetailId,
        mode: 'edit',
      }));
    },
    [itemDetailId]
  );

  const onShow = useCallback(() => {
    setState((s) => ({ ...s, mode: 'show' }));
  }, []);

  if (state.mode === 'edit') {
    return (
      <EditScheduleDetail
        id={state.itemDetailId}
        title={state.title}
        kind={state.kind}
        url={state.url}
        place={state.place}
        memo={state.memo}
        moveMinutes={state.moveMinutes}
        priority={state.priority}
        onShow={onShow}
      />
    );
  }

  return (
    <ScheduleDetail
      navigation={props.navigation}
      route={props.route}
      refreshData={props.refreshData}
      onEdit={onEdit}
    />
  );
};

export default memo(ScheduleDetailSwitch);
