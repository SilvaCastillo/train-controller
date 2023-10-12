import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import App from './App.jsx'
import Tickets from "../src/Tickets/Tickets";
import { URL_ROUTE} from './utils/utils.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path={`${URL_ROUTE}`} element={<App/>} />
        <Route path={`${URL_ROUTE}ticket`} element={<Tickets/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
