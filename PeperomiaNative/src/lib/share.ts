import { Dimensions, Clipboard } from 'react-native';
import Toast from 'react-native-root-toast';
import { ContextProps as FetchContextProps } from 'containers/Fetch';

type PostType = NonNullable<FetchContextProps['post']>;

export const closeShareLink = async (
  itemId: string,
  post: PostType
): Promise<boolean> => {
  const response = await post('UpdateItemPrivate', {
    itemId,
  });

  if (response.error) {
    return false;
  }

  const { height } = Dimensions.get('window');

  let toast = Toast.show('リンクを非公開にしました', {
    duration: Toast.durations.LONG,
    position: height - 150,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });

  setTimeout(function () {
    Toast.hide(toast);
  }, 3000);

  return true;
};

export const crateShareLink = async (
  itemId: string,
  post: PostType
): Promise<boolean> => {
  const response = await post('UpdateItemPublic', {
    itemId,
  });

  if (response.error) {
    return false;
  }

  copyShareURL(itemId);

  return true;
};

export const copyShareURL = (itemId: string) => {
  const shareHost = 'https://app.peperomia.info/share';
  const url = `${shareHost}/${itemId}`;

  Clipboard.setString(url);

  const { height } = Dimensions.get('window');

  const toast = Toast.show('リンクがコピーされました！', {
    duration: Toast.durations.LONG,
    position: height - 150,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });

  setTimeout(function () {
    Toast.hide(toast);
  }, 3000);
};
