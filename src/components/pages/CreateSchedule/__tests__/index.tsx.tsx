import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as Auth from 'containers/Auth';
import Index from '../';

describe('components/pages/CreateSchedule/index.tsx', () => {
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
  });

  beforeEach(() => {
    jest.spyOn(Auth, 'useAuth').mockImplementation(
      () =>
        ({
          uid: '1',
        } as any)
    );

    wrapper = shallow(<Index {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
