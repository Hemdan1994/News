import React from 'react';
import { render, waitFor, } from '@testing-library/react';
import axios from 'axios'; // Import axios for mocking
import ArticleList from '../components/Article/ArticleList'; // Import the component to test
import { act } from 'react-dom/test-utils';

jest.mock('axios');

test('articles are loaded correctly', async () => {
 
  const mockData = {
    data: {
      results: [
        { id: 1, title: 'Article 1', abstract: 'Abstract 1', metadata: { url: 'article1.jpg' } },
        { id: 2, title: 'Article 2', abstract: 'Abstract 2', metadata: { url: 'article2.jpg' } },
      ]
    }
  };

  axios.get.mockResolvedValue(mockData);

  const { container } = render(<ArticleList />);

  await waitFor(() => {
    
    expect(container.innerHTML).toContain('Article 1');
    expect(container.innerHTML).toContain('Article 2');
  });
});

test('Article API is working fine', async () => {
    const mockData = {
      data: {
        results: [
          { id: 1, title: 'Article 1', abstract: 'Abstract 1', metadata: { url: 'article1.jpg' } },
          { id: 2, title: 'Article 2', abstract: 'Abstract 2', metadata: { url: 'article2.jpg' } },
        ]
      }
    };
  
    axios.get.mockResolvedValue(mockData);
  
    await act(async () => {
      render(<ArticleList />);
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(axios.get).toHaveBeenCalledWith(`https://api.nytimes.com/svc/mostpopular/v2/viewed/30.json?api-key=O7gGsXkWC45redFL7BIsrk5iLrCEqqHw`);
    });
  });