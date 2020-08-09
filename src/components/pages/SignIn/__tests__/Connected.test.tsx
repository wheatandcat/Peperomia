import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Connected from '../Connected';

describe('components/pages/SignIn/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData: any = () => ({
    navigation: {
      setParams: jest.fn(),
      navigate: jest.fn(),
    },
    route: {
      params: {
        onLogin: jest.fn(),
      },
    },
    refreshData: jest.fn(),
    onGoogleLogin: jest.fn(),
    onAppleLogin: jest.fn(),
    logout: jest.fn(),
    post: jest.fn(),
    uid: 'test',
  });

  beforeEach(() => {
    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
