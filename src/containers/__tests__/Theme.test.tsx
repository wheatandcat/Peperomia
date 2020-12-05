import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Theme from '../Theme';

jest.mock('react-native-appearance', () => {
  const appearance = jest.requireActual('react-native-appearance');
  return {
    ...appearance,
    useColorScheme: () => jest.fn(),
  };
});

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
