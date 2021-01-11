import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as useCreateCalendar from 'hooks/useCreateCalendar';
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
  date: '2020-01-01 00:00:00',
  refetchCalendars: jest.fn(),
});

describe('components/pages/CreateCalendar/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    jest
      .spyOn(useCreateCalendar, 'default')
      .mockImplementation(() => [jest.fn(), jest.fn()] as any);

    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
