import React from 'react';
import { CreateItemDetailMutationResult } from 'queries/api/index';
import { ConnectedType } from './Connected';
import Page from './Page';

export type QueryProps = {
  mutationData: CreateItemDetailMutationResult;
};

type Props = QueryProps & ConnectedType;

const Plain: React.FC<Props> = (props) => {
  return <Page {...props} onDismiss={props.onDismiss} onSave={props.onSave} />;
};

export default Plain;
