import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as Items from 'containers/Items';
import * as Auth from 'containers/Auth';
import Index from '..';

jest.mock('react-native-vector-icons', () => 'Icon');

describe('components/pages/Schedule/index.tsx', () => {
  describe('Index', () => {
    let wrapper: ShallowWrapper;

    const navigate = jest.fn();
    const route = {
      params: {
        itemId: 1,
        title: 'test',
      },
    };
    const getParam = jest.fn();
    const setParams = jest.fn();

    const propsData: any = () => ({
      route,
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

      wrapper = shallow(<Index {...propsData()} />);
    });

    it('正常に表示されている', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
