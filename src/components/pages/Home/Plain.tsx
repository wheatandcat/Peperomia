import React, { memo, useState, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import uuidv1 from 'uuid/v1';
import { deleteItem } from 'lib/item';
import { ContextProps as ItemContextProps } from 'containers/Items';
import { ContextProps as AuthContextProps } from 'containers/Auth';
import theme, { darkMode } from 'config/theme';
import { SelectItem } from 'domain/item';
import FocusAwareStatusBar from 'components/organisms/FocusAwareStatusBar';
import Page from './Page';

export type ConnectType = {
  onSchedule: (itemId: string, title: string) => void;
  onDelete: (itemId: string) => void;
};

export type ItemProps = SelectItem & {
  id: string;
  about: string;
};

export type Props = Pick<ItemContextProps, 'items' | 'about' | 'refreshData'> &
  Pick<AuthContextProps, 'uid'> & {
    loading: boolean;
    refresh: string;
  };

type State = {
  refresh: string;
};

const HomePlain: React.FC<Props> = (props) => {
  const { navigate } = useNavigation();
  const [state, setState] = useState<State>({ refresh: '' });
  const uid = props.uid;

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
    <>
      <FocusAwareStatusBar
        backgroundColor={darkMode() ? theme().color.black : theme().color.main}
        barStyle={darkMode() ? 'light-content' : 'dark-content'}
      />
      <Page
        data={items}
        loading={props.loading}
        onSchedule={onSchedule}
        onDelete={onDelete}
      />
    </>
  );
};

export default memo(HomePlain);
