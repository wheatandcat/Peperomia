import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ItemDetail, { Props } from '../';

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
        itemDetailId: 'test',
        onCallback: jest.fn(),
      },
    },
  } as any);

describe('components/pages/ItemDetail/index.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<ItemDetail {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
