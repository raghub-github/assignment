import React, { useState, useEffect } from 'react';
import GridView from './components/GridView';
import './Report.css';
import axios from "axios";
import FormatPrice from "./Helpers/FormatePrice";
import { useProductContext } from "./context/ProductContext";

const Report = () => {
    const { products } = useProductContext();
    const [allCart, setAllCart] = useState([]);
    const [totalStock, setTotalStock] = useState(0);
    const [availableStock, setAvailableStock] = useState(0);
    const [soldItems, setSoldItems] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const url = `${process.env.REACT_APP_HOSTNAME}/api/products/getAllcarts`;

    const getAllCarts = async (url) => {
        try {
            const res = await axios.get(url);
            const carts = await res.data.carts;
            console.log("carts", carts);
            setAllCart(carts)
            return carts;
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        setTotalStock(0);
        setAvailableStock(0);
        setSoldItems(0);
        getAllCarts(url);
        allCart.forEach((carts) => {
            setSoldItems((prevSoldItems) => prevSoldItems + carts.amount);
            setRevenue((prevRevenue) => prevRevenue + carts.price)
        });
        products.forEach((product) => {
            setAvailableStock((prevAvailableStock) => prevAvailableStock + product.stock);
            setTotalStock(availableStock + soldItems);
        });
    }, [products, soldItems]);

    return (<>
        <div className="product-info-container">
            <div className="info-box">
                <p className="info-label">Total Items</p>
                <p className="info-value"><h2>
                    <strong>{totalStock}</strong>
                </h2></p>
            </div>
            <div className="info-box">
                <p className="info-label">Available Stock</p>
                <p className="info-value">
                    <h2>
                        <strong>{availableStock}</strong>
                    </h2>
                </p>
            </div>
            <div className="info-box">
                <p className="info-label">Sold Items</p>
                <p className="info-value"><h2>
                    <strong>{soldItems}</strong>
                </h2></p>
            </div>
            <div className="info-box">
                <p className="info-label">Total Revenue</p>
                <p className="info-value"><h2>
                    <strong><FormatPrice price={revenue} /></strong>
                </h2></p>
            </div>
        </div>
        <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h2><strong>Available Products</strong></h2>
            <div>
                <GridView products={products} />
            </div>
        </div>
        <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h2><strong>Sold Products</strong></h2>
            <div>
                <GridView products={allCart} />
            </div>
        </div>
    </>
    );
};

export default Report;
