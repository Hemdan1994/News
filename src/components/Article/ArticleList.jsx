// ArticleList.js

import React, { useState, useEffect } from 'react';
import { Container, Form, Row } from 'react-bootstrap';
import Spinner from '../loader/Spinner';
import Header from './Header';
import Article from './Article';
import { fetchArticles } from '../../../utilities/api'; // Import the utility function

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [period, setPeriod] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticlesData = async () => {
      const data = await fetchArticles(period); // Call the utility function
      setArticles(data);
      setIsLoading(false);
    };

    fetchArticlesData();
  }, [period]);

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
