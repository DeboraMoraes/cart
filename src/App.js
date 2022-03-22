import React, { useState } from 'react';
import './App.css';
import Products from './Products';
import Cart from './Cart';
import icone from './imgs/icons8-cart-64.png'

const PAGE_PRODUCTS = 'products';
const PAGE_CART = 'cart';

function App() {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(PAGE_PRODUCTS);

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  const getCartTotal = () => {
    return cart.reduce(
      (sum, { quantity }) => sum + quantity,
      0
    );
  };

  return (
    <div className="App">
      <header>
        <div className='navigators'>
          <button onClick={() => navigateTo(PAGE_CART)}>
          <img className="icone" src={icone} alt="icone" />
            {getCartTotal()}
          </button>

          <button onClick={() => navigateTo(PAGE_PRODUCTS)}>
            View Products
          </button>
        </div>
        
      </header>
      <div className="container">
        {page === PAGE_PRODUCTS && (
          <Products cart={cart} setCart={setCart} />
        )}
        {page === PAGE_CART && (
          <Cart cart={cart} setCart={setCart} />
        )}
      </div>
    </div>
  );
}

export default App;
