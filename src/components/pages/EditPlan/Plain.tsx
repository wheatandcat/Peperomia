import React, { useState, memo, useCallback } from 'react';
import { SuggestItem } from 'lib/suggest';
import { useDidMount } from 'hooks/index';
import { ContextProps as ItemContextProps } from 'containers/Items';
import Page from 'components/templates/CreatePlan/Page';
import { Props } from './';

type PlainProps = Props &
  Pick<ItemContextProps, 'items' | 'refreshData'> & {
    input: {
      title: string;
      date: string;
    };
    kind: string;
    onInput: (name: string, value: any) => void;
    onSave: () => void;
    onIcons: () => void;
    onHome: () => void;
  };

type PlainState = {
  suggestList: SuggestItem[];
};

const Plain = memo((props: PlainProps) => {
  const [state, setState] = useState<PlainState>({
    suggestList: [],
  });

  useDidMount(() => {
    const suggestList = (props.items || []).map((item) => ({
      title: item.title,
      kind: item.kind,
    }));

    setState((s) => ({
      ...s,
      suggestList,
    }));
  });

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
      suggestList={state.suggestList}
      onInput={props.onInput}
      onSave={onSave}
      onIcons={props.onIcons}
      onHome={props.onHome}
    />
  );
});

export default Plain;
