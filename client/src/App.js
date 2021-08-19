import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from './components/homepage'
import NewReleasePage from './components/newrelease_page';
import PreorderPage from './components/preorder_page';

function App() {
  return (
    <div>
      <Router>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/coming-soon' component={PreorderPage}/>
        <Route exact path='/new-releases' component={NewReleasePage}/>
      </Router>
    </div>
  );
}

export default App;
