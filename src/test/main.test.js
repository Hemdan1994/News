import React from 'react';
import { render } from '@testing-library/react';
import App from '../components/Article/ArticleList.jsx';

test('App is started', () => {
  // Render the component
  const { container } = render(<App />);
  //console.log("container",container)
  //console.log("Container HTML:", container.innerHTML);

  // Check if the root element exists
  const rootElement = container.querySelector('#root');

  // Assert that rootElement exists
  expect(container.innerHTML).toContain('Front End Test');
});
