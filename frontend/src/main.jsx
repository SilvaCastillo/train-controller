import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import './leaflet/dist/leaflet.css';
import App from './App.jsx'
import Tickets from "../src/Tickets/Tickets";

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/ticket" element={<Tickets />} />
      </Routes>
    </Router>
  </React.StrictMode>

);
