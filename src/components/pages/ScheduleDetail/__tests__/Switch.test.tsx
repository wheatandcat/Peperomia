import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Switch from '../Switch';

describe('components/pages/ScheduleDetail/Switch.tsx', () => {
  let wrapper: ShallowWrapper<any>;

  describe('Switch', () => {
    const propsData = (): any => ({
      refreshData: jest.fn(),
      navigation: {
        setParams: jest.fn(),
        navigate: jest.fn(),
      },
      route: {
        params: {
          itemDetailId: '1',
        },
      },
    });

    it('正常に表示されている', () => {
      wrapper = shallow(<Switch {...propsData()} />);

      expect(wrapper).toMatchSnapshot();
    });

    it('onEdit', () => {
      wrapper.props().onEdit('title', 'kind', 'place', 'url', 'memoText', 0, 0);
    });
  });
});
