import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import App from './App.jsx'
import Tickets from "../src/Tickets/Tickets";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/~pasi21/editor/" element={<App/>} />
        <Route path="/~pasi21/editor/ticket" element={<Tickets/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
