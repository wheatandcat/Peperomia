import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Page, { Props } from '../Page';

const propsData = (): Props => ({
  mutationData: {
    loading: false,
  } as any,
  date: '2020-01-01 00:00:00',
  onDismiss: jest.fn(),
  onSave: jest.fn(),
  onIcons: jest.fn(),
  selectedKind: 'park',
});

describe('components/pages/AddItemDetail/Page.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Page {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
