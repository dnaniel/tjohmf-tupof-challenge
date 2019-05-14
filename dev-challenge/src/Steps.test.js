import React from 'react';
import ReactDOM from 'react-dom';
import Steps from './Steps';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Steps />, div);
  ReactDOM.unmountComponentAtNode(div);
});
