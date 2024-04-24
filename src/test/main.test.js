import React from 'react';
import { render } from '@testing-library/react';
import ArticleList from '../components/Article/ArticleList'; // Import the correct component

test('App is started', () => {
  // Render the component
  const { container } = render(<ArticleList />); // Render ArticleList component

  // Check if the root element exists
  const rootElement = container.querySelector('#root');

  // Assert that rootElement exists
  expect(rootElement).toBeInTheDocument(); // Assert rootElement is in the document
});
