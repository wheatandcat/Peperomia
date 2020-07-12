import React from 'react';
import { Share } from 'react-native';
import { shallow, ShallowWrapper } from 'enzyme';
import * as itemDetail from 'lib/itemDetail';
import * as item from 'lib/item';
import Switch, { SwitchType } from '../Switch';

jest.mock('react-native-vector-icons', () => 'Icon');

describe('components/pages/Schedule/Switch.tsx', () => {
  describe('Switch', () => {
    let wrapper: ShallowWrapper<SwitchType>;

    const navigate = jest.fn();
    const getParam = jest.fn();
    const setParams = jest.fn();
    const showActionSheetWithOptions = jest.fn();

    const route = {
      params: {
        itemId: 1,
        title: 'test',
      },
    };
    const propsData: any = () => ({
      uid: '1',
      refreshData: jest.fn(),
      showActionSheetWithOptions,
      route,
      navigation: {
        navigate,
        getParam,
        setParams,
        goBack: jest.fn(),
      },
    });

    beforeEach(() => {
      jest.spyOn(item, 'getItemByID').mockImplementation(
        () =>
          ({
            id: '1',
            title: 'test',
            kind: 'test',
          } as any)
      );

      jest.spyOn(React, 'useEffect').mockImplementation(async (f) => await f());

      wrapper = shallow(<Switch {...propsData()} />);
    });

    it('正常に表示されている', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('onAdd', () => {
      wrapper.props().onAdd([]);
    });

    it('onDelete', async () => {
      jest.spyOn(item, 'deleteItem').mockImplementation(() => true as any);

      await wrapper.props().onDelete();
    });

    it('onShow', () => {
      setParams.mock.calls[0][0].onShow();
      expect(setParams).toHaveBeenCalledWith({
        mode: 'show',
      });
    });

    it('onSave => 成功', async () => {
      jest
        .spyOn(itemDetail, 'updateItemDetail')
        .mockImplementation(() => true as any);

      await setParams.mock.calls[0][0].onSave();
    });

    it('onSave => 失敗', async () => {
      jest
        .spyOn(itemDetail, 'updateItemDetail')
        .mockImplementation(() => false as any);

      await setParams.mock.calls[0][0].onSave();
    });

    it('onEditPlan', () => {
      setParams.mock.calls[4][0].onEditPlan({
        id: '1',
        title: 'test',
        kind: 'test',
      });
    });

    it('onSort', async () => {
      jest
        .spyOn(itemDetail, 'getItemDetails')
        .mockImplementation(() => [] as any);

      await wrapper.props().onSort();
      expect(setParams).toHaveBeenCalledWith({
        mode: 'sort',
      });
    });

    it('onShare', async () => {
      jest
        .spyOn(itemDetail, 'getItemDetails')
        .mockImplementation(() => [] as any);

      jest.spyOn(Share, 'share').mockImplementation(() => ({} as any));
    });
  });
});
