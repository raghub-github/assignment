import React, { useState } from 'react';
import { toast } from "react-toastify";

const AddProductForm = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [apiProduct, setApiProduct] = useState({
        name: '',
        image: '',
        price: 0,
        featured: false,
        rating: 4.3,
        category: '',
        description: '',
        stock: 0,
        reviews: 99,
    })
    const [productData, setProductData] = useState({
        name: '',
        image: '',
        price: 0,
        featured: false,
        rating: 4.3,
        category: '',
        description: '',
        stock: 0,
        reviews: 99,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
    
        const reader = new FileReader();
        reader.onload = () => {
            setImageUrl(reader.result);
            setProductData({
                ...productData,
                image: reader.result,
            });
        };
    
        if (file) {
            reader.readAsDataURL(file);
        };
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
                    image: '',
                    price: 0,
                    featured: false,
                    rating: 4.3,
                    category: '',
                    description: '',
                    stock: 0,
                    reviews: 99,
                });
                setApiProduct({
                    name: data.name,
                    image: data.image,
                    price: data.price,
                    featured: data.featured,
                    rating: data.rating,
                    category: data.category,
                    description: data.description,
                    stock: data.stock,
                    reviews: data.reviews,
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
                <h3>Images:</h3>
                <div><input style={inputStyle} name="image" type="file" accept="image/*" onChange={handleImageChange} required />
                </div>
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
                <h3>Featured:
                    <input type="checkbox" style={checkboxStyle} checked={productData.featured} onChange={handleFeaturedToggle} />
                </h3>
            </label>
            <div><button style={buttonStyle} type="submit">Add Product</button></div>

            {imageUrl && (
                <img src={imageUrl} alt="Preview" style={{ maxWidth: '300px' }} />
            )}
        </form>

    </>
    );
};


export default AddProductForm;
