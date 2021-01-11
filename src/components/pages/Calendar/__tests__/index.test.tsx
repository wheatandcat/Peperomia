import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as Calendars from 'containers/Calendars';
import * as Auth from 'containers/Auth';
import Calendar, { Props } from '../';

const propsData = (): Props =>
  ({
    navigation: {
      setParams: jest.fn(),
      navigate: jest.fn(),
    },
    route: {
      params: {
        date: '2020-01-01 00:00:00',
      },
    },
  } as any);

describe('components/pages/Calendar/index.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    jest
      .spyOn(Calendars, 'useCalendars')
      .mockImplementation(() => ({ refetchCalendars: jest.fn() } as any));

    jest
      .spyOn(Auth, 'useAuth')
      .mockImplementation(() => ({ uid: 'test' } as any));

    wrapper = shallow(<Calendar {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
