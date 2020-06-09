import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as Items from 'containers/Items';
import * as Auth from 'containers/Auth';
import EditPlan, { Connected } from '../Connected';

describe('components/pages/EditPlan/Connected.tsx', () => {
  describe('EditPlan', () => {
    let wrapper: ShallowWrapper;

    const propsData: any = () => ({
      title: 'test',
      kind: 'park',
      navigation: {
        setParams: jest.fn(),
        navigate: jest.fn(),
      },
      route: {
        params: {
          itemId: '1',
          refresh: '',
        },
      },
    });

    beforeEach(() => {
      jest.spyOn(Items, 'useItems').mockImplementation(
        () =>
          ({
            refreshData: jest.fn(),
            items: [],
            calendars: [],
          } as any)
      );

      wrapper = shallow(<EditPlan {...propsData()} />);
    });

    it('正常に表示されている', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Connected', () => {
    let wrapper: ShallowWrapper;

    const propsData: any = () => ({
      title: 'test',
      kind: 'park',
      navigation: {
        setParams: jest.fn(),
        navigate: jest.fn(),
      },
      route: {
        params: {
          itemId: '1',
          refresh: '',
        },
      },
      items: [],
      refreshData: jest.fn(),
      calendars: [],
    });

    beforeEach(() => {
      jest.spyOn(Auth, 'useAuth').mockImplementation(
        () =>
          ({
            uid: 'test',
          } as any)
      );
      jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
      wrapper = shallow(<Connected {...propsData()} />);
    });

    it('正常に表示されている', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
