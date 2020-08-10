import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Connected from '../Connected';

describe('components/pages/CreateSchedule/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData: any = () => ({
    navigation: {
      setParams: jest.fn(),
      navigate: jest.fn(),
    },
    refresh: '',
    itemId: '1',
    uid: 'test',
  });

  beforeEach(() => {
    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
