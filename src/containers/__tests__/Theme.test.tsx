import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Items from '../Items';

jest.mock('react-native-appearance', () => {
  const appearance = jest.requireActual('react-native-appearance');
  return {
    ...appearance,
    useColorScheme: () => jest.fn(),
  };
});

describe('containers/Items.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData: any = () => ({
    children: <div />,
  });

  beforeEach(() => {
    wrapper = shallow(<Items {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
