const express = require('express');
const router = express.Router();
const Product = require("../models/products");
const fetchuser = require("../middleware/fetchuser");

// Define a route for adding a product
router.post('/addproducts', async (req, res) => {
    try {
        const productData = req.body;
        const products = new Product(productData);
        const data = await products.save();
        res.status(201).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add the product' });
    }
});

// Router: 4, Update an existing cart using: PUT method "api/carts/updatecart" , login required
router.put("/updatecart/:id", fetchuser, async (req, res) => {
    const { amount } = req.body;
    try {
        // Create a new cart Object
        const newCart = {};
        // Find the cart to be updated and update it 
        let cart = await Product.findById(req.params.id);
        if (!cart) {
            return res.status(404).json({ error: "Item Not Found" });
        }
        if (amount) {
            newCart.stock = cart.stock - amount;
        }

        cart = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: newCart },
            { new: true }
        );
        res.json(cart);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
