import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as Items from 'containers/Items';
import {
  itemDetailMockData,
  itemDetailsMockData,
} from '__mockData__/itemDetail.ts';
import Connected from '../Connected';

describe('components/pages/AddScheduleDetail/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData = () => ({
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

    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
