import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Auth from '../Auth';

describe('containers/Auth.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData: any = () => ({
    children: <div>hi</div>,
  });

  beforeEach(() => {
    wrapper = shallow(<Auth {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
