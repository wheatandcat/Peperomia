import React from 'react';
import { Alert } from 'react-native';
import { shallow, ShallowWrapper } from 'enzyme';
import Loading from 'components/molecules/ScheduleDetail/Loading';
import Card from 'components/molecules/ScheduleDetail/Card';
import Connected, { ScheduleDetailPage, ScheduleDetailType } from '../Page';
import { mockData } from './mockData';

describe('components/pages/ScheduleDetail/Page.tsx', () => {
  let wrapper: ShallowWrapper<ScheduleDetailType>;

  describe('Connected', () => {
    const propsData = () => ({
      ...mockData,
      loading: false,
      onDismiss: jest.fn(),
      onDelete: jest.fn(),
      onCreateScheduleDetail: jest.fn(),
    });

    it('正常に表示されている', () => {
      wrapper = shallow(<Connected {...propsData()} />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('ScheduleDetailPage', () => {
    const showActionSheetWithOptions = jest.fn();
    const onCreateScheduleDetail = jest.fn();
    const onDelete = jest.fn();

    const propsData = () => ({
      ...mockData,
      loading: false,
      onDismiss: jest.fn(),
      onDelete,
      onCreateScheduleDetail,
      showActionSheetWithOptions,
    });

    it('正常に表示されている', () => {
      wrapper = shallow(<ScheduleDetailPage {...propsData()} />);

      expect(wrapper).toMatchSnapshot();
    });
    it('Loadingが表示されている', () => {
      wrapper = shallow(<ScheduleDetailPage {...propsData()} loading />);

      expect(wrapper.find(Loading).exists()).toBeTruthy();
    });

    describe('onOpenActionSheet', () => {
      wrapper = shallow(<ScheduleDetailPage {...propsData()} />);

      wrapper.find(Card).props().onOpenActionSheet();

      it('編集', () => {
        showActionSheetWithOptions.mock.calls[0][1](0);

        expect(onCreateScheduleDetail.mock.calls.length).toBe(1);
      });

      it('削除', () => {
        const alertMock = jest.fn();
        jest.spyOn(Alert, 'alert').mockImplementation(alertMock);

        showActionSheetWithOptions.mock.calls[0][1](1);
        alertMock.mock.calls[0][2][1].onPress();

        expect(onDelete.mock.calls.length).toBe(1);
      });
    });
  });
});
