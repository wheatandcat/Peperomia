import { Dimensions, Clipboard, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-root-toast';
import { SelectItem } from '../domain/item';
import { SelectItemDetail } from '../domain/itemDetail';
import { save as saveFirestore, updateShare } from './firestore/plan';

export const closeShareLink = async (doc: string) => {
  const result = await updateShare(doc, false);

  if (result) {
    const { height } = Dimensions.get('window');

    let toast = Toast.show('リンクを非公開にしました', {
      duration: Toast.durations.LONG,
      position: height - 150,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });

    // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
    setTimeout(function () {
      Toast.hide(toast);
    }, 3000);
  }
};

export const crateShareLink = async (
  item: SelectItem,
  itemDetails: SelectItemDetail[]
) => {
  const userID = await AsyncStorage.getItem('userID');
  if (userID === null) {
    return;
  }

  const linkID = await saveFirestore(userID, item, itemDetails);
  if (!linkID) {
    Alert.alert('保存に失敗しました');
    return;
  }

  const shareHost = 'https://peperomia.info';
  console.log(`${shareHost}/${linkID}`);

  Clipboard.setString(`${shareHost}/${linkID}`);

  const { height } = Dimensions.get('window');

  const toast = Toast.show('リンクがコピーされました！', {
    duration: Toast.durations.LONG,
    position: height - 150,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });

  // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
  setTimeout(function () {
    Toast.hide(toast);
  }, 3000);
};
