import React, { useEffect, useState } from 'react';
import { api } from './services/api';


export default function Products({ setCart, cart }) {
  // const [products] = useState([
  //   {

  //     name: 'AA Battery',
  //     cost: 2.99,
  //     image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ5-QAul_NfAs-s0XW9M087xWyPOGWvbfYjmqSl0QXabZRSYoid47i7kISiAteyIh0YOci5mtQ&usqp=CAc',
  //   },
  //   {

  //     name: 'Blanket',
  //     cost: 19.99,
  //     image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSpwdYDmUL_ZEqhLV7ZWRdQAU7DGcGaxtCt7SrTlL9umrQs2Un7rj9Nbb9Vq01RtEfA0eAVmdt-&usqp=CAc',
  //   },
  // ]);

  const [ items, setItems ] = useState([]);

  useEffect (() => {
    api.get('/items').then((response) => {
      console.log(response);
      setItems(response.data);
    });
  }, []);
 

  // const prices = response(product.price).slice(0, -2) + "." + items.price.slice(-2);
    


  const addToCart = (product) => {
    let newCart = [...cart];
    let itemInCart = newCart.find(
      (item) => product.name === item.name
    );
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      itemInCart = {
        ...product,
        quantity: 1,
      };
      newCart.push(itemInCart);
    }
    setCart(newCart);
  };
  // .slice(0, -2) + "." + product.price.slice(-2)

  const stringfyPrice = price => {
    if(typeof price == "number") {
      return price.toString().slice(0, -2) + "." + price.toString().slice(-2)
    }

    return ""
  }

  return (
    <>
      <h1>Products</h1>
      <div className="products">
        {items.map((product, idx) => (
          <div className="product" key={idx}>
            <h3>{product.name}</h3>
            <h4>R${stringfyPrice(product.price)}</h4>
            <img src={product.imageUrl} alt={product.name} />
            <button className="addToCart" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
