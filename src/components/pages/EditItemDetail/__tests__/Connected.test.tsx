import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as useUpdateItemDetail from 'hooks/useUpdateItemDetail';
import * as useItemDetail from 'hooks/useItemDetail';
import { itemDetailMockData } from '__mockData__/itemDetail.ts';
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

describe('components/pages/EditItemDetail/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    jest
      .spyOn(useUpdateItemDetail, 'default')
      .mockImplementation(() => [jest.fn(), jest.fn()] as any);

    jest.spyOn(useItemDetail, 'default').mockImplementation(
      () =>
        ({
          data: {
            itemDetail: itemDetailMockData(),
          },
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
