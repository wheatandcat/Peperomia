import React, { Component } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../../../config/theme";
import InputLabel from "../../molecules/ScheduleDetail/Label";

let y = [0, 0, 0];

interface Props {
  place: string;
  url: string;
  memo: string;
  scrollViewRef: ScrollView;
  onChangeInputText: (name: string, value: string) => void;
}

interface State {
  place: string;
  placeInput: boolean;
  url: string;
  urlInput: boolean;
  memo: string;
  memoInput: boolean;
  focus: string;
}

interface Label {
  value: "memoInput" | "placeInput" | "urlInput";
  label: string;
  icon: string;
  width: number;
}

interface LabelInput {
  value: "memo" | "place" | "url";
  label: string;
  icon: string;
  width: number;
  multiline: boolean;
}

export default class extends Component<Props, State> {
  state = {
    memo: this.props.memo,
    memoInput: Boolean(this.props.memo),
    place: this.props.place,
    placeInput: Boolean(this.props.place),
    url: this.props.url,
    urlInput: Boolean(this.props.url),
    focus: ""
  };

  getInputLabels = () => {
    let labes: Label[] = [];

    if (!this.state.placeInput) {
      labes = [
        ...labes,
        {
          icon: "map-marker-outline",
          value: "placeInput",
          label: "集合場所",
          width: 95
        }
      ];
    }
    if (!this.state.urlInput) {
      labes = [
        ...labes,
        {
          icon: "link",
          value: "urlInput",
          label: "URL",
          width: 70
        }
      ];
    }
    if (!this.state.memoInput) {
      labes = [
        ...labes,
        {
          icon: "file-document-box-outline",
          value: "memoInput",
          label: "メモ",
          width: 70
        }
      ];
    }
    return labes;
  };

  getInputs = () => {
    let labes: LabelInput[] = [];

    if (this.state.placeInput) {
      labes = [
        ...labes,
        {
          icon: "map-marker-outline",
          value: "place",
          label: "集合場所",
          width: 95,
          multiline: true
        }
      ];
    }
    if (this.state.urlInput) {
      labes = [
        ...labes,
        {
          icon: "link",
          value: "url",
          label: "URL",
          width: 70,
          multiline: false
        }
      ];
    }
    if (this.state.memoInput) {
      labes = [
        ...labes,
        {
          icon: "file-document-box-outline",
          value: "memo",
          label: "メモ",
          width: 70,
          multiline: true
        }
      ];
    }
    return labes;
  };

  onInputAdd = (name: string) => {
    if (name === "memoInput") {
      this.setState({
        memoInput: true,
        focus: "memo"
      });
    } else if (name === "placeInput") {
      this.setState({
        placeInput: true,
        focus: "place"
      });
    } else if (name === "urlInput") {
      this.setState({
        urlInput: true,
        focus: "url"
      });
    }
  };

  render() {
    return (
      <>
        <View>
          <MaterialIcons
            name="mode-edit"
            color={theme.color.lightGreen}
            size={23}
            style={{
              paddingLeft: 3
            }}
          />

          {this.getInputs().map((item, index) => (
            <View
              style={{ paddingVertical: 7 }}
              key={item.label}
              onLayout={event => {
                y[index] = event.nativeEvent.layout.y;
              }}
            >
              <InputLabel
                text={item.label}
                icon={item.icon}
                width={item.width}
              />
              <View style={{ paddingVertical: 12, paddingHorizontal: 5 }}>
                <TextInput
                  placeholder={item.label}
                  multiline={item.multiline}
                  style={styles.memoInput}
                  onChangeText={value => {
                    this.props.onChangeInputText(item.value, value);
                  }}
                  testID={`inputTextScheduleDetail${item.label}`}
                  autoFocus={this.state.focus === item.value}
                  onFocus={() => {
                    this.props.scrollViewRef.scrollTo({
                      x: 0,
                      y: y[index] - 80,
                      animated: true
                    });
                  }}
                >
                  <Text style={styles.memoText}>{this.state.memo}</Text>
                </TextInput>
              </View>
            </View>
          ))}

          {this.getInputLabels().length > 0 && (
            <View
              style={{
                paddingTop: 5,
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <MaterialCommunityIcons
                name="plus"
                color={theme.color.lightGreen}
                size={28}
                style={{
                  paddingRight: 2
                }}
              />
              {this.getInputLabels().map(item => (
                <View style={{ padding: 7 }} key={item.label}>
                  <TouchableOpacity onPress={() => this.onInputAdd(item.value)}>
                    <InputLabel
                      text={item.label}
                      icon={item.icon}
                      width={item.width}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  memoInput: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400"
  },
  memoText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400"
  }
});
