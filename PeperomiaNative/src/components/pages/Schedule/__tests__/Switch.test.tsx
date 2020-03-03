import React from 'react';
import { Share, AsyncStorage } from 'react-native';
import { shallow, ShallowWrapper } from 'enzyme';
import * as itemDetail from '../../../../lib/itemDetail';
import * as item from '../../../../lib/item';
import * as plan from '../../../../lib/firestore/plan';
import * as Items from '../../../../containers/Items';
import * as Auth from '../../../../containers/Auth';
import Switch, { Connected, SwitchType } from '../Switch';

jest.mock('react-native-vector-icons', () => 'Icon');

describe('components/pages/Schedule/Switch.tsx', () => {
  describe('Switch', () => {
    let wrapper: ShallowWrapper;

    const navigate = jest.fn();
    const getParam = jest.fn();
    const setParams = jest.fn();

    const propsData: any = () => ({
      navigation: {
        navigate,
        getParam,
        setParams,
        goBack: jest.fn(),
      },
    });

    beforeEach(() => {
      jest.spyOn(Auth, 'useAuth').mockImplementation(
        () =>
          ({
            uid: '1',
          } as any)
      );

      jest.spyOn(Items, 'useItems').mockImplementation(
        () =>
          ({
            refreshData: jest.fn(),
          } as any)
      );

      wrapper = shallow(<Switch {...propsData()} />);
    });

    it('正常に表示されている', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Connected', () => {
    let wrapper: ShallowWrapper<SwitchType>;

    const navigate = jest.fn();
    const getParam = jest.fn();
    const setParams = jest.fn();
    const showActionSheetWithOptions = jest.fn();

    const propsData: any = () => ({
      uid: '1',
      refreshData: jest.fn(),
      showActionSheetWithOptions,
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

      jest.spyOn(React, 'useEffect').mockImplementation(async f => await f());

      wrapper = shallow(<Connected {...propsData()} />);
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

      await setParams.mock.calls[0][0].onShare('test', []);
    });

    it('onOpenActionSheet => userID無し', async () => {
      jest.spyOn(plan, 'isShare').mockImplementation(() => true as any);

      await setParams.mock.calls[0][0].onOpenActionSheet('1', 'test', []);

      showActionSheetWithOptions.mock.calls[0][1](0);
      showActionSheetWithOptions.mock.calls[0][1](1);
    });

    it('onOpenActionSheet => userID => 未公開', async () => {
      jest.spyOn(plan, 'isShare').mockImplementation(() => false as any);
      jest
        .spyOn(AsyncStorage, 'getItem')
        .mockImplementation(() => 'test' as any);

      await setParams.mock.calls[0][0].onOpenActionSheet('1', 'test', []);
    });

    it('onOpenActionSheet => userID => 公開', async () => {
      jest.spyOn(plan, 'isShare').mockImplementation(() => true as any);
      jest
        .spyOn(AsyncStorage, 'getItem')
        .mockImplementation(() => 'test' as any);

      await setParams.mock.calls[0][0].onOpenActionSheet('1', 'test', []);

      showActionSheetWithOptions.mock.calls[2][1](0);
      showActionSheetWithOptions.mock.calls[2][1](1);
      showActionSheetWithOptions.mock.calls[2][1](2);
    });
  });
});
