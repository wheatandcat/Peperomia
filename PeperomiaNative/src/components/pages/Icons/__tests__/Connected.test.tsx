import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Connected from '../Connected';

describe('components/pages/Icons/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData = () => ({
    navigation: {
      setParams: jest.fn(),
      navigate: jest.fn(),
    },
    route: {
      params: {
        onDismiss: jest.fn(),
        onSelectIcon: jest.fn(),
        kind: 'park',
        defaultIcon: false,
        photo: false,
      },
    },
  });

  beforeEach(() => {
    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
