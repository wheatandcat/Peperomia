import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as queries from 'queries/api/index';
import * as useCalendar from 'hooks/useCalendar';
import * as useDeleteCalendar from 'hooks/useDeleteCalendar';
import { calendarMockData } from '__mockData__/calendar.ts';
import Connected from '../Connected';

const propsData = (): any => ({
  navigation: {
    setParams: jest.fn(),
    navigate: jest.fn(),
  },
  route: {
    params: {
      date: '2020-01-01 00:00:00',
    },
  },
  refetchCalendars: jest.fn(),
  uid: 'test',
});

describe('components/pages/Calendar/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    jest
      .spyOn(queries, 'useUpdateCalendarPublicMutation')
      .mockImplementation(() => [jest.fn()] as any);

    jest
      .spyOn(useDeleteCalendar, 'default')
      .mockImplementation(() => [jest.fn()] as any);

    jest.spyOn(useCalendar, 'default').mockImplementation(
      () =>
        ({
          data: { calendar: calendarMockData() },
          loading: false,
          error: null,
          refetch: jest.fn(),
        } as any)
    );

    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
