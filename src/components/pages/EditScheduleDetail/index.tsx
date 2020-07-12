import React from 'react';
import { ItemDetail } from 'domain/itemDetail';
import { useItems } from 'containers/Items';
import { useAuth } from 'containers/Auth';
import Connected from './Connected';

export type Props = ItemDetail & {
  id: number;
  onShow: (reload: boolean) => void;
};

const EditScheduleDetail: React.FC<Props> = (props) => {
  const { refreshData, itemDetails } = useItems();
  const { uid } = useAuth();

  return (
    <Connected
      {...props}
      uid={uid}
      refreshData={refreshData}
      itemDetails={itemDetails}
    />
  );
};

export default EditScheduleDetail;
