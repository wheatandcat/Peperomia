import React, { memo } from 'react';
import CreateCalendar from 'components/templates/CreateCalendar/Page';
import { QueryProps } from './Plain';
import { ConnectedType } from './Connected';

type Props = ConnectedType & {
  mutationData: QueryProps['mutationData'];
};

const AddItemDetailPage: React.FC<Props> = (props) => {
  return (
    <CreateCalendar
      {...props}
      loading={props.mutationData.loading}
      itemDetail={null}
    />
  );
};

export default memo(AddItemDetailPage);
