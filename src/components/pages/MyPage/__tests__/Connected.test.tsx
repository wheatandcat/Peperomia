import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as queries from 'queries/api/index';
import Connected from '../Connected';

describe('components/pages/MyPage/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData: any = () => ({
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
    refetchCalendars: jest.fn(),
    uid: 'test',
    email: 'test',
    post: jest.fn(),
    onPermissionRequest: jest.fn(),
  });

  beforeEach(() => {
    jest
      .spyOn(queries, 'useSyncCalendarsMutation')
      .mockImplementation(() => [jest.fn()] as any);

    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
