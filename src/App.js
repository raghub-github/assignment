import React from "react";
import './App.css';
import Header from './components/Header';
import Products from './Products';
import SingleProduct from './SingleProduct';
import Cart from './Cart';
import ErrorPage from './ErrorPage';
import { GlobalStyle } from './GlobalStyle';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddProductForm from "./AddProduct";

const App = () => {
  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29 ,29, 29, .8)",
      white: "#fff",
      black: " #212529",
      helper: "#8490ff",

      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route exact path="/" element={<Products />} />
          <Route exact path="/singleproduct/:_id" element={<SingleProduct />} />
          <Route exact path="/addproduct" element={<AddProductForm />} />
          <Route
            exact
            path="/login"
            element={<Login />}
          />
          <Route
            exact
            path="/signup"
            element={<Signup />}
          />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
