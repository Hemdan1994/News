import   { React ,useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Container, Form } from "react-bootstrap";
import Spinner from "../loader/Spinner";
import Header from './Header';
import Article from "./Article";

import "../../App.css";


function ArticleList() {

  const API_KEY = 'O7gGsXkWC45redFL7BIsrk5iLrCEqqHw';
  const [articles, setArticles] = useState([]);
  const [term, setTerm] = useState('viewed');
  const [period, setPeriod] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticlesData = async () => {
      try {
        const response = await axios.get(`https://api.nytimes.com/svc/mostpopular/v2/${term}/${period}.json?api-key=${API_KEY}`);
        //console.log(response)
        setArticles(response.data.results);
        setIsLoading(false);
      } catch (error) {
        //console.log("Error", error);
      }
    };

    fetchArticlesData();
  }, [term, period]);
   
  const handleChange = (e) => {
    setPeriod(parseInt(e.target.value));
  };

    return (
        <div>
          <Header/>

            <Container>

                {isLoading ? <Spinner /> : null}


                <div>
                <h2>Viewed period in last {period} days</h2>
                <Form.Select style={{width : "90px"}} value={period} onChange={handleChange}>
                 
                  <option value={1}>1</option>
                  <option value={7}>7</option>
                  <option value={30}>30</option>
                </Form.Select>
              </div>


              <Row>
                {articles?.map(article => (
                  <Article key={article?.id} article={article} />
                ))}
              </Row>

            </Container>
        </div>
    );
}

export default ArticleList;
