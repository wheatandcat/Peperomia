import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as Items from 'containers/Items';
import * as Auth from 'containers/Auth';
import {
  itemDetailMockData,
  itemDetailsMockData,
} from '__mockData__/itemDetail.ts';
import Index from '../';

describe('components/pages/EditScheduleDetail/index.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData: any = () => ({
    ...itemDetailMockData,
    id: 'test',
    onShow: jest.fn(),
  });

  beforeEach(() => {
    jest.spyOn(Items, 'useItems').mockImplementation(
      () =>
        ({
          refreshData: jest.fn(),
          itemDetails: itemDetailsMockData,
        } as any)
    );
    jest.spyOn(Auth, 'useAuth').mockImplementation(
      () =>
        ({
          uid: 'test',
        } as any)
    );
    wrapper = shallow(<Index {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
