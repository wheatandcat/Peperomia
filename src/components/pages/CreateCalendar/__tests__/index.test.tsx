import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as Auth from 'containers/Auth';
import * as Calendars from 'containers/Calendars';
import { CreateCalendar, Props } from '../';

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

describe('components/pages/CreateCalendar/index.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    jest
      .spyOn(Auth, 'useAuth')
      .mockImplementation(() => ({ uid: 'test' } as any));

    jest
      .spyOn(Calendars, 'useCalendars')
      .mockImplementation(() => ({ refetchCalendars: jest.fn() } as any));

    wrapper = shallow(<CreateCalendar {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
