const Category = require("../../models/category.model");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../../utils/cloudinary");

// Category Management
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const isAlready = await Category.findOne({ name });
    if (isAlready) {
      return res.status(409).json({ message: "Category already exist" });
    }
    const response = await uploadToCloudinary(req.file.buffer, "categories");
    const category = await Category.create({
      name,
      description,
      image: { url: response.secure_url, publicId: response.public_id },
    });

    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    // console.log('-->', req.params.id);
    const category = await Category.findById({_id:req.params.id});
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    category.name = name;
    category.description = description;
    if (req.file) {
      const response = await uploadToCloudinary(req.file.buffer, "categories");
      category.image = {
        url: response.secure_url,
        publicId: response.public_id,
      };
    }
    await category.save();
    res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById({_id:req.params.id});
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const result = await deleteFromCloudinary(category.image.publicId);
    if (result.result !== "ok") {
      return res
        .status(500)
        .json({ message: "Error deleting image from Cloudinary" });
    }
    await Category.findByIdAndDelete({ _id: req.params.id });
    res
      .status(200)
      .json({ message: "Category deleted successfully", category });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
