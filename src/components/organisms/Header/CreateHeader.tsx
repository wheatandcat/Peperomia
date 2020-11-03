import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from 'config/theme';
import { IconImage } from 'components/atoms';
import { getKindData } from 'lib/kind';

type Props = {
  date: string;
  title: string;
  kind: string;
  color: string;
  onClose: () => void;
};

const CreateHeader: React.FC<Props> = (props) => {
  const config = getKindData(props.kind);

  return (
    <View
      style={{
        backgroundColor: props.color,
      }}
    >
      <StatusBar backgroundColor={props.color} barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={props.onClose}>
          <MaterialCommunityIcons
            name="close"
            size={30}
            color={theme().color.black}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.date}>{props.date}</Text>
        </View>
        <TouchableOpacity onPress={props.onClose}>
          <MaterialCommunityIcons
            name="check"
            size={30}
            color={theme().color.main}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <IconImage
            src={config.src}
            name={config.name}
            size={80}
            opacity={0.8}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </View>
    </View>
  );
};

export default CreateHeader;

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
    color: theme().color.darkGray,
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
    color: theme().color.black,
  },
});
