import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Connected from '../Connected';
import { itemsMockData } from '__mockData__/item';
import { calendarsMockData } from '__mockData__/calendar';

describe('components/pages/CreatePlan/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData: any = () => ({
    navigation: {
      setParams: jest.fn(),
      navigate: jest.fn(),
    },
    uid: 'test',
    items: itemsMockData,
    calendars: calendarsMockData,
    refreshData: jest.fn(),
    date: '',
    kind: '',
  });

  beforeEach(() => {
    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
