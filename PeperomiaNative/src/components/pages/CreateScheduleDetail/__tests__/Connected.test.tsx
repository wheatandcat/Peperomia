import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { itemDetailsMockData } from '__mockData__/itemDetail.ts';
import Connected from '../Connected';

describe('components/pages/CreateScheduleDetail/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData: any = () => ({
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
    refreshData: jest.fn(),
    itemDetails: itemDetailsMockData,
    uid: 'test',
  });

  beforeEach(() => {
    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
