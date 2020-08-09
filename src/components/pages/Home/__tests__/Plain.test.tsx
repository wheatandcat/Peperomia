import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Plain from '../Plain';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useFocusEffect: () => jest.fn(),
    useNavigation: () => ({
      navigation: () => jest.fn(),
    }),
  };
});

describe('components/pages/Home/Plain.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData: any = () => ({
    refreshData: jest.fn(),
    items: [],
    about: '',
    refresh: false,
    loading: false,
    uid: 'test',
  });

  beforeEach(() => {
    wrapper = shallow(<Plain {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
