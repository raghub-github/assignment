const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const CartItems = require("../models/CartItems");
const { getAllProducts, getAllcarts } = require("../controlles/products");
const { body, validationResult } = require("express-validator");

//Router : 1,  Get all the data using: GET method "allproducts and allCarts"
router.route('/').get(getAllProducts);
router.route('/getAllcarts').get(getAllcarts);

//Router : 2,  Get all the carts using: GET method "api/carts/getuser" , login required
router.get("/fetchallcarts", fetchuser, async (req, res) => {
  try {
    const cartsData = await CartItems.find({ user: req.user.id });
    res.json(cartsData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal server error" });
  }
});

//Router: 3, add all the carts using: POST method "api/carts/addcarts" , login required
router.post(
  "/addcarts",
  fetchuser,
  async (req, res) => {
    try {
      const { color, amount, price, image, max, name, _pid, category, company } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      const carts = new CartItems({
        color, amount, price, image, max, name, _pid, category, company,
        user: req.user.id,
      });
      const savedCart = await carts.save();
      res.json(savedCart);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ error: "Internal server error" });
    }
  }
);

// Router: 4, Update an existing cart using: PUT method "api/carts/updatecart" , login required
router.put("/updatecart/:id", fetchuser, async (req, res) => {
  const { newAmount } = req.body;
  try {
    // Create a new cart Object
    const newCart = {};
    if (newAmount) {
      newCart.amount = newAmount;
    }
    // Find the cart to be updated and update it 
    let cart = await CartItems.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({ error: "Cart Not Found" });
    }
    if (cart.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "User Not Allowed" });
    }
    cart = await CartItems.findByIdAndUpdate(
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

//Router : 5,  Get all the carts using: DELETE method "api/carts/deleteallcarts" , login required
router.delete("/deleteallcarts", fetchuser, async (req, res) => {
  try {
    const cartsData = await CartItems.deleteMany({ user: req.user.id });
    res.json(cartsData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal server error" });
  }
});

//Router: 6, Delete an existing cart using: DELETE method "api/carts/deletecart" , login required
router.delete("/deletecart/:id", fetchuser, async (req, res) => {
  // Find the cart to be deleted and delete it
  try {
    let cart = await CartItems.findById(req.params.id);
    if (!cart) {
      return res.status(404).send({ error: "Item Not Found" });
    }
    // Allow deletion only if user owns this carts
    if (cart.user.toString() !== req.user.id) {
      return res.status(401).send({ error: "Not Allowed" });
    }
    cart = await CartItems.findByIdAndDelete(req.params.id);
    res.json({ Success: "Cart has been deleted", cart: cart });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;
