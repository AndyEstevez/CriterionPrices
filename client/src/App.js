import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from './components/homepage'

function App() {
  return (
    <div>
      <Router>

        <Route exact path='/' component={HomePage}/>

      </Router>
      
    </div>
  );
}

export default App;
