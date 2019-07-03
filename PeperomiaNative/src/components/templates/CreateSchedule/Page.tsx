import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
  NativeSyntheticEvent,
  TextInputScrollEventData,
  KeyboardAvoidingView
} from "react-native";
import { Icon } from "react-native-elements";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Color from "color";
import getKind, { KINDS } from "../../../lib/getKind";
import theme from "../../../config/theme";
import s from "../../../config/style";
import { whenIPhoneSE } from "../../../lib/responsive";
import IconImage from "../../organisms/CreatePlan/IconImage";
import List, { Props as CardsProps } from "../../organisms/Schedule/List";
import { red } from "color-name";

const top =
  Platform.OS === "android" ? StatusBar.currentHeight : getStatusBarHeight();

interface State {
  imageHeader: boolean;
}

interface Props extends CardsProps {
  kind: string;
  image: string;
  title: string;
  onCreateScheduleDetail: () => void;
}

export default class extends Component<Props, State> {
  state = {
    imageHeader: true
  };

  scrollView: any;

  componentDidMount() {
    if (this.props.data.length > 1) {
      setTimeout(() => {
        this.scrollView.scrollToEnd();
      });
    }
  }

  onScroll = (e: NativeSyntheticEvent<TextInputScrollEventData>) => {
    const offsetY = 104 + (top || 0);

    if (e.nativeEvent.contentOffset.y >= offsetY && this.state.imageHeader) {
      this.setState({
        imageHeader: false
      });
    }
    if (e.nativeEvent.contentOffset.y < offsetY && !this.state.imageHeader) {
      this.setState({
        imageHeader: true
      });
    }
  };

  render() {
    let { image } = this.props;
    const kind = this.props.kind || getKind(this.props.title);
    const config = KINDS[kind];
    const ss = s.schedule;

    const imageSize = whenIPhoneSE(120, 180);

    return (
      <>
        {!this.state.imageHeader && (
          <View
            style={[
              styles.header,
              {
                backgroundColor: Color(config.backgroundColor)
                  .lighten(ss.backgroundColorAlpha)
                  .toString()
              }
            ]}
          >
            <Text style={styles.headerTitle}>{this.props.title}</Text>
          </View>
        )}
        <ScrollView
          ref={ref => {
            this.scrollView = ref;
          }}
          contentInsetAdjustmentBehavior="never"
          onScroll={this.onScroll}
          scrollEventThrottle={1000}
        >
          <View
            style={{
              backgroundColor: Color(config.backgroundColor)
                .lighten(ss.backgroundColorAlpha)
                .toString()
            }}
          >
            <IconImage
              image={image}
              imageSrc={config.src}
              imageSize={imageSize}
              backgroundColor="#FFF"
              onSave={() => {}}
              onOpenActionSheet={() => {}}
            />
            <Text style={styles.headerImageTitle}>{this.props.title}</Text>
          </View>

          <View style={{ paddingTop: 60 }}>
            <Text style={styles.scheduleText}>スケジュール</Text>

            <List
              data={this.props.data}
              onScheduleDetail={this.props.onScheduleDetail}
            />

            <View
              style={[
                styles.addButoon,
                {
                  height: this.props.data.length > 0 ? 150 : 300
                }
              ]}
            >
              <TouchableOpacity onPress={this.props.onCreateScheduleDetail}>
                <Icon
                  name="add"
                  size={30}
                  color={theme.color.lightGreen}
                  raised
                  reverse
                />
              </TouchableOpacity>
              <Text style={styles.addButoonText}>スケジュールを追加する</Text>
            </View>
            <View style={{ height: 100 }} />
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    width: "100%",
    top: 0,
    left: 0,
    position: "absolute",
    borderBottomWidth: 1,
    borderColor: theme.color.lightGray,
    zIndex: 20,
    paddingLeft: 20,
    justifyContent: "center"
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500"
  },
  headerImageTitle: {
    paddingLeft: 20,
    fontSize: 30,
    fontWeight: "500"
  },
  scheduleText: {
    paddingLeft: 20,
    paddingBottom: 20,
    fontSize: 16,
    fontWeight: "500"
  },
  addButoon: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  addButoonText: {
    color: theme.color.gray,
    fontSize: 16,
    fontWeight: "500",
    paddingTop: 25
  }
});
