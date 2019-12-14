import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Keyboard,
  ScrollView,
  StatusBar,
  Platform,
  NativeSyntheticEvent,
  TextInputScrollEventData,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  ActionSheetProps,
  connectActionSheet,
} from '@expo/react-native-action-sheet';
import Color from 'color';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import GlobalStyles from '../../../GlobalStyles';
import getKind, { KINDS, KIND_DEFAULT } from '../../../lib/getKind';
import { SuggestItem } from '../../../lib/suggest';
import s from '../../../config/style';
import theme from '../../../config/theme';
import Header from '../../molecules/Header';
import HeaderImage from '../../molecules/ScheduleHeader/Header';
import TimeDialog from '../../organisms/CreateScheduleDetail/TimeDialog';
import Body from '../../organisms/CreateScheduleDetail/Body';
import Suggest from '../../organisms/Suggest/List';

const top =
  Platform.OS === 'android' ? StatusBar.currentHeight : getStatusBarHeight();

type PropsBase = {
  title: string;
  kind: string;
  place: string;
  url: string;
  memo: string;
  time: number;
  iconSelected: boolean;
  suggestList: SuggestItem[];
  onDismiss: () => void;
  onIcons: (title: string) => void;
  onSave: (
    title: string,
    kind: string,
    place: string,
    url: string,
    memo: string,
    time: number
  ) => void;
};

export type Props = PropsBase & ActionSheetProps;

export interface State {
  title: string;
  kind: string;
  place: string;
  url: string;
  memo: string;
  time: number;
  titleFocusCount: number;
  manualTime: boolean;
  manualTimeValue: number;
  keyboard: boolean;
  suggest: boolean;
  imageHeader: boolean;
}

interface Item {
  value: number | null;
  label: string;
}

const times: Item[] = [
  {
    value: 0,
    label: '0分',
  },
  {
    value: 10,
    label: ' 10分',
  },
  {
    value: 30,
    label: ' 30分',
  },
  {
    value: 60,
    label: ' 60分',
  },
  {
    value: null,
    label: '手動で更新',
  },
  {
    value: null,
    label: 'キャンセル',
  },
];

const cancelButtonIndex = times.length - 1;
const manualButtonIndex = times.length - 2;

class App extends Component<Props, State> {
  state = {
    title: this.props.title,
    kind: this.props.kind,
    memo: this.props.memo,
    place: this.props.place,
    url: this.props.url,
    time: this.props.time,
    titleFocusCount: 0,
    manualTimeValue: 0,
    manualTime: false,
    keyboard: false,
    imageHeader: true,
    suggest: false,
  };

