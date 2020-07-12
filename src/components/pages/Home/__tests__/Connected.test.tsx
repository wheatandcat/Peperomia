import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as Items from 'containers/Items';
import Connected from '../Connected';

describe('components/pages/Home/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData: any = () => ({
    navigation: {
      navigate: jest.fn(),
      setParams: jest.fn(),
    },
    route: {
      params: {
        refresh: false,
      },
    },
  });

  beforeEach(() => {
    jest.spyOn(Items, 'useItems').mockImplementation(
      () =>
        ({
          refreshData: jest.fn(),
          items: [],
          calendars: [],
          about: '',
          itemsLoading: false,
        } as any)
    );
    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
