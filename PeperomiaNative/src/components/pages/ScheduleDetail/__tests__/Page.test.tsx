import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Page from '../Page';
import { mockData } from './mockData';

describe('components/pages/ScheduleDetail/Page.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData = () => ({
    ...mockData,
    loading: false,
    onDismiss: jest.fn(),
    onDelete: jest.fn(),
    onCreateScheduleDetail: jest.fn(),
  });

  beforeEach(() => {
    wrapper = shallow(<Page {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
