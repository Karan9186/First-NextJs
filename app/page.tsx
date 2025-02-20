"use client";
import { mongooseConnection } from "@/utils/connection";
import Image from "next/image";
import React from "react";

const page = () => {
  mongooseConnection()
    .then((doc) => console.log("connected", doc))
    .catch((err) => console.log("error=", err));
  return (
    <div className="h-[93vh] flex items-center justify-center w-[100%]">
      <div className="flex items-center h-[50vh] w-[70%] gap-5 px-5">
        <div className="w-1/2">
          <h1 className="mt-4 font-semibold text-3xl">
            Lorem, ipsum dolor sit amet{" "}
          </h1>
          <h1 className="mt-4 ">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et
            molestiae ullam quidem neque animi deleniti nam qui sequi nesciunt
            facere, corrupti amet vitae ut? Numquam, asperiores cupiditate.
            Officiis, iusto? Sequi.{" "}
          </h1>
        </div>{" "}
        <div style={{ width: "50%" }}>
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={800} // You can use any fixed pixel width here, this will be relative to the container's width
            height={400} // Fixed height (pixels)
            layout="intrinsic" // Optional: keeps aspect ratio while resizing
          />
        </div>
      </div>
    </div>
  );
};

export default page;
