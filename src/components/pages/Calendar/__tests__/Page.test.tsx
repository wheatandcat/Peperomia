import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { calendarMockData } from '__mockData__/calendar.ts';
import Page, { Props } from '../Page';

const propsData = (): Props => ({
  calendar: calendarMockData(),
  onDismiss: jest.fn(),
  onUpdate: jest.fn(),
  onDelete: jest.fn(),
  onShare: jest.fn(),
  onAddItemDetail: jest.fn(),
  onItemDetail: jest.fn(),
  create: true,
});

describe('components/pages/Calendar/Page.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Page {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
