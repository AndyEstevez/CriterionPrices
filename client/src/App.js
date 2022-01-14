import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/homepage'
import AllTitles from './components/alltitles_page'
import NewReleasePage from './components/newrelease_page';
import PreorderPage from './components/preorder_page';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/all' component={AllTitles}/>
        <Route exact path='/coming-soon' component={PreorderPage}/>
        <Route exact path='/new-releases' component={NewReleasePage}/>
      </Router>
    </div>
  );
}

export default App;
