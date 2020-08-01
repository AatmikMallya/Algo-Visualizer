import React, { useEffect } from 'react';
import './App.css';
import SortingTimeVisualizer from './components/SortingTimeVisualizer';
import ReactGA from 'react-ga'; // https://github.com/react-ga/react-ga


function App() {
  // Google Analytics
  useEffect(() => {
    ReactGA.initialize('UA-171800090-2');
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <div className="App">
      <SortingTimeVisualizer/>
    </div>
  );
}

export default App;
