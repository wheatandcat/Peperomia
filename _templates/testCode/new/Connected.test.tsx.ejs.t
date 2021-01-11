---
to: <%= absPath %>/__tests__/Connected.test.tsx
---
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Connected from '../Connected';

const propsData = (): any => ({
    navigation: {
    setParams: jest.fn(),
    navigate: jest.fn(),
  },
  route: {
    params: {
    },
  },
});

describe('components/pages/<%= component_name %>/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

/**
  * @example
  * import * as queries from 'queries/api/index';
  *
  * jest
  *   .spyOn(queries, 'useUpdateCalendarPublicMutation')
  *   .mockImplementation(() => [jest.fn()] as any);
  *
  * import * as useDeleteCalendar from 'hooks/useDeleteCalendar';
  *
  * jest
  *   .spyOn(useDeleteCalendar, 'default')
  *   .mockImplementation(() => [jest.fn()] as any);
  *
  * import * as useCalendar from 'hooks/useCalendar';
  * import { calendarMockData } from '__mockData__/calendar.ts';
  *
  * jest.spyOn(useCalendar, 'default').mockImplementation(
  *   () =>
  *     ({
  *       data: { calendar: calendarMockData() },
  *       loading: false,
  *       error: null,
  *       refetch: jest.fn(),
  *     } as any)
  * );
  */
  beforeEach(() => {
    wrapper = shallow(<Connected {...propsData()} />);
  })

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
