---
to: <%= absPath %>/__tests__/Page.test.tsx
---
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Page, { Props } from '../Page';

const propsData = (): Props => ({});

describe('components/pages/<%= component_name %>/Page.tsx', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Connected {...propsData()} />);
  })

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
