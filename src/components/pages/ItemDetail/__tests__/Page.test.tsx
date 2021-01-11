import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { itemDetailMockData } from '__mockData__/itemDetail.ts';
import Page, { Props } from '../Page';

const propsData = (): Props => ({
  itemDetail: itemDetailMockData(),
  date: '2020-01-01 00:00:00',
  onDismiss: jest.fn(),
  onUpdate: jest.fn(),
  onUpdateMain: jest.fn(),
  onDelete: jest.fn(),
});

describe('components/pages/ItemDetail/Page.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Page {...propsData()} />);
  });

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
