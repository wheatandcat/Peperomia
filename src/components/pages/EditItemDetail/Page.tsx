import React, { memo } from 'react';
import CreateCalendar from 'components/templates/CreateCalendar/Page';
import { ItemDetailQuery } from 'queries/api/index';
import { QueryProps } from './Plain';
import { ConnectedType } from './Connected';

export type Props = ConnectedType & {
  itemDetail: ItemDetailQuery['itemDetail'];
  mutationData: QueryProps['mutationData'];
};

const EditItemDetailPage: React.FC<Props> = (props) => {
  return <CreateCalendar {...props} loading={props.mutationData.loading} />;
};

export default memo(EditItemDetailPage);
