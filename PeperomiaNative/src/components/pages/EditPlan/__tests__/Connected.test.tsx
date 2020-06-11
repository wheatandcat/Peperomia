import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Connected from '../Connected';

describe('components/pages/EditPlan/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData: any = () => ({
    title: 'test',
    kind: 'park',
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
    uid: 'test',
    items: [],
    refreshData: jest.fn(),
    calendars: [],
  });

  beforeEach(() => {
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
