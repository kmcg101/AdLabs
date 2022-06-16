import React from 'react';

//import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';


const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
/*
ReactDOM.render(
 
    <App />
  ,
  document.getElementById('root')
);
*/

// reportWebVitals();
