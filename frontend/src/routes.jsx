// routes.js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainView from '../src/components/MainView';
import Tickets from "../src/Tickets/Tickets";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={MainView} />
        <Route path="/ticket" component={Tickets} />
      </Switch>
    </Router>
  );
}

export default Routes;