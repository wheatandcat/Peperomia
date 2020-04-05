import React, {
  useContext,
  useState,
  memo,
  useEffect,
  useCallback,
} from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { updateItemDetail } from 'lib/itemDetail';
import getKind from 'lib/getKind';
import { SuggestItem } from 'lib/suggest';
import { ItemDetail } from 'domain/itemDetail';
import {
  Context as ItemsContext,
  ContextProps as ItemContextProps,
} from 'containers/Items';
import { Context as AuthContext } from 'containers/Auth';
import { useDidMount } from 'hooks/index';
import Page from '../../templates/CreateScheduleDetail/Page';
import { ScreenRouteProp } from '../../pages/ScheduleDetail/Switch';

type State = ItemDetail & {
  iconSelected: boolean;
  suggestList: SuggestItem[];
};

type Props = ItemDetail & {
  id: number;
  onShow: (reload: boolean) => void;
};

type PlanProps = Props & Pick<ItemContextProps, 'itemDetails' | 'refreshData'>;

export default (props: Props) => {
  const { refreshData, itemDetails } = useContext(ItemsContext);
  return (
    <Plan {...props} refreshData={refreshData} itemDetails={itemDetails} />
  );
};

const Plan = memo((props: PlanProps) => {
  const { uid } = useContext(AuthContext);
  const [state, setState] = useState<State>({
    title: props.title || '',
    place: props.place || '',
    url: props.url || '',
    memo: props.memo || '',
    moveMinutes: props.moveMinutes || 0,
    kind: props.kind,
    priority: props.priority,
    iconSelected: false,
    suggestList: [],
  });

  const route = useRoute<ScreenRouteProp>();
  const { navigate } = useNavigation();

  useDidMount(() => {
    const suggestList = (props.itemDetails || []).map(itemDetail => ({
      title: itemDetail.title,
      kind: itemDetail.kind,
    }));

    setState(s => ({
      ...s,
      suggestList,
    }));
  });

  useEffect(() => {
    const kind = route.params.kind;

    if (!kind) {
      return;
    }

    if (state.kind !== kind) {
      setState(s => ({
        ...s,
        kind,
        iconSelected: true,
      }));
    }
  }, [route, state]);

  const onDismiss = useCallback(() => {
    props.onShow(false);
  }, [props]);

  const save = useCallback(async () => {
    const refreshData = route.params.refreshData;
    if (!refreshData) {
      return;
    }
    await refreshData();

    if (props.refreshData) {
      props.refreshData();
      props.onShow(true);
    }
  }, [props, route]);

  const onSave = useCallback(
    async (
      title: string,
      kind: string,
      place: string,
      url: string,
      memoText: string,
      moveMinutes: number
    ) => {
      const itemDetail = {
        id: props.id,
        title,
        place,
        url,
        memo: memoText,
        kind,
        moveMinutes,
        priority: props.priority,
        itemId: 0,
      };

      const ok = await updateItemDetail(uid, itemDetail);
      if (!ok) {
        Alert.alert('保存に失敗しました');
        return;
      }

      save();
    },
    [props.id, props.priority, save, uid]
  );

  const onIcons = useCallback(
    (title: string) => {
      navigate('Icons', {
        kind: getKind(title),
        defaultIcon: false,
        onSelectIcon: (kind: string) => {
          navigate('ScheduleDetail', {
            kind: kind,
          });
        },
        onDismiss: () => {
          navigate('ScheduleDetail');
        },
        photo: false,
      });
    },
    [navigate]
  );

  return (
    <Page
      title={state.title}
      kind={state.kind}
      place={state.place}
      url={state.url}
      memo={state.memo}
      moveMinutes={state.moveMinutes}
      suggestList={state.suggestList}
      iconSelected={state.iconSelected}
      onDismiss={onDismiss}
      onSave={onSave}
      onIcons={onIcons}
    />
  );
});
