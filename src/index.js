import React from 'react'; 
import ReactDOM from 'react-dom';
import App from './App'; 

// Rendering the App component inside the root div element
ReactDOM.render(
  <React.StrictMode>
    <App /> {/* The App component, which contains the heatmap and data logic */}
  </React.StrictMode>,
  document.getElementById('root') // Targeting the div with id 'root' in index.html
);
