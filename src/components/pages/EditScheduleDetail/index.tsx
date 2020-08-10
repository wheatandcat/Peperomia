import React from 'react';
import { ItemDetail } from 'domain/itemDetail';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useItems } from 'containers/Items';
import { useAuth } from 'containers/Auth';
import Connected from './Connected';

export type Props = ItemDetail & {
  id: number | string;
  onShow: (reload: boolean) => void;
};

const EditScheduleDetail: React.FC<Props> = (props) => {
  const { refreshData, itemDetails } = useItems();
  const { uid } = useAuth();
  const { showActionSheetWithOptions } = useActionSheet();

  return (
    <Connected
      {...props}
      uid={uid}
      refreshData={refreshData}
      itemDetails={itemDetails}
      showActionSheetWithOptions={showActionSheetWithOptions}
    />
  );
};

export default EditScheduleDetail;
