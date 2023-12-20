import React, { useState } from 'react';
import { toast } from "react-toastify";
import styled from "styled-components";
import { useUserContext } from './context/user_context';
import { Container } from "./styles/Container";
import FormatPrice from "./Helpers/FormatePrice";
import AddToCart from "./components/AddToCart";

const AddProductForm = () => {
    const { user } = useUserContext();
    const [apiProduct, setApiProduct] = useState({
        name: '',
        image: [],
        colors: [],
        price: 0,
        featured: false,
        rating: 4.3,
        category: '',
        description: '',
        stock: 0,
        reviews: 99,
        company: '',
        barcode: '',
    })
    const [productData, setProductData] = useState({
        name: '',
        image: [],
        colors: [],
        price: 0,
        featured: false,
        rating: 4.3,
        category: '',
        description: '',
        stock: 0,
        reviews: 99,
        company: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const { value } = e.target;
        setProductData({
            ...productData,
            image: value.split(',').map((link) => link.trim()), // Split by commas and trim whitespace
        });
    };
    const handleColorChange = (e) => {
        const { value } = e.target;
        setProductData({
            ...productData,
            colors: value.split(',').map((link) => link.trim()), // Split by commas and trim whitespace
        });
    };

    const handleFeaturedToggle = () => {
        setProductData({
            ...productData,
            featured: !productData.featured,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_HOSTNAME}/api/addproduct/addproducts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });
            const data = await response.json();
            if (response.status === 201) {
                toast.success("Product added successfully");
                // Reset the form or perform any other necessary action
                setProductData({
                    name: '',
                    image: [],
                    colors: [],
                    price: 0,
                    featured: false,
                    rating: 4.3,
                    category: '',
                    description: '',
                    stock: 0,
                    reviews: 99,
                    company: '',
                });
                setApiProduct({
                    name: data.name,
                    image: data.image,
                    colors: data.colors,
                    price: data.price,
                    featured: data.featured,
                    rating: data.rating,
                    category: data.category,
                    description: data.description,
                    stock: data.stock,
                    reviews: data.reviews,
                    company: data.company,
                    barcode: data.barcode
                });
            } else {
                toast.error('Failed to add the product');
                console.error(response.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const formStyle = {
        maxWidth: '600px',
        margin: '0 auto',
        marginTop: '15px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f4f4f4',
    };

    const labelStyle = {
        display: 'block',
        margin: '10px 0',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        textTransform: 'none'
    };

    const buttonStyle = {
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    const checkboxStyle = {
        margin: '0 15px 5px',
        transform: 'scale(1.5)',
    };

    return (<>
        <form style={formStyle} onSubmit={handleSubmit}>
            <h2>Add your new product here</h2>
            <label style={labelStyle}>
                <h3>Name:</h3>
                <div><input style={inputStyle} type="text" name="name" value={productData.name} onChange={handleInputChange} required /></div>
            </label>
            <label style={labelStyle}>
                <h3>Images (comma-separated links):</h3>
                <div><input style={inputStyle} type="text" name="image" value={productData.image.join(', ')} onChange={handleImageChange} required /></div>
            </label>
            <label style={labelStyle}>
                <h3>Colors (comma-separated links):</h3>
                <div><input style={inputStyle} type="text" name="colors" value={productData.colors.join(', ')} onChange={handleColorChange} /></div>
            </label>
            <label style={labelStyle}>
                <h3>Price:</h3>
                <div><input style={inputStyle} type="number" name="price" value={productData.price} onChange={handleInputChange} required /></div>
            </label>

            <label style={labelStyle}>
                <h3>Category:</h3>
                <div><input style={inputStyle} type="text" name="category" value={productData.category} onChange={handleInputChange} required /></div>
            </label>
            <label style={labelStyle}>
                <h3>Description:</h3>
                <div><textarea name="description" style={inputStyle} value={productData.description} onChange={handleInputChange} /></div>
            </label>
            <label style={labelStyle}>
                <h3>Stock:</h3>
                <div><input style={inputStyle} type="number" name="stock" value={productData.stock} onChange={handleInputChange} required /></div>
            </label>
            <label style={labelStyle}>
                <h3>Reviews:</h3>
                <div><input style={inputStyle} type="number" name="reviews" value={productData.reviews} onChange={handleInputChange} /></div>
            </label>
            <label style={labelStyle}>
                <h3>Company:</h3>
                <div><input style={inputStyle} type="text" name="company" value={productData.company} onChange={handleInputChange} /></div>
            </label>
            <label style={labelStyle}>
                <h3>Featured:
                    <input type="checkbox" style={checkboxStyle} checked={productData.featured} onChange={handleFeaturedToggle} />
                </h3>
            </label>
            <div><button style={buttonStyle} type="submit">Add Product</button></div>
        </form>
        <hr />
        <Wrapper>
            return <div>
                <Container className="container">
                    <div className="grid ">
                        <div className="product-data">
                            <h2>{apiProduct.name}</h2>
                            <p className="product-data-price product-data-real-price">
                                Deal of the Day: <FormatPrice price={apiProduct.price} />
                            </p>
                            <p>{apiProduct.description}</p>

                            <div className="product-data-warranty">
                                <div className="product-warranty-data">
                                    <img style={{ width: "100%" }} src={apiProduct.barcode} alt="barcode" />
                                </div>
                            </div>

                            <div className="product-data-info">
                                <p>
                                    Available:
                                    <span style={{ color: "green" }}> {apiProduct.stock > 0 ? "In Stock" : "Not Available"}</span>
                                </p>
                                <p>
                                    Brand :<span> {apiProduct.company} </span>
                                </p>
                            </div>
                            <hr />
                            {!user.isAdmin ? ((apiProduct.stock) > 0 && <AddToCart product={apiProduct} />) : ""}
                        </div>
                    </div>
                </Container>
            </div>
        </Wrapper>

    </>
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

export default AddProductForm;
