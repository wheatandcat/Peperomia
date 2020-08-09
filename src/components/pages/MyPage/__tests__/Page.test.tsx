import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Page from '../Page';

describe('components/pages/MyPage/Page.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData: any = () => ({
    loading: false,
    LoadingText: '',
    refreshData: jest.fn(),
    email: 'test',
    onBackup: jest.fn(),
    onRestore: jest.fn(),
    onNotificationSetting: jest.fn(),
  });

  beforeEach(() => {
    wrapper = shallow(<Page {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
