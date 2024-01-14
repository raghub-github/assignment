import { useState } from "react";
import styled from "styled-components";
import CartAmountToggle from "./CartAmountToggle";
import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";
import { useCartContext } from "../context/cart_context";
import { toast } from "react-toastify";

const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext();
  const { _id, stock, category } = product;
  const host = process.env.REACT_APP_HOSTNAME;
  const [amount, setAmount] = useState(1);
  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const setIncrease = () => {
    amount < stock ? setAmount(amount + 1) : setAmount(stock);
  };

  return (
    <Wrapper>

      {/* add to cart  */}
      <CartAmountToggle
        amount={amount}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />

      <NavLink to={localStorage.getItem("authToken") ? "/cart" : "/login"} onClick={() => {
        addToCart(_id, amount, product, category);
        const editProduct = async (_id, amount) => {
          // API Call
          try {
            const response = await fetch(`${host}/api/addproduct/updatecart/${_id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("authToken"),
              },
              body: JSON.stringify({ amount }),
            });
            await response.json();
            if (response.ok) {
              toast.success("Item updated successfully");
            } else {
              console.error("Failed to update product data on the server");
            }
          } catch (error) {
            toast.error("Server error");
            console.error("Error updating product data:", error);
          }
        };
        editProduct(_id, amount);
      }}>
        <Button className="btn">Buy Now</Button>
      </NavLink>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .colors p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  /* we can use it as a global one too  */
  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }
`;
export default AddToCart;