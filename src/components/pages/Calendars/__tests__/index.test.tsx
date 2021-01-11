import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as ContainerCalendars from 'containers/Calendars';
import { calendarsMockData } from '__mockData__/calendar.ts';
import Calendars from '../';

const propsData = (): any =>
  ({
    navigation: {
      setParams: jest.fn(),
      navigate: jest.fn(),
    },
    route: {
      params: {},
    },
  } as any);

describe('components/pages/Calendars/index.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    jest.spyOn(ContainerCalendars, 'useCalendars').mockImplementation(
      () =>
        ({
          calendars: calendarsMockData(),
          loadingCalendars: false,
          setDate: jest.fn(),
        } as any)
    );

    wrapper = shallow(<Calendars {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
