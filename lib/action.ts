"use server";
// import dbConnect from "@/lib/dbConnection";
import Product, { IProduct } from "@/model/Product";
import { createClient } from "@/utils/supabase/server";
export const fetchProductById = async (id: string) => {
  // await dbConnect();

  const supabase = createClient();

  const {data: Products} = await supabase.from("product").select("*").eq("id", id);

  if(Products === null){
    return [];
  }

  return Products;
};
export const FetchAllProducts = async (): Promise<IProduct[]> => {
  // await dbConnect();

  const supabase = createClient();

const {data: Products} =   await supabase.from("product").select("*");


  if (Products === null) {
    return []; // Return an empty array or handle the null case as needed
  }


  return Products;
};
