import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as queries from 'queries/api/index';
import Auth from '../Auth';

describe('containers/Auth.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData: any = () => ({
    children: <div />,
  });

  beforeEach(() => {
    jest
      .spyOn(queries, 'useSyncCalendarsMutation')
      .mockImplementation(() => [jest.fn()] as any);

    wrapper = shallow(<Auth {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
