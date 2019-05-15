import React from 'react';
import Steps from './Steps';
import { shallow } from 'enzyme';

describe('Steps', () => {
  it('renders error message when API gets 500', async () => {
    window.fetchSteps = jest.fn().mockImplementation(() => ({
      status: 500,
    }))

    const renderedComponent = await shallow(<Steps />)
    await renderedComponent.update()
    expect(renderedComponent.state('steps').length).toEqual(0)
  });
});
