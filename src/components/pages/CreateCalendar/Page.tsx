import React, { memo } from 'react';
import { QueryProps } from './Plain';
import { ConnectedType } from './Connected';

type Props = ConnectedType & {
  mutationData: QueryProps['mutationData'];
};

const CreateCalendarPage: React.FC<Props> = () => {
  return null;
};

export default memo(CreateCalendarPage);
