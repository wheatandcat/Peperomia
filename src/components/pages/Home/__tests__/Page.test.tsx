import React from 'react';
import { Text } from 'react-native';
import { shallow, ShallowWrapper } from 'enzyme';
import Page from '../Page';
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

  describe('予定がありません', () => {
    it('テキストが表示されている', () => {
      wrapper.setProps({
        ...propsData(),
        data: [],
        loading: false,
      });

      expect(wrapper.find(Text).first().prop('children')).toEqual(
        '予定がありません'
      );
    });
  });
});
