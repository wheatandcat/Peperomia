import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Connected, { Props } from '../Connected';

describe('components/pages/ScheduleDetail/Connected.tsx', () => {
  let wrapper: ShallowWrapper<Props>;

  describe('Connected', () => {
    const propsData = (): any => ({
      onEdit: jest.fn(),
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
      wrapper = shallow(<Connected {...propsData()} />);

      expect(wrapper).toMatchSnapshot();
    });
  });
});
