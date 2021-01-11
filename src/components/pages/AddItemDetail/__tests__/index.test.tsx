import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import AddItemDetail, { Props } from '../';

const propsData = (): Props =>
  ({
    navigation: {
      setParams: jest.fn(),
      navigate: jest.fn(),
    },
    route: {
      params: {
        date: '2020-01-01 00:00:00',
        itemId: 'test',
        priority: 1,
        onCallback: jest.fn(),
      },
    },
  } as any);

describe('components/pages/AddItemDetail/index.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<AddItemDetail {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
