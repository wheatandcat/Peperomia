import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { TouchableOpacity, View } from "react-native";
import { ImagePicker, Permissions } from "expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Page, { Props as PageProps } from "./Page";

interface Props extends PageProps {
  navigation: NavigationScreenProp<NavigationRoute>;
}

interface State {}

export default class extends Component<Props, State> {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationScreenProp<NavigationRoute>;
  }) => {
    return {
      title: "アイコン",
      headerStyle: {
        borderBottomWidth: 0,
        backgroundColor: "#eeeeee"
      },
      headerLeft: (
        <View style={{ left: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CreatePlan");
            }}
          >
            <MaterialCommunityIcons name="close" size={25} />
          </TouchableOpacity>
        </View>
      )
    };
  };

  onSelectIcon = (kind: string) => {
    this.props.navigation.navigate("CreatePlan", {
      kind: kind
    });
  };

  onPhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted"
    });

    await Promise.all([
      Permissions.askAsync(Permissions.CAMERA),
      Permissions.askAsync(Permissions.CAMERA_ROLL)
    ]);

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.props.navigation.navigate("CreatePlan", {
        image: result.uri
      });
    }
  };

  onCamera = () => {
    this.props.navigation.navigate("Camera");
  };

  render() {
    const kind = this.props.navigation.getParam("kind", null);

    return (
      <Page
        kind={kind}
        onSelectIcon={this.onSelectIcon}
        onPhoto={this.onPhoto}
        onCamera={this.onCamera}
      />
    );
  }
}
