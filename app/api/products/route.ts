import {  getAllProducts, storeProduct } from '@/controller/productController';
import { NextResponse } from 'next/server';

// API Route for GET request to fetch all products
export async function GET() {
  try {
    const response = await getAllProducts();
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try{
    const response = await storeProduct(req);
    if(response.ok){
      return NextResponse.json({ message: 'Product stored successfully',status:true }, { status: 200 });
    }
    else{
      return NextResponse.json({ message: 'Error storing products',status:false }, { status: response.status });
    }
  }catch(error){
    console.error('Error fetching products:', error);
    return NextResponse.json({ message: 'Error storing products' }, { status: 500 });

  }
}
