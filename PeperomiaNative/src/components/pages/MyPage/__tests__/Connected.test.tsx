import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as Items from 'containers/Items';
import * as Auth from 'containers/Auth';
import * as Fetch from 'containers/Fetch';
import * as Notification from 'containers/Notification';
import Connected from '../Connected';

describe('components/pages/MyPage/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData = () => ({
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
    jest.spyOn(Items, 'useItems').mockImplementation(
      () =>
        ({
          refreshData: jest.fn(),
        } as any)
    );
    jest.spyOn(Auth, 'useAuth').mockImplementation(
      () =>
        ({
          email: 'test',
          uid: 'test',
        } as any)
    );
    jest.spyOn(Fetch, 'useFetch').mockImplementation(
      () =>
        ({
          post: jest.fn(),
        } as any)
    );
    jest.spyOn(Notification, 'useNotification').mockImplementation(
      () =>
        ({
          onPermissionRequest: jest.fn(),
        } as any)
    );

    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
