import React from 'react';
import Page from '../Page';
import { shallow, ShallowWrapper } from 'enzyme';
import { mockData } from './mockData';

describe('components/pages/Home/Page.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData = () => ({
    data: mockData,
    loading: false,
    onSchedule: jest.fn(),
    onDelete: jest.fn(),
  });

  beforeEach(() => {
    wrapper = shallow(<Page {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
