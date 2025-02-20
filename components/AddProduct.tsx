import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";

interface Product{
  _id?: string;
  name: string;
  price: string;
  description: string;
}
interface AddProductProps {
  setSelectAdd: React.Dispatch<React.SetStateAction<boolean>>;
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;
  status: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectId: React.Dispatch<React.SetStateAction<object>>;
  selectId: Product;
}
const AddProduct: React.FC<AddProductProps> = ({ setSelectAdd ,setStatus,status,selectId,setSelectId}) => {
  
  const [productData, setProductData] = useState<Product>({ name: "", price: "",description:"" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(()=>{
    setProductData(selectId)
  },[])
  const handleClick=async()=>{
    const products = await fetch("/api/products",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    const data=await products.json();
    if(data.status){
      setStatus(!status);
      setSelectAdd(false)
    }
    else{
      alert(data.message)
    }
  }

  const handleUpdate=async()=>{
    console.log("sdfsdfdsfdsf",productData)
    const products =await fetch(`/api/productsdelete/${productData._id}`,{
      method:"PUT",
      body: JSON.stringify(productData)
    })
    const response=await products.json()
    if(response.status){
      setStatus(!status);
      setSelectAdd(false)
      setSelectId({  _id: null,
        name: null,
        price: null,
        description: null,})
    }else{
      alert(response.message)
    }
  }
  return (
    <div className="h-screen w-screen absolute top-[74px] z-10 bg-[#ff000000] backdrop-blur-sm">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[70%] bg-slate-200 w-[30rem] shadow-md shadow-red-300 rounded z-10 p-4">
        <button
          onClick={() => {setSelectAdd(false);setSelectId({  _id: null,
            name: null,
            price: null,
            description: null,})}}
          className="absolute right-0 top-0 bg-slate-950 p-2 text-white rounded-full"
        >
          <ImCross fontSize="12px" />
        </button>
        <form className="max-w-sm mx-auto w-[100%]" >
          <div className="mb-5 w-[100%]">
            <label
              htmlFor="ProductName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Name
            </label>
            <input
              type="text"
              id="ProductName"
              name="name"
              value={productData?.name}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[100%]"
              placeholder="iphone"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="Product-Description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Description
            </label>
            <input
              type="text"
              id="Product-Description"
              value={productData?.description}
              onChange={handleChange}
              name="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[100%]"
              placeholder="ex. lorem ipsum dolor"
              required
            />
          </div>
          <div className="mb-5 w-[100%]">
            <label
              htmlFor="Product Price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Price
            </label>
            <input
              type="number"
              id="Product Price"
              onChange={handleChange}
              value={productData?.price}
              name="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[100%]"
              placeholder="ex 99,199,299"
              required
            />
          </div>

          <button
            type="button"
            onClick={selectId?._id==null ? handleClick : handleUpdate}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
          >
            {selectId?._id==null ? "Submit" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
