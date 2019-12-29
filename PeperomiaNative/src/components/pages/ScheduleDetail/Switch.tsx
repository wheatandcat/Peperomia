import React, { Component } from 'react';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import {
  Consumer as ItemsConsumer,
  ContextProps,
} from '../../../containers/Items';
import { ItemDetail as ItemDetailParam } from '../../../domain/itemDetail';
import ScheduleDetail from './Connected';
import EditScheduleDetail from '../EditScheduleDetail/Connected';

type State = ItemDetailParam & {
  scheduleDetailId: number;
  mode: string;
};

type Props = {
  navigation: NavigationScreenProp<NavigationRoute>;
};

type PlanProps = Props & Pick<ContextProps, 'refreshData'>;

export default class extends Component<Props> {
  render() {
    return (
      <ItemsConsumer>
        {({ refreshData }: ContextProps) => (
          <Plan {...this.props} refreshData={refreshData} />
        )}
      </ItemsConsumer>
    );
  }
}

class Plan extends Component<PlanProps, State> {
  static navigationOptions = { header: null };

  state = {
    title: '',
    memo: '',
    kind: '',
    url: '',
    place: '',
    moveMinutes: 0,
    priority: 0,
    scheduleDetailId: 0,
    mode: 'show',
  };

  onEdit = (
    title: string,
    kind: string,
    place: string,
    url: string,
    memo: string,
    moveMinutes: number,
    priority: number
  ): void => {
    const scheduleDetailId = this.props.navigation.getParam(
      'scheduleDetailId',
      '1'
    );

    this.setState({
      title,
      kind,
      memo,
      place,
      url,
      moveMinutes,
      priority,
      scheduleDetailId,
      mode: 'edit',
    });
  };

  onShow = (): void => {
    this.setState({ mode: 'show' });
  };

  render() {
    if (this.state.mode === 'edit') {
      return (
        <EditScheduleDetail
          id={this.state.scheduleDetailId}
          title={this.state.title}
          kind={this.state.kind}
          url={this.state.url}
          place={this.state.place}
          memo={this.state.memo}
          moveMinutes={this.state.moveMinutes}
          priority={this.state.priority}
          navigation={this.props.navigation}
          onShow={this.onShow}
        />
      );
    }

    return (
      <ScheduleDetail
        navigation={this.props.navigation}
        refreshData={this.props.refreshData}
        onEdit={this.onEdit}
      />
    );
  }
}
