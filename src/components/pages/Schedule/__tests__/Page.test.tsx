import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Page from '../Page';
import { mockData } from './mockData';

describe('components/pages/Schedule/Page.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData = () => ({
    data: mockData,
    loading: false,
    onAdd: jest.fn(),
    onSort: jest.fn(),
    onDelete: jest.fn(),
    onScheduleDetail: jest.fn(),
  });

  beforeEach(() => {
    wrapper = shallow(<Page {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
