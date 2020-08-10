import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Theme from '../Theme';

describe('containers/Theme.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData: any = () => ({
    children: <div />,
  });

  beforeEach(() => {
    wrapper = shallow(<Theme {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
