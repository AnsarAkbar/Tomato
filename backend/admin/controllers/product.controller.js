const Product = require("../../models/product.model");
const { v2: cloudinary } = require("cloudinary");
const dotenv = require("dotenv");
const {
  updateFromCloudinary,
  deleteFromCloudinary,
} = require("../../utils/cloudinary");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .populate({ path: "category", select: "name image -_id" });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    // console.log(req.file);
    // console.log(req.body);

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        message: "Name, description, price, and category are required",
      });
    }

    const isAlready = await Product.findOne({ name });
    if (isAlready) {
      return res.status(409).json({ message: "Product already exist" });
    }

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      stock,
    };
    if (req.file) {
      const result = await updateFromCloudinary(req.file.buffer, "products");
      productData.image = {
        url: result.secure_url,
        publicId: result.public_id, // Store public_id for future deletion
      };
    }

    const product = new Product(productData);
    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.stock = stock;
    if (req.file) {
      const result = await updateFromCloudinary(
        req.file.buffer,
        "products",
        {},
        product.image.publicId
      );

      product.image = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }
    const updatedProduct = await product.save();
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.image.publicId) {
      const result = await deleteFromCloudinary(product.image.publicId);
      if (result.result !== "ok") {
        return res
          .status(500)
          .json({ message: "Error deleting image from Cloudinary" });
      }
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
