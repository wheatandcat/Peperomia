import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Plain from '../Plain';

describe('components/pages/EditPlan/Plain.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData: any = () => ({
    input: {
      title: 'test',
      date: '',
    },
    kind: 'park',
    items: [],
    refreshData: jest.fn(),
    onInput: jest.fn(),
    onSave: jest.fn(),
    onIcons: jest.fn(),
    onHome: jest.fn(),
  });

  beforeEach(() => {
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    wrapper = shallow(<Plain {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
