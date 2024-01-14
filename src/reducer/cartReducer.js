const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let { _id, amount, product, category, user, nid } = action.payload;
    // tackle the existing product
    let existingProduct = state.cart.find((curItem) => curItem._id === _id + category);
    if (existingProduct) {
      let updatedProduct = state.cart.map((curElem) => {
        if (curElem._id === _id + category) {
          let newAmount = curElem.amount + amount;
          if (newAmount >= curElem.max) {
            newAmount = curElem.max;
          }
          return {
            ...curElem,
            amount: newAmount,
          };
        } else {
          return curElem;
        }
      });
      return {
        ...state,
        cart: updatedProduct,
      };
    } else {
      let cartProduct = {
        _id: _id + category,
        name: product.name,
        amount,
        category,
        user,
        nid,
        image: product.image,
        price: product.price,
        max: product.stock,
      };
      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };
    }
  }

  // to set the increment and decrement
  if (action.type === "SET_DECREMENT") {
    let updatedProduct = state.cart.map((curElem) => {
      if (curElem._id === action.payload) {
        let decAmount = curElem.amount - 1;
        if (decAmount <= 1) {
          decAmount = 1;
        }
        return {
          ...curElem,
          amount: decAmount,
        };
      } else {
        return curElem;
      }
    });
    return { ...state, cart: updatedProduct };
  };

  if (action.type === "SET_INCREMENT") {
    let updatedProduct = state.cart.map((curElem) => {
      if (curElem._id === action.payload) {
        let incAmount = curElem.amount + 1;
        if (incAmount >= curElem.max) {
          incAmount = curElem.max;
        }
        return {
          ...curElem,
          amount: incAmount,
        };
      } else {
        return curElem;
      }
    });
    return { ...state, cart: updatedProduct };
  }

  // to set the UPDATE_CART
  if (action.type === "UPDATE_CART") {
    return {
      ...state,
      cart: action.payload,
    };
  };

  if (action.type === "CART_ITEM_PRICE_TOTAL") {
    let { total_item, total_price } = state.cart.reduce(
      (accum, curElem) => {
        let { price, amount } = curElem;
        accum.total_item += amount;
        accum.total_price += price * amount;
        return accum;
      },
      {
        total_item: 0,
        total_price: 0,
      }
    );
    return {
      ...state,
      total_item,
      total_price,
    };
  }

  return state;
};

export default cartReducer;