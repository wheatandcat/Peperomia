import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import { Col, Grid } from "react-native-easy-grid";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ImagePicker } from "expo";

export interface Props {}

export default class extends Component<Props> {
  state = {
    image: null
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    let { image } = this.state;

    return (
      <View>
        <View
          style={{
            paddingTop: 100,
            alignItems: "center",
            height: "100%",
            width: "100%",
            backgroundColor: "#eeeeee"
          }}
        >
          <Input placeholder="タイトル" containerStyle={{ width: "85%" }} />

          <Grid style={{ height: 100, padding: 20, paddingTop: 60 }}>
            <Col style={{ padding: 10 }}>
              <TouchableOpacity onPress={this._pickImage}>
                <View
                  style={{
                    padding: 10,
                    height: 120,
                    borderWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#ffffff"
                  }}
                >
                  <Ionicons name="ios-camera" size={80} />
                </View>
              </TouchableOpacity>
            </Col>
            <Col style={{ padding: 10 }}>
              <View
                style={{
                  padding: 10,
                  height: 120,
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#ffffff"
                }}
              >
                <Text>まだアップロードされていません</Text>
              </View>
            </Col>
          </Grid>
        </View>
      </View>
    );
  }
}
