import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App.jsx'
import Tickets from "../src/Tickets/Tickets";
import { URL_ROUTE} from './utils/utils.jsx';
import './index.css'


let client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route exact path={`${URL_ROUTE}`} element={<App/>} />
          <Route path={`${URL_ROUTE}ticket`} element={<Tickets/>} />
        </Routes>
      </Router>
    </ApolloProvider>
  </React.StrictMode>
);
