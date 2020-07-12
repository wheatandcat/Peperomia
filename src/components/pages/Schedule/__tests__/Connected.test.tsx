import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { itemDetailsMockData } from '__mockData__/itemDetail.ts';
import * as Auth from 'containers/Auth';
import Connected from '../Connected';

0;

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

describe('components/pages/Schedule/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData: any = () => ({
    itemDetails: itemDetailsMockData,
    loading: false,
    onAdd: jest.fn(),
    onSort: jest.fn(),
    onDelete: jest.fn(),
    onScheduleDetail: jest.fn(),
    navigation: {
      setParams: jest.fn(),
      navigate: jest.fn(),
    },
    route: {
      params: {
        itemId: '1',
        refresh: '',
      },
    },
  });

  beforeEach(() => {
    jest.spyOn(Auth, 'useAuth').mockImplementation(
      () =>
        ({
          uid: 'test',
        } as any)
    );

    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
