import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Blog from './cpn/Blog';
import BlogDT from './cpn/BlogDT';
import IndexAccount from './menber/IndexAccount';
import Home from './cpn/Home';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/blog/list' element={<Blog />} />
          <Route path='/blog/detail/:id' element={<BlogDT />} />
          <Route path='/index/account' element={<IndexAccount />} />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
