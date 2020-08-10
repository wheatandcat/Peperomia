import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Fetch from '../Fetch';

describe('containers/Fetch.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData: any = () => ({
    children: <div />,
  });

  beforeEach(() => {
    wrapper = shallow(<Fetch {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
