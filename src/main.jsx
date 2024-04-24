
import ReactDOM from 'react-dom/client'
import App from './components/Article/ArticleList'
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
    </Router>
)
