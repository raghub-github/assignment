import React from "react";
import FormatPrice from "../Helpers/FormatePrice";

const CartItem = ({ _id, name, image, price, amount }) => {
  return (
    <div className="cart_heading grid grid-four-column">
      <div className="cart-image--name">
        <div>
          <figure>
            <img src={image} alt={_id} />
          </figure>
        </div>
        <div>
          <p>{name}</p>
        </div>
      </div>
      {/* price   */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price} />
        </p>
      </div>

      {/* Quantity  */}
      <div className="cart-hide">
        <h3>{amount}</h3>
      </div>
      
      {/* //Subtotal */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price * amount} />
        </p>
      </div>
    </div>
  );
};

export default CartItem;