import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Items from '../Items';

describe('containers/Items.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData: any = () => ({
    children: <div>hi</div>,
  });

  beforeEach(() => {
    wrapper = shallow(<Items {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
