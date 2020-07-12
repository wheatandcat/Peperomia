import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import {
  itemDetailMockData,
  itemDetailsMockData,
} from '__mockData__/itemDetail.ts';
import Connected from '../Connected';
jest.mock('peperomia-util');
jest.mock('components/templates/CreateScheduleDetail/Page');

jest.mock('@react-navigation/native', () => {
  return {
    useRoute: () => ({
      params: {
        kind: 'park',
        refreshData: jest.fn(),
      },
    }),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe('components/pages/EditScheduleDetail/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData: any = () => ({
    ...itemDetailMockData,
    id: 'test',
    uid: 'test',
    itemDetails: itemDetailsMockData,
    refreshData: jest.fn(),
    onShow: jest.fn(),
  });

  beforeEach(() => {
    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
