import React, { memo, useCallback } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import theme from 'config/theme';
import { IconImage } from 'components/atoms';
import { getKindData } from 'lib/kind';
import FocusAwareStatusBar from 'components/organisms/FocusAwareStatusBar';

type Props = {
  date: string;
  title: string;
  kind: string;
  color: string;
  public: boolean;
  onClose: () => void;
  onUpdate: () => void;
  onShare: (open: boolean) => void;
  onDelete: () => void;
  onMainItemDetail: () => void;
};

const Header: React.FC<Props> = (props) => {
  const config = getKindData(props.kind);
  const { showActionSheetWithOptions } = useActionSheet();

  const onOpenActionSheet = useCallback(() => {
    if (!props.public) {
      showActionSheetWithOptions(
        {
          options: [
            '予定の変更する',
            '予定をシェアする',
            '予定を削除する',
            'キャンセル',
          ],
          destructiveButtonIndex: 3,
          cancelButtonIndex: 3,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            props.onUpdate();
          }
          if (buttonIndex === 1) {
            props.onShare(true);
          }
          if (buttonIndex === 2) {
            props.onDelete();
          }
        }
      );
    } else {
      showActionSheetWithOptions(
        {
          options: [
            '予定の変更する',
            '予定のURLを取得する',
            '予定を非公開にする',
            '予定を削除する',
            'キャンセル',
          ],
          destructiveButtonIndex: 4,
          cancelButtonIndex: 4,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            props.onUpdate();
          }
          if (buttonIndex === 1) {
            props.onShare(true);
          }
          if (buttonIndex === 2) {
            props.onShare(false);
          }
          if (buttonIndex === 3) {
            props.onDelete();
          }
        }
      );
    }
  }, [showActionSheetWithOptions, props]);

  return (
    <View
      style={{
        backgroundColor: props.color,
      }}
    >
      <FocusAwareStatusBar
        backgroundColor={props.color}
        barStyle="dark-content"
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={props.onClose}>
          <MaterialCommunityIcons
            name="close"
            size={30}
            color={theme().color.base.dark}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.date}>{props.date}</Text>
        </View>
        <TouchableOpacity onPress={onOpenActionSheet}>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={30}
            color={theme().color.primary.main}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={props.onMainItemDetail}>
            <IconImage
              src={config.src}
              name={config.name}
              size={80}
              opacity={0.8}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </View>
    </View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme().space(3),
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    paddingTop: theme().space(1),
    fontWeight: '600',
    color: theme().color.base.main,
  },
  content: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingVertical: theme().space(2),
  },
  imageContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: theme().color.base.dark,
  },
});
