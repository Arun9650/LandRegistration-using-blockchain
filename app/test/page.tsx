import SingleCard from "@/components/ui/singleCard";
import { FetchAllProducts } from "@/lib/action";
import { IProduct } from "@/model/Product";
import React from "react";


const Page = async () => {
  const data = await FetchAllProducts();

  const product = JSON.parse(JSON.stringify(data));

  return (
    <div>
      {product.map((item: IProduct) => {
        return <SingleCard key={item.id} data2={item} />;
      })}
    </div>
  );
};

export default Page;