---
to: <%= absPath %>/__tests__/index.test.tsx
---
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import <%= component_name %>, { Props } from '../';

const propsData = ():Props => ({
      navigation: {
      setParams: jest.fn(),
      navigate: jest.fn(),
    },
    route: {
      params: {
      },
    },
});

describe('components/pages/<%= component_name %>', () => {
  let wrapper: ShallowWrapper;

/**
  * @example
  * import * as Auth from 'containers/Auth';
  *
  * beforeEach(() => {
  *   jest.spyOn(Auth, 'useAuth').mockImplementation(() => ({uid: 'test'} as any))
  * })
  */
  beforeEach(() => {
    wrapper = shallow(<<%= component_name %> {...propsData()} />);
  })

  it('正常にrenderすること', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
