import * as SQLite from 'expo-sqlite';
import React, {
  useContext,
  useState,
  memo,
  useEffect,
  useCallback,
} from 'react';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { db } from '../../../lib/db';
import {
  update as updateItemDetail,
  ItemDetail,
} from '../../../lib/db/itemDetail';
import getKind from '../../../lib/getKind';
import { SuggestItem } from '../../../lib/suggest';
import { ItemDetail as ItemDetailParam } from '../../../domain/itemDetail';
import {
  Context as ItemsContext,
  ContextProps as ItemContextProps,
} from '../../../containers/Items';
import { useDidMount } from '../../../hooks/index';
import Page from '../../templates/CreateScheduleDetail/Page';

type State = ItemDetailParam & {
  iconSelected: boolean;
  suggestList: SuggestItem[];
};

type Props = ItemDetailParam & {
  id: number;
  navigation: NavigationScreenProp<NavigationRoute>;
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
    const kind = props.navigation.getParam('kind', '');

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
  }, [props.navigation, state]);

  const onDismiss = useCallback(() => {
    props.onShow(false);
  }, [props]);

  const save = useCallback(async () => {
    const refreshData = props.navigation.getParam('refreshData', () => {});
    await refreshData();

    if (props.refreshData) {
      props.refreshData();
      props.onShow(true);
    }
  }, [props]);

  const onSave = useCallback(
    (
      title: string,
      kind: string,
      place: string,
      url: string,
      memoText: string,
      moveMinutes: number
    ) => {
      db.transaction((tx: SQLite.Transaction) => {
        const itemDetail: ItemDetail = {
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

        updateItemDetail(tx, itemDetail, save);
      });
    },
    [props.id, props.priority, save]
  );

  const onIcons = useCallback(
    (title: string) => {
      props.navigation.navigate('Icons', {
        kind: getKind(title),
        defaultIcon: false,
        onSelectIcon: (kind: string) => {
          props.navigation.navigate('ScheduleDetail', {
            kind: kind,
          });
        },
        onDismiss: () => {
          props.navigation.navigate('ScheduleDetail');
        },
        photo: false,
      });
    },
    [props.navigation]
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
