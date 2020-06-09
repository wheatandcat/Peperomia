import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Connected from '../Connected';

describe('components/pages/Home/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData: any = () => ({});

  beforeEach(() => {
    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
