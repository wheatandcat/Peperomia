import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  StatusBar,
  Platform,
  NativeSyntheticEvent,
  TextInputScrollEventData,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Icon } from 'react-native-elements';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { MaterialIcons } from '@expo/vector-icons';
import Color from 'color';
import { ItemDetail } from '../../../lib/db/itemDetail';
import getKind, { KINDS } from '../../../lib/getKind';
import theme from '../../../config/theme';
import s from '../../../config/style';
import { whenIPhoneSE } from '../../../lib/responsive';
import { Item as ItemParam } from '../../../domain/item';
import IconImage from '../../organisms/CreatePlan/IconImage';
import List from '../../organisms/Schedule/List';
import Header from '../../molecules/Header';
import { ConnectedType } from '../../pages/Schedule/Connected';

const top =
  Platform.OS === 'android' ? StatusBar.currentHeight : getStatusBarHeight();

type State = {
  imageHeader: boolean;
};

type Props = Pick<ConnectedType, 'onScheduleDetail'> &
  ItemParam & {
    data: ItemDetail[];
    onFinish: () => void;
    onGoBack: () => void;
    onCreateScheduleDetail: () => void;
  };

export default class extends Component<Props, State> {
  state = {
    imageHeader: true,
  };

  scrollView: any;

  componentDidMount() {
    if (this.props.data.length > 1) {
      setTimeout(() => {
        this.scrollView.scrollToEnd();
      });
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.data.length > 1) {
      if (this.props.data.length !== prevProps.data.length) {
        setTimeout(() => {
          this.scrollView.scrollToEnd();
        });
      }
    }
  }

  onScroll = (e: NativeSyntheticEvent<TextInputScrollEventData>) => {
    const offsetY = 104 + (top || 0);

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

  render() {
    const kind = this.props.kind || getKind(this.props.title);
    const config = KINDS[kind];
    const ss = s.schedule;
    const bc = Color(config.backgroundColor)
      .lighten(ss.backgroundColorAlpha)
      .toString();
    const imageSize = whenIPhoneSE(120, 180);
    const height = this.props.data.length > 0 ? 150 : 300;

    return (
      <View
        style={[
          styles.headrContainer,
          {
            backgroundColor: this.state.imageHeader
              ? bc
              : theme().mode.background,
          },
        ]}
      >
        <Header
          title={this.state.imageHeader ? '' : this.props.title}
          color={this.state.imageHeader ? 'none' : bc}
          right={
            <TouchableOpacity
              onPress={this.props.onFinish}
              testID="CreateScheduleFinished"
            >
              <MaterialIcons
                name="check"
                color={theme().color.main}
                size={25}
                style={styles.headerRightIcon}
              />
            </TouchableOpacity>
          }
          onClose={this.props.onGoBack}
        />
        <ScrollView
          ref={ref => {
            this.scrollView = ref;
          }}
          contentInsetAdjustmentBehavior="never"
          onScroll={this.onScroll}
          scrollEventThrottle={1000}
        >
          <View
            style={[
              styles.contents,
              {
                backgroundColor: Color(config.backgroundColor)
                  .lighten(ss.backgroundColorAlpha)
                  .toString(),
              },
            ]}
          >
            <IconImage
              imageSrc={config.src}
              imageSize={imageSize}
              backgroundColor={theme().mode.background}
              onSave={() => {}}
              onOpenActionSheet={() => {}}
            />
            <Text style={styles.headerImageTitle}>{this.props.title}</Text>
          </View>

          <View style={styles.schedules}>
            <Text style={styles.scheduleText}>スケジュール</Text>

            <List
              data={this.props.data}
              onScheduleDetail={this.props.onScheduleDetail}
            />

            <View style={[styles.addButoon, { height }]}>
              <TouchableOpacity
                onPress={this.props.onCreateScheduleDetail}
                testID="ScheduleDetailAdd"
              >
                <Icon
                  name="add"
                  size={30}
                  color={theme().color.lightGreen}
                  raised
                  reverse
                />
              </TouchableOpacity>
              <Text style={styles.addButoonText}>スケジュールを追加する</Text>
            </View>
            <View style={styles.bottom} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  headrContainer: {
    flex: 0,
    height: '100%',
  },
  headerImageTitle: {
    paddingLeft: 20,
    fontSize: 30,
    fontWeight: '500',
    color: '$text',
  },
  headerRightIcon: {
    paddingRight: 5,
  },
  contents: {
    paddingTop: 50,
  },
  bottom: {
    height: 120,
  },
  scheduleText: {
    paddingLeft: 20,
    paddingBottom: 20,
    fontSize: 16,
    fontWeight: '500',
    color: '$text',
  },
  addButoon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  addButoonText: {
    color: '$text',
    fontSize: 16,
    fontWeight: '500',
    paddingTop: 25,
  },
  schedules: {
    paddingTop: 60,
    backgroundColor: '$background',
    height: '100%',
  },
});
