import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from './components/homepage'
import PreorderPage from './components/preorder_page';

function App() {
  return (
    <div>
      <Router>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/coming-soon' component={PreorderPage}/>
      </Router>
    </div>
  );
}

export default App;
