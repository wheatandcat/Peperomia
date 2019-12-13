import React from 'react';
import { Platform } from 'react-native';
import ActionButton from 'react-native-action-button';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import theme from '../../../config/theme';

interface Props {
  onAdd: () => void;
  onSort: () => void;
  onDelete: () => void;
}

const right = Platform.OS === 'ios' ? 50 : 100;

export default (props: Props) => (
  <ActionButton
    buttonColor={theme().color.lightGreen}
    hideShadow
    testID="ScheduleMenu"
  >
    <ActionButton.Item
      buttonColor={theme().color.blue}
      title="予定を追加"
      textStyle={{
        paddingTop: 1,
      }}
      textContainerStyle={{
        right,
        borderColor: theme().color.darkGray,
      }}
      hideLabelShadow
      onPress={props.onAdd}
      testID="ScheduleMenuAdd"
      accessible
    >
      <MaterialIcons name="add" size={30} color={theme().color.white} />
    </ActionButton.Item>
    <ActionButton.Item
      buttonColor={theme().color.yellow}
      title="順番を変更"
      textStyle={{
        paddingTop: 1,
      }}
      textContainerStyle={{
        right,
        borderColor: theme().color.darkGray,
      }}
      hideLabelShadow
      onPress={props.onSort}
    >
      <FontAwesome name="sort" size={30} color={theme().color.white} />
    </ActionButton.Item>
    <ActionButton.Item
      buttonColor={theme().color.red}
      title="予定を削除"
      textStyle={{
        paddingTop: 1,
      }}
      textContainerStyle={{
        right,
        borderColor: theme().color.darkGray,
      }}
      hideLabelShadow
      onPress={props.onDelete}
    >
      <MaterialIcons name="remove" size={30} color={theme().color.white} />
    </ActionButton.Item>
  </ActionButton>
);
