import React, { Component } from 'react';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TouchableOpacity, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Page, { Props as PageProps } from './Page';
import theme from '../../../config/theme';

interface Props extends PageProps {
  navigation: NavigationScreenProp<NavigationRoute>;
}

interface State {}

export default class extends Component<Props, State> {
  static navigationOptions = ({
    navigation,
  }: {
    navigation: NavigationScreenProp<NavigationRoute>;
  }) => {
    const { params = {} } = navigation.state;

    return {
      title: 'アイコン設定',
      headerStyle: {
        borderBottomWidth: 0,
        backgroundColor: theme().mode.header.backgroundColor,
      },
      headerTintColor: theme().mode.header.text,
      headerTitleStyle: {
        color: theme().mode.header.text,
      },
      headerLeft: (
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={params.onDismiss}>
            <MaterialCommunityIcons
              name="close"
              size={25}
              color={theme().mode.text}
            />
          </TouchableOpacity>
        </View>
      ),
    };
  };

  componentDidMount() {
    const onDismiss = this.props.navigation.getParam('onDismiss', () => {});

    this.props.navigation.setParams({
      onDismiss: onDismiss,
    });
  }

  onSelectIcon = (kind: string) => {
    const onSelectIcon = this.props.navigation.getParam(
      'onSelectIcon',
      () => {}
    );

    onSelectIcon(kind);
  };

  onPhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });

    await Promise.all([
      Permissions.askAsync(Permissions.CAMERA),
      Permissions.askAsync(Permissions.CAMERA_ROLL),
    ]);

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      const onPicture = this.props.navigation.getParam('onPicture', () => {});
      onPicture(result.uri);
    }
  };

  onCamera = () => {
    const onDismiss = this.props.navigation.getParam('onDismiss', () => {});
    const onPicture = this.props.navigation.getParam('onPicture', () => {});
    this.props.navigation.navigate('Camera', { onDismiss, onPicture });
  };

  render() {
    const kind = this.props.navigation.getParam('kind', null);
    const defaultIcon = this.props.navigation.getParam('defaultIcon', false);
    const photo = this.props.navigation.getParam('photo', false);

    return (
      <Page
        kind={kind}
        defaultIcon={defaultIcon}
        photo={photo}
        onSelectIcon={this.onSelectIcon}
        onPhoto={this.onPhoto}
        onCamera={this.onCamera}
      />
    );
  }
}

const styles = EStyleSheet.create({
  headerLeft: {
    left: 10,
  },
});
