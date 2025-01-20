import ProductModel from "../model/product.model.js";
import mongoose from "mongoose";

export const getProduct = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).send(products);
  } catch (error) {
    console.error(`Error : ${error.message}`);
    res.status(400).send({
      message: "Cannot get the products",
    });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).send({
      success: false,
      message: "Plese provide all fields",
    });
  }

  const newProduct = new ProductModel(product);

  try {
    await newProduct.save();
    res.status(201).send({
      success: true,
      message: "Product created successfully!",
      product: newProduct,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Failed to create new product",
    });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      success: false,
      message: "No product found",
    });
  }

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).send({
      success: true,
      updatedProduct,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error in Updating",
    });
    console.log(`Error : ${error.message}`);
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteProduct = await ProductModel.findByIdAndDelete(id);

    if (!deleteProduct) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
      product: deleteProduct,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};
