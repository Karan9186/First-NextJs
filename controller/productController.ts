import { Product } from "@/model/product.model";
import { mongooseConnection } from "@/utils/connection";
import { NextResponse } from "next/server";

export async function getAllProducts() {
  await mongooseConnection();
  return await Product.find({});
}

export const storeProduct = async (req: Request) => {
  try {

    const body = await req.json();
    
    // Validate input
    if (!body.name || !body.price) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Create and save product
    const newProduct = new Product(body);
    const savedProduct = await newProduct.save();

    return NextResponse.json(savedProduct, { status: 201 });
  } catch (error) {
    console.error("Error storing product:", error);
    return NextResponse.json({ message: "Error storing product" }, { status: 500 });
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ message: "Error deleting product" }, { status: 500 });
  }
};

export const getProductById = async (id: string) => {
  try {

    const product = await Product.findById(id);
    if (!product) {
      return null; // Return null instead of handling the response here
    }
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Product not found"); // Throw error instead of returning a response
  }
};

export const updateProduct = async (body: object, id: string) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });

    if (!updatedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ message: "Error updating product" }, { status: 500 });
  }
};