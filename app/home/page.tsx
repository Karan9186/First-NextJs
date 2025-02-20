"use client";
import React, { useEffect, useState } from "react";
import TableComponent from "../../components/TableComponent"; 

const Page = () => {
  const [productData,setProductData] =useState([])
  const [loading,setLoading]=useState(false)
  const [status,setStatus]=useState(false)
  const ProductData = async () => {
    setLoading(true)
    const products = await fetch("/api/products");
    const data=await products.json();
    setProductData(data);
    setLoading(false)
  };

  useEffect(() => {
    ProductData();
  }, [status]);

  return (
    <div>
      <div className="flex items-center justify-center mt-10 mb-10">
        <h1 className="w-2/4 text-center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam
          officiis architecto iusto sit, voluptatum quisquam magnam excepturi
          exercitationem! Laboriosam nobis repudiandae a? Iste sapiente mollitia,
          maiores dolor recusandae fugiat consectetur!
        </h1>
      </div>
      <TableComponent products={productData} loading={loading} setStatus={setStatus} status={status}/>
    </div>
  );
};

export default Page;
