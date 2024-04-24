import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import ArticleList from './ArticleList';

jest.mock('axios');

describe('ArticleList component', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocked functions between tests
  });

  test('fetches articles and renders them correctly', async () => {
    const mockArticles = [
      { id: 1, title: 'Article 1', abstract: 'Abstract 1' },
      { id: 2, title: 'Article 2', abstract: 'Abstract 2' },
    ];

    axios.get.mockResolvedValueOnce({ data: { results: mockArticles } });

    const { getByText, getByTestId, getAllByTestId } = render(<ArticleList />);

    expect(getByText('Viewed period in last 1 days')).toBeInTheDocument(); // Initial period is 1

    await waitFor(() => {
      expect(getByTestId('spinner')).toBeInTheDocument(); // Spinner is displayed while loading
    });

    await waitFor(() => {
      expect(getByTestId('spinner')).not.toBeInTheDocument(); // Spinner disappears after loading
      expect(getByTestId('article-1')).toBeInTheDocument();
      expect(getByTestId('article-2')).toBeInTheDocument();
    });

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=O7gGsXkWC45redFL7BIsrk5iLrCEqqHw');
  });

  test('changes period and fetches articles accordingly', async () => {
    const mockArticles = [
      { id: 3, title: 'Article 3', abstract: 'Abstract 3' },
    ];

    axios.get.mockResolvedValueOnce({ data: { results: mockArticles } });

    const { getByText, getByTestId, getByDisplayValue } = render(<ArticleList />);

    const selectElement = getByDisplayValue('1');
    fireEvent.change(selectElement, { target: { value: '7' } });

    await waitFor(() => {
      expect(getByText('Viewed period in last 7 days')).toBeInTheDocument();
      expect(getByTestId('spinner')).toBeInTheDocument(); // Spinner is displayed while loading
    });

    await waitFor(() => {
      expect(getByTestId('spinner')).not.toBeInTheDocument(); // Spinner disappears after loading
      expect(getByTestId('article-3')).toBeInTheDocument();
    });

    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(axios.get).toHaveBeenCalledWith('https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=O7gGsXkWC45redFL7BIsrk5iLrCEqqHw');
  });
});