  scrollView: any;

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow.bind(this)
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide.bind(this)
    );
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShowListener: any;
  keyboardDidHideListener: any;

  _keyboardDidShow() {
    this.setState({
      keyboard: true,
    });
  }

  _keyboardDidHide() {
    this.setState({
      keyboard: false,
    });
  }

  onOpenActionSheet = () => {
    const options = times.map(val => val.label);

    let destructiveButtonIndex = times.findIndex(
      val => this.state.time === val.value
    );
    if (destructiveButtonIndex === null) {
      destructiveButtonIndex = manualButtonIndex;
    }

    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      buttonIndex => {
        // Do something here depending on the button index selected
        if (buttonIndex === cancelButtonIndex) {
          return;
        }

        if (buttonIndex === manualButtonIndex) {
          this.setState({ manualTime: true });
          return;
        }

        const value = times[buttonIndex].value || 0;

        this.setState({ time: value });
      }
    );
  };

  onChangeTitle = (title: string) => {
    if (this.props.iconSelected) {
      this.setState({ title });
    } else {
      this.setState({ title, kind: getKind(title) });
    }
  };

  onDismiss = (title: string, kind: string, memo: string, time: number) => {
    if (
      this.props.title !== title ||
      this.props.kind !== kind ||
      this.props.memo !== memo ||
      this.props.time !== time
    ) {
      Alert.alert(
        '保存されていない変更があります',
        '戻りますか？',
        [
          {
            text: 'キャンセル',
            style: 'cancel',
          },
          {
            text: '戻る',
            onPress: () => {
              this.props.onDismiss();
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      this.props.onDismiss();
    }
  };

  onSave = () => {
    if (this.state.title === '') {
      Alert.alert('タイトルが入力されていません');
    } else {
      const kind = this.props.iconSelected ? this.props.kind : this.state.kind;
      const { title, url, place, memo, time } = this.state;

      this.props.onSave(title, kind, place, url, memo, time);
    }
  };

  onSetManualTime = () => {
    this.setState({
      time: this.state.manualTimeValue,
      manualTime: false,
    });
  };

  onCloseManualTime = () => {
    this.setState({
      manualTime: false,
    });
  };

  onChangeMemoInput = (name: string, value: string) => {
    if (name === 'memo') {
      this.setState({
        memo: value,
      });
    } else if (name === 'place') {
      this.setState({
        place: value,
      });
    } else if (name === 'url') {
      this.setState({
        url: value,
      });
    }
  };

  onScroll = (e: NativeSyntheticEvent<TextInputScrollEventData>) => {
    const offsetY = 84 + (top || 0);

    if (e.nativeEvent.contentOffset.y >= offsetY && this.state.imageHeader) {
      this.setState({
        imageHeader: false,
      });
    }
    if (e.nativeEvent.contentOffset.y < offsetY && !this.state.imageHeader) {
      this.setState({
        imageHeader: true,
      });
    }
  };

  onSuggestTitle = () => {
    const titleFocusCount = this.state.titleFocusCount + 1;
    this.setState({
      titleFocusCount,
    });

    if (titleFocusCount > 1) {
      this.setState({
        suggest: true,
      });
    }
  };

  onSuggest = (_: string, name: string) => {
    this.setState({ title: name, kind: getKind(name), suggest: false });
  };

  onCloseKeyBoard = () => {
    Keyboard.dismiss();
    this.setState({
      suggest: false,
    });
  };

  render() {
    const kind = this.state.kind || KIND_DEFAULT;
    const config = KINDS[kind];
    const ss = s.schedule;
    const bc = Color(config.backgroundColor)
      .lighten(ss.backgroundColorAlpha)
      .toString();

    return (
      <View
        style={[
          styles.headerContainer,
          {
            backgroundColor: this.state.imageHeader ? bc : theme().color.white,
          },
        ]}
      >
        <Header
          title={this.state.imageHeader ? '' : this.state.title}
          color={this.state.imageHeader ? 'none' : bc}
          right={
            this.state.keyboard ? (
              <TouchableOpacity
                onPress={this.onCloseKeyBoard}
                testID="KeyBoardCloseInCreateScheduleDetail"
              >
                <MaterialCommunityIcons
                  name="keyboard-close"
                  color={theme().color.main}
                  size={25}
                  style={styles.keyboardClose}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={this.onSave}
                testID="ScheduleDetailCreated"
              >
                <MaterialIcons
                  name="check"
                  color={theme().color.main}
                  size={25}
                  style={styles.keyboardClose}
                />
              </TouchableOpacity>
            )
          }
          onClose={() =>
            this.onDismiss(
              this.state.title,
              this.state.kind,
              this.state.memo,
              this.state.time
            )
          }
        />
        <ScrollView
          ref={ref => {
            this.scrollView = ref;
          }}
          contentInsetAdjustmentBehavior="never"
          onScroll={this.onScroll}
          scrollEventThrottle={1000}
        >
          <SafeAreaView
            style={[
              GlobalStyles.droidSafeArea,
              styles.headerContainer,
              { backgroundColor: bc },
            ]}
          />
          <SafeAreaView style={styles.body}>
            <TimeDialog
              open={this.state.manualTime}
              onChange={value => this.setState({ manualTimeValue: value })}
              onSetManualTime={this.onSetManualTime}
              onCloseManualTime={this.onCloseManualTime}
            />
            <View style={styles.root}>
              <HeaderImage
                kind={
                  this.props.iconSelected ? this.props.kind : this.state.kind
                }
              >
                <TextInput
                  placeholder="タイトルを入力"
                  placeholderTextColor={theme().color.gray}
                  style={styles.inputTitle}
                  onChangeText={title =>
                    this.setState({ title, kind: getKind(title) })
                  }
                  value={this.state.title}
                  testID="ScheduleDetailTitleInput"
                  returnKeyType="done"
                  autoFocus
                  onFocus={this.onSuggestTitle}
                  selectionColor={theme().color.lightGreen}
                />
              </HeaderImage>

              {this.state.suggest ? (
                <Suggest
                  title={this.state.title}
                  items={this.props.suggestList}
                  onPress={this.onSuggest}
                />
              ) : (
                <Body
                  title={this.state.title}
                  place={this.state.place}
                  url={this.state.url}
                  memo={this.state.memo}
                  time={this.state.time}
                  scrollView={this.scrollView}
                  onIcons={this.props.onIcons}
                  onChangeMemoInput={this.onChangeMemoInput}
                  onOpenActionSheet={this.onOpenActionSheet}
                />
              )}
            </View>
          </SafeAreaView>
          <View style={styles.bottom} />
        </ScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  root: {
    backgroundColor: '$background',
    height: '100%',
    width: '100%',
  },
  headerContainer: {
    flex: 0,
  },
  body: {
    flex: 1,
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme().color.gray,
    paddingLeft: 1,
  },
  bottom: {
    height: 500,
    backgroundColor: '$background',
  },

  keyboardClose: {
    paddingRight: 5,
  },
});

export default connectActionSheet<PropsBase>(App);
