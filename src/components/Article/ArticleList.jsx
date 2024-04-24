import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Row } from 'react-bootstrap';
import Spinner from '../loader/Spinner';
import Header from './Header';
import Article from './Article';

const ArticleList = () => {
  const API_KEY = 'O7gGsXkWC45redFL7BIsrk5iLrCEqqHw';
  const [articles, setArticles] = useState([]);
  const [period, setPeriod] = useState(1); // Removed term state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticlesData = async () => {
      try {
        const response = await axios.get(`https://api.nytimes.com/svc/mostpopular/v2/viewed/${period}.json?api-key=${API_KEY}`);
        setArticles(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setIsLoading(false);
      }
    };

    fetchArticlesData();
  }, [period]); // Removed term dependency

  const handleChange = (e) => {
    setPeriod(parseInt(e.target.value));
  };

  return (
    <div>
      <Header />
      <Container>
        {isLoading && <Spinner />}
        <div>
          <h2>Viewed period in last {period} days</h2>
          <Form.Select style={{ width: "90px" }} value={period} onChange={handleChange}>
            <option value={1}>1</option>
            <option value={7}>7</option>
            <option value={30}>30</option>
          </Form.Select>
        </div>
        <Container>
        <Row>
          {articles.map(article => (
            <Article key={article.id} article={article} />
          ))}
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default ArticleList;
