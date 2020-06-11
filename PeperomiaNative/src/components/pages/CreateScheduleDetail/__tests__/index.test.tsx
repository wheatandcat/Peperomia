import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as Items from 'containers/Items';
import * as Auth from 'containers/Auth';
import {
  itemDetailMockData,
  itemDetailsMockData,
} from '__mockData__/itemDetail.ts';
import Index from '../index';

describe('components/pages/CreateScheduleDetail/index.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData: any = () => ({
    ...itemDetailMockData,
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
          itemDetails: itemDetailsMockData,
        } as any)
    );
    jest.spyOn(Auth, 'useAuth').mockImplementation(
      () =>
        ({
          uid: 'test',
        } as any)
    );
    wrapper = shallow(<Index {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
