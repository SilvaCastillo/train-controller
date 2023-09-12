import React from 'react';
import ReactDOM from 'react-dom/client';
import MainView from './components/MainView';

function App() {
  return (
    <div className="App">
      <MainView />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
