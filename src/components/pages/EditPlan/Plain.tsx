import React, { memo, useCallback } from 'react';
import { ContextProps as ItemContextProps } from 'containers/Items';
import Page from 'components/templates/CreatePlan/Page';
import { ConnectType } from './Connected';
import { Props as IndexProps } from './';

type Props = IndexProps &
  ConnectType &
  Pick<ItemContextProps, 'items' | 'refreshData'>;

const Plain: React.FC<Props> = (props) => {
  const onSave = useCallback(async () => {
    await props.onSave();

    if (props.refreshData) {
      props.refreshData();
    }
  }, [props]);

  return (
    <Page
      mode="edit"
      title={props.input.title}
      date={props.input.date}
      kind={props.kind}
      onInput={props.onInput}
      onSave={onSave}
      onIcons={props.onIcons}
      onHome={props.onHome}
      showActionSheetWithOptions={props.showActionSheetWithOptions}
    />
  );
};

export default memo(Plain);
