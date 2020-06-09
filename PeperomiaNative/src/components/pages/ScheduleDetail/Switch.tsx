import React, { Component } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'lib/navigation';
import { ContextProps as ItemsContextProps, useItems } from 'containers/Items';
import { ItemDetail as ItemDetailParam } from 'domain/itemDetail';
import ScheduleDetail from './Connected';
import EditScheduleDetail from 'components/pages/EditScheduleDetail/Connected';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ScheduleDetail'
>;
export type ScreenRouteProp = RouteProp<RootStackParamList, 'ScheduleDetail'>;

type State = ItemDetailParam & {
  scheduleDetailId: string | number;
  mode: string;
};

type SwitchProps = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

type Props = SwitchProps & Pick<ItemsContextProps, 'refreshData'>;

const Switch = (props: SwitchProps) => {
  const { refreshData } = useItems();

  return <Plan {...props} refreshData={refreshData} />;
};

class Plan extends Component<Props, State> {
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
    const scheduleDetailId = this.props.route.params.scheduleDetailId || '1';

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
          onShow={this.onShow}
        />
      );
    }

    return (
      <ScheduleDetail
        navigation={this.props.navigation}
        route={this.props.route}
        refreshData={this.props.refreshData}
        onEdit={this.onEdit}
      />
    );
  }
}

export default Switch;
