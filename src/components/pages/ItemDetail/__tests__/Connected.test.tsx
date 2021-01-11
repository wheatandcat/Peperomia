import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as useItemDetail from 'hooks/useItemDetail';
import { itemDetailMockData } from '__mockData__/itemDetail.ts';
import * as useDeleteItemDetail from 'hooks/useDeleteItemDetail';
import * as useUpdateMainItemDetail from 'hooks/useUpdateMainItemDetail';
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
      itemDetailId: 'test',
      onCallback: jest.fn(),
    },
  },
});

describe('components/pages/ItemDetail/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    jest
      .spyOn(useDeleteItemDetail, 'default')
      .mockImplementation(() => [jest.fn()] as any);

    jest
      .spyOn(useUpdateMainItemDetail, 'default')
      .mockImplementation(() => [jest.fn()] as any);

    jest.spyOn(useItemDetail, 'default').mockImplementation(
      () =>
        ({
          data: { itemDetail: itemDetailMockData() },
          loading: false,
          error: null,
          refetch: jest.fn(),
        } as any)
    );

    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
