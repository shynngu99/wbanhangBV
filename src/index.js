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
import Update from './menber/Update';
import MyProduct from './product/MyProduct';
import Shop from './product/Shop';
import Details from './product/Detail';
import Cart from './product/Cart';
import AddProduct from './product/AddProduct';
import UpdateProduct from './product/UpdateProduct';


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
          <Route path='/account/update' element={<Update />} />
          <Route path='/account/myproduct' element={<MyProduct />} />
          <Route path='/account/myproduct/details' element={<Details />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/account/product/cart' element={<Cart />} />
          <Route path='/account/AddProduct' element={<AddProduct />} />
          <Route path='/account/updateProduct/:id' element={<UpdateProduct />} />


        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
