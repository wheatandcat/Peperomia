import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Page from '../Page';

describe('components/pages/Setting/Page.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData: any = () => ({
    login: false,
    loading: false,
    restoreLoading: false,
    debugMode: false,
    uid: 'test',
    onResetSQL: jest.fn(),
    onDeleteSQL: jest.fn(),
    onShowSQL: jest.fn(),
    onData: jest.fn(),
    onDeleteUser: jest.fn(),
    onTos: jest.fn(),
    onPolicy: jest.fn(),
    onSignIn: jest.fn(),
    onLogout: jest.fn(),
    onFeedback: jest.fn(),
    onMyPage: jest.fn(),
    onNotificationSetting: jest.fn(),
    onMigrationV100: jest.fn(),
    onScreenSetting: jest.fn(),
    onLoginWithAmazon: jest.fn(),
    onFirestoreResetQuery: jest.fn(),
    onFirestoreSelect: jest.fn(),
    onChangeDebugMode: jest.fn(),
  });

  beforeEach(() => {
    wrapper = shallow(<Page {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
