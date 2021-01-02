import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import theme, { darkMode } from 'config/theme';
import { SelectItemDetail } from 'domain/itemDetail';
import InputLabel from 'components/molecules/ScheduleDetail/Label';

let y = [0, 0, 0];

type Props = Pick<SelectItemDetail, 'place' | 'url' | 'memo'> & {
  onChangeInputText: (name: string, value: string) => void;
};

type State = Pick<SelectItemDetail, 'place' | 'url' | 'memo'> & {
  placeInput: boolean;
  urlInput: boolean;
  memoInput: boolean;
  focus: string;
};

type Label = {
  value: 'memoInput' | 'placeInput' | 'urlInput';
  label: string;
  icon: string;
  width: number;
};

type LabelInput = {
  value: 'memo' | 'place' | 'url';
  defaultValue: string;
  label: string;
  icon: string;
  width: number;
  multiline: boolean;
};

export default class extends Component<Props, State> {
  state = {
    memo: this.props.memo,
    memoInput: Boolean(this.props.memo),
    place: this.props.place,
    placeInput: Boolean(this.props.place),
    url: this.props.url,
    urlInput: Boolean(this.props.url),
    focus: '',
  };

  getInputLabels = () => {
    let labels: Label[] = [];

    if (!this.state.placeInput) {
      labels = [
        ...labels,
        {
          icon: 'map-marker-outline',
          value: 'placeInput',
          label: '集合場所',
          width: 95,
        },
      ];
    }
    if (!this.state.urlInput) {
      labels = [
        ...labels,
        {
          icon: 'link',
          value: 'urlInput',
          label: 'URL',
          width: 70,
        },
      ];
    }
    if (!this.state.memoInput) {
      labels = [
        ...labels,
        {
          icon: 'file-document-box-outline',
          value: 'memoInput',
          label: 'メモ',
          width: 70,
        },
      ];
    }
    return labels;
  };

  getInputs = () => {
    let labels: LabelInput[] = [];

    if (this.state.placeInput) {
      labels = [
        ...labels,
        {
          icon: 'map-marker-outline',
          value: 'place',
          defaultValue: this.props.place,
          label: '集合場所',
          width: 95,
          multiline: true,
        },
      ];
    }
    if (this.state.urlInput) {
      labels = [
        ...labels,
        {
          icon: 'link',
          value: 'url',
          defaultValue: this.props.url,
          label: 'URL',
          width: 70,
          multiline: false,
        },
      ];
    }
    if (this.state.memoInput) {
      labels = [
        ...labels,
        {
          icon: 'file-document-box-outline',
          value: 'memo',
          defaultValue: this.props.memo,
          label: 'メモ',
          width: 70,
          multiline: true,
        },
      ];
    }
    return labels;
  };

  onInputAdd = (name: string) => {
    if (name === 'memoInput') {
      this.setState({
        memoInput: true,
        focus: 'memo',
      });
    } else if (name === 'placeInput') {
      this.setState({
        placeInput: true,
        focus: 'place',
      });
    } else if (name === 'urlInput') {
      this.setState({
        urlInput: true,
        focus: 'url',
      });
    }
  };

  render() {
    return (
      <>
        <View>
          <MaterialIcons
            name="mode-edit"
            color={theme().color.secondary.main}
            size={23}
            style={styles.edit}
          />

          {this.getInputs().map((item, index) => (
            <View
              style={styles.inputLabel}
              key={item.label}
              onLayout={(event) => {
                y[index] = event.nativeEvent.layout.y;
              }}
            >
              <InputLabel
                text={item.label}
                icon={item.icon}
                width={item.width}
              />
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholder={item.label}
                  placeholderTextColor={
                    darkMode()
                      ? theme().color.base.pale
                      : theme().color.base.light
                  }
                  multiline={item.multiline}
                  style={estyles.memoInput}
                  onChangeText={(value) => {
                    this.props.onChangeInputText(item.value, value);
                  }}
                  testID={`inputTextScheduleDetail${item.label}`}
                  autoFocus={this.state.focus === item.value}
                >
                  <Text style={estyles.memoText}>{item.defaultValue}</Text>
                </TextInput>
              </View>
            </View>
          ))}

          {this.getInputLabels().length > 0 && (
            <View style={styles.inputLabelContainer}>
              <MaterialCommunityIcons
                name="plus"
                color={theme().color.secondary.main}
                size={28}
                style={styles.plus}
              />
              {this.getInputLabels().map((item) => (
                <View style={styles.container} key={item.label}>
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

const estyles = EStyleSheet.create({
  memoText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: '$text',
  },
  memoInput: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: '$text',
  },
});

const styles = StyleSheet.create({
  edit: {
    paddingLeft: theme().space(0),
  },
  inputLabel: {
    paddingVertical: theme().space(2),
  },
  textInputContainer: {
    paddingVertical: theme().space(3),
    paddingHorizontal: theme().space(1),
  },
  inputLabelContainer: {
    paddingTop: theme().space(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  plus: {
    paddingRight: theme().space(0),
  },
  container: {
    padding: theme().space(2),
  },
});
