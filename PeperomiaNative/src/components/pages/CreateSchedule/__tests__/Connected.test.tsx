import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as Auth from 'containers/Auth';
import Connected from '../Connected';

describe('components/pages/CreateSchedule/Connected.tsx', () => {
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
    jest.spyOn(Auth, 'useAuth').mockImplementation(
      () =>
        ({
          uid: '1',
        } as any)
    );

    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
