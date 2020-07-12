import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Text from '../Text';

describe('components/atoms/Text.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData: any = () => ({});

  beforeEach(() => {
    wrapper = shallow(<Text {...propsData()}>test</Text>);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
