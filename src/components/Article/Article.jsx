import {  Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom';

import "../../App.css";


function Article({article}) {
  
  return (
    <>
      
     
          <Col className="col-lg-4 col-sm-6" key={article?.id}>
            <Card className="my-3">
              {article?.metadata?.url !== null ? 
                <Card.Img variant="top" src={article?.metadata?.url} /> 
                : null}
              <Card.Body>
                <Card.Title>{article?.title}</Card.Title>
                <span> Type : {article?.subsection}</span>
                <span> Read More : {article?.url}</span>
                <Card.Text>
                  {article?.abstract}
                </Card.Text>
                <Link to={article?.url}>Read More</Link>
              </Card.Body>
            </Card>
          </Col>
       
    </>
  );
}

export default Article;