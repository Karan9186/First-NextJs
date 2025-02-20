import { deleteProduct, getProductById, updateProduct } from "@/controller/productController";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    if (!params || !params.id) {
      return NextResponse.json({ message: "Missing product ID" }, { status: 400 });
    }
    const responseData = await getProductById(params.id);
    return responseData
      ? NextResponse.json({data:responseData,status:true}, { status: 200 })
      : NextResponse.json({ message: "Product not found",status:true}, { status: 404 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ message: "Error fetching product" }, { status: 500 });
  }
}
export async function DELETE(req: Request, context: Promise<{ params: { id: string } }>) {
  try{
    const { params } = await context; // ✅ Await context before using params
    const { id } = params;
    const response=await deleteProduct(id);
    if(response.ok){
      return NextResponse.json({ message: 'Product deleted successfully',status:true }, { status: 200 });
    }
    else{
      return NextResponse.json({ message: 'Error deleting product',status:false }, { status: 400 });
    }
  }catch (error) {
    console.log("error to delete product",error)
    return NextResponse.json({ message: 'Error deleting product' }, { status: 500 });
  }
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    if (!params.id) {
      return NextResponse.json({ message: "Missing product ID" }, { status: 400 });
    }

    // Check if request has a body
    const bodyText = await req.text();
    if (!bodyText) {
      return NextResponse.json({ message: "Request body is empty" }, { status: 400 });
    }

    const body = JSON.parse(bodyText); // Parse JSON manually to catch errors
    const updatedData={
      name: body.name || "",
      price: body.price || 0,
      description: body.description || ""
    }
    const updatedProduct = await updateProduct(updatedData,params.id);

    return updatedProduct
      ? NextResponse.json({ message: "Product updated successfully", status:true }, { status: 200 })
      : NextResponse.json({ message: "Product not found" }, { status: 404 });
  } catch (error) {
    console.error("Error updating product:", error);
    
    // Handle JSON parsing error
    if (error instanceof SyntaxError) {
      return NextResponse.json({ message: "Invalid JSON format" }, { status: 400 });
    }

    return NextResponse.json({ message: "Error updating product" }, { status: 500 });
  }
}
