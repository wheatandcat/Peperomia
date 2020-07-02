import React, { memo, useState, useCallback, useEffect } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, Alert, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Notifications from 'expo-notifications';
import { Notification, NotificationResponse } from 'expo-notifications';
import uuidv1 from 'uuid/v1';
import { deleteItem } from 'lib/item';
import { urlParser } from 'lib/urlScheme';
import { RootStackParamList } from 'lib/navigation';
import { useItems, ContextProps as ItemContextProps } from 'containers/Items';
import { useAuth } from 'containers/Auth';
import { SelectItem } from 'domain/item';
import { useDidMount } from 'hooks/index';
import Page from './Page';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export type PlanProps = Pick<
  ItemContextProps,
  'items' | 'about' | 'refreshData'
> & {
  loading: boolean;
  refresh: string;
};

type NotificationBodyType = {
  urlScheme?: string;
};

type PlanState = {
  refresh: string;
};

type HomeScreeState = {
  mask: boolean;
};

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {
  const { items, about, refreshData, itemsLoading } = useItems();
  const [state, setState] = useState<HomeScreeState>({ mask: false });

  const refresh = route?.params?.refresh || '';

  const respond = useCallback(
    (body: NotificationBodyType) => {
      const us = urlParser(body?.urlScheme || '');
      if (us) {
        navigation.navigate(us.routeName as any, us.params);
      }
    },
    [navigation]
  );

  const handleNotificationReceived = useCallback(
    (notification: Notification) => {
      const body = notification.request.content.data
        .body as NotificationBodyType;

      if (!body?.urlScheme) {
        return;
      }

      Alert.alert('通知が届きました', '画面へ移動しますか？', [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: '移動する',
          onPress: () => {
            respond(body);
          },
        },
      ]);
    },
    [respond]
  );

  const handleNotificationResponseReceived = useCallback(
    (notification: NotificationResponse) => {
      const body = notification.notification.request.content.data
        .body as NotificationBodyType;

      if (!body?.urlScheme) {
        return;
      }

      respond(body);
    },
    [respond]
  );

  useDidMount(() => {
    const onPushCreatePlan = async () => {
      setState({ mask: false });

      await AsyncStorage.setItem('FIRST_CREATE_ITEM', 'true');
      navigation.navigate('CreatePlan', {});
    };

    navigation.setParams({ onPushCreatePlan });

    const checkMask = async () => {
      const m = await AsyncStorage.getItem('FIRST_CREATE_ITEM');
      setState({ mask: !m });
    };

    checkMask();
  });

  React.useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(
      handleNotificationReceived
    );
    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponseReceived
    );

    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, [handleNotificationReceived, handleNotificationResponseReceived]);

  return (
    <View>
      <HomeScreenPlan
        loading={Boolean(itemsLoading)}
        items={items}
        about={about}
        refresh={String(refresh)}
        refreshData={refreshData}
      />
      {state.mask && <View style={styles.mask} />}
    </View>
  );
};

export type HomeScreenPlanType = {
  onSchedule: (itemId: string, title: string) => void;
  onDelete: (itemId: string) => void;
};

export type ItemProps = SelectItem & {
  id: string;
  about: string;
};

const HomeScreenPlan = memo((props: PlanProps) => {
  const { navigate } = useNavigation();
  const { uid } = useAuth();
  const [state, setState] = useState<PlanState>({ refresh: '' });

  useEffect(() => {
    if (state.refresh === props.refresh) {
      return;
    }
    setState({ refresh: props.refresh });

    if (props.refreshData) {
      props.refreshData();
    }
  }, [props, props.refresh, state.refresh]);

  const onDelete = useCallback(
    async (itemId: string) => {
      const ok = await deleteItem(uid, { id: itemId });
      if (!ok) {
        Alert.alert('削除に失敗しました');
        return;
      }

      setState({ refresh: uuidv1() });
    },
    [uid]
  );

  const onSchedule = useCallback(
    (id: string, title: string) => {
      navigate('Schedule', { itemId: id, title });
    },
    [navigate]
  );

  const items = (props.items || []).map((item) => {
    const about = (props.about || []).find((val) => val.itemId === item.id);

    return {
      ...item,
      id: String(item.id),
      about: about ? about.about : '',
    };
  });

  return (
    <Page
      data={items}
      loading={props.loading}
      onSchedule={onSchedule}
      onDelete={onDelete}
    />
  );
});

export default HomeScreen;

const styles = EStyleSheet.create({
  mask: {
    position: 'absolute',
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
});
