import mongoose, { Schema } from "mongoose";

// Define the schema
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Check if the model is already defined (this is the fix for the OverwriteModelError)
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export { Product };
