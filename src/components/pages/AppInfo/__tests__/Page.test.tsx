import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Page from '../Page';

describe('components/pages/AppInfo/Page.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData: any = () => ({
    onDone: jest.fn(),
  });

  beforeEach(() => {
    wrapper = shallow(<Page {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
