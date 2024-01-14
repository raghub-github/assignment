import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CgMenu, CgClose } from "react-icons/cg";
import { useCartContext } from "../context/cart_context";
import { Button } from "../styles/Button";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from '../context/user_context';

const Nav = () => {
  const { user } = useUserContext();
  const [menuIcon, setMenuIcon] = useState();
  const { clearLogoutCart } = useCartContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    toast.success("User logged out");
    clearLogoutCart();
    navigate("/login");
  };
  const Nav = styled.nav`
    .btn{
      width: 140%;
    }
    .navbar-lists {
      display: flex;
      gap: 4rem;
      justify-content:center;
      align-items: center;
      margin: auto;

      .navbar-link {
        &:link,
        &:visited {
          display: inline-block;
          text-decoration: none;
          font-size: 1.8rem;
          font-weight: 500;
          text-transform: uppercase;
          color: ${({ theme }) => theme.colors.black};
          transition: color 0.3s linear;
        }

        &:hover,
        &:active {
          color: ${({ theme }) => theme.colors.helper};
        }
      }
    }

    .mobile-navbar-btn {
      display: none;
      background-color: transparent;
      cursor: pointer;
      border: none;
    }

    .mobile-nav-icon[name="close-outline"] {
      display: none;
    }

    .close-outline {
      display: none;
    }

    .cart-trolley--link {
      position: relative;

      .cart-trolley {
        position: relative;
        font-size: 3.2rem;
      }

      .cart-total--item {
        width: 2.4rem;
        height: 2.4rem;
        position: absolute;
        background-color: #000;
        color: #000;
        border-radius: 50%;
        display: grid;
        place-items: center;
        top: -20%;
        left: 70%;
        background-color: ${({ theme }) => theme.colors.helper};
      }
    }

    .user-login--name {
      text-transform: capitalize;
    }

    .user-logout,
    .user-login {
      font-size: 1.4rem;
      padding: 0.8rem 1.4rem;
    }

    @media (max-width: ${({ theme }) => theme.media.mobile}) {

      .mobile-navbar-btn {
        display: inline-block;
        z-index: 9999;
        border: ${({ theme }) => theme.colors.black};

        .mobile-nav-icon {
          font-size: 4.2rem;
          color: ${({ theme }) => theme.colors.black};
        }
      }

      .active .mobile-nav-icon {
        display: none;
        font-size: 4.2rem;
        position: relative;
        top: 30%;
        right: 10%;
        color: ${({ theme }) => theme.colors.black};
        z-index: 9999;
      }

      .active .close-outline {
        display: inline-block;
      }

      .navbar-lists {
        width:100vw;
        height:100vh;
        position: absolute;
        top: -40px;
        right: -36px;
        background-color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        visibility: hidden;
        opacity: 0;
        transform: translateX(100%);
        // transform-origin: top; 
        transition: all 3s linear;
      }

      .active .navbar-lists {
        visibility: visible;
        opacity: 1;
        transform: translateX(0);
        z-index: 999;
        transform-origin: right;
        transition: all 3s linear;

        .navbar-link {
          font-size: 4.2rem;
        }
      }
      .cart-trolley--link {
        position: relative;

        .cart-trolley {
          position: relative;
          font-size: 5.2rem;
        }

        .cart-total--item {
          width: 4.2rem;
          height: 4.2rem;
          font-size: 2rem;
        }
      }

      .user-logout,
      .user-login {
        font-size: 2.2rem;
        padding: 0.8rem 1.4rem;
      }
    }
  `;

  return (
    <Nav >
      <div className={menuIcon ? "navbar active " : "navbar "} >
        <ul className="navbar-lists">
          <li>
            <NavLink
              to="/"
              className="navbar-link"
              onClick={() => setMenuIcon(false)}>
              Products
            </NavLink>
          </li>
          {!user.isAdmin ? (
            <li>
              <NavLink
                to="/cart"
                className="navbar-link "
                onClick={() => setMenuIcon(false)}>
                Orders
              </NavLink>
            </li>
          ) : (<>
            <li>
              <NavLink
                to="/addproduct"
                className="navbar-link "
                onClick={() => setMenuIcon(false)}>
                addproduct
              </NavLink>
            </li>
            </>
          )}

          {/* login logout button */}
          {!localStorage.getItem("authToken") ? (
            <form className="d-flex" >
              <Link
                to="/login"
                role="button"
                onClick={() => setMenuIcon(false)}
                style={{ paddingRight: "1rem" }}
              >
                <Button >Login</Button>
              </Link>
              <Link
                to="/signup"
                role="button"
                onClick={() => setMenuIcon(false)}
                style={{ paddingLeft: "1rem" }}
              >
                <Button>Signup</Button>
              </Link>
            </form>
          ) : (
            <form className="d-flex" >
              <Link
                to="/login"
                role="button"
                onClick={() => setMenuIcon(false)}
              >
                <Button onClick={handleLogout} >
                  Logout
                </Button>
              </Link>
            </form>
          )}
        </ul>

        {/* two button for open and close of menu */}
        <div className="mobile-navbar-btn">
          <CgMenu
            name="menu-outline"
            className="mobile-nav-icon"
            onClick={() => setMenuIcon(true)}
          />
          <CgClose
            name="close-outline"
            className="mobile-nav-icon close-outline"
            onClick={() => setMenuIcon(false)}
          />
        </div>
      </div>
    </Nav>
  );
};


export default Nav;