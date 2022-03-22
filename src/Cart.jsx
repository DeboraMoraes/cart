import React from 'react';

export default function Cart({ cart, setCart }) {
  const getTotalSum = () => {
    return cart.reduce(
      (sum, { price, quantity }) => sum + price * quantity,
      0
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const MoreProduct = (product, amount) => {
    const newCart = [...cart];
    newCart.find(
      (item) => item.name === product.name
    ).quantity += 1;
    setCart(newCart);
  };

  const LessProduct = (product) => {
    const newCart = [...cart];
    
    newCart.find(
      (item) => item.name === product.name
    ).quantity -= 1;
    setCart(newCart);

  };


  const removeFromCart = (productToRemove) => {
    setCart(
      cart.filter((product) => product !== productToRemove)
    );
  };

  const stringfyPrice = price => {
    if(typeof price == "number") {
      return price.toString().slice(0, -2) + "." + price.toString().slice(-2)
    }

    return ""
  }

  const stringfySum = getTotalSum => {
    if(typeof getTotalSum == "number") {
      return getTotalSum.toString().slice(0, -2) + "." + getTotalSum.toString().slice(-2)
    }

    return ""
  }

  return (
    <>
    <div className='MeuCarrinho'>
    <h1 className='Cart'>Meu Carrinho</h1>
    <hr />
      
      <div className="cartProducts">
        {cart.map((product, idx) => (
          <div className="cartProduct" key={idx}>
            <img className='cartImg' src={product.imageUrl} alt={product.name} />
            <div className='cartInfo'>
              <h3>{product.name}</h3>
              <h4 >${stringfyPrice(product.price)}</h4>
              <div className="Qunatities">
                <button className="LessProduct" onClick={(e) => LessProduct(product
                    )}>-</button>
                <span className="ProductQuantity">{product.quantity}</span>
                <button className="MoreProduct" onClick={(e) => MoreProduct(product
                    )}>+</button>
                    <button className='Remove' onClick={() => removeFromCart(product)}>
              Remove
            </button>
              </div>
              
            </div>
            

            
            
          </div>
        ))}
      </div>
      <hr />
      <div className='total'>
      <div>Total Cost: </div>
      <div>${stringfySum(getTotalSum())}</div>
      </div>
      <div className='clearbtn'>{cart.length > 0 && (
        <button className='ClearCart' onClick={clearCart}>Limpar</button>
      )}</div>
      <button className='finish'>Finalizar Compra</button>
    </div>
      
    </>
  );
}
