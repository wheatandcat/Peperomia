import React, { memo } from 'react';
import Page from './Page';

type Props = {
  kind: string;
  onSelectIcon: (kind: string) => void;
};

export type ConnectedType = Props;

const Connected: React.FC<Props> = (props) => {
  return <Page kind={props.kind} onSelectIcon={props.onSelectIcon} />;
};

export default memo(Connected);
