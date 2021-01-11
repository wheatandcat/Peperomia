import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as useCreateItemDetail from 'hooks/useCreateItemDetail';
import Connected from '../Connected';

const propsData = (): any => ({
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
});

describe('components/pages/AddItemDetail/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    jest
      .spyOn(useCreateItemDetail, 'default')
      .mockImplementation(() => [jest.fn(), jest.fn()] as any);

    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
