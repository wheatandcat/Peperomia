import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Index from '../index';

describe('components/pages/Home/index.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData: any = () => ({});

  beforeEach(() => {
    wrapper = shallow(<Index {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
