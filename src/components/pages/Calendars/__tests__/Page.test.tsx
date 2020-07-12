import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Page from '../Page';

describe('components/pages/Calendars/Page.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData: any = () => ({
    loading: false,
    calendars: [],
    onCreate: jest.fn(),
    onSchedule: jest.fn(),
  });

  beforeEach(() => {
    jest.useFakeTimers();
    wrapper = shallow(<Page {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
