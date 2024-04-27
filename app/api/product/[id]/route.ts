import dbConnect from "@/lib/dbConnection";
import Product from "@/model/Product";
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, context: any) {
  try {

    const {params} = context;

    await dbConnect();

    // Check if the 'Product' model exists
    console.log("🚀 ~ GET ~ params.id:", params.id)
    const Products  = await Product.findById(params.id)
    console.log("🚀 ~ GET ~ Products:",Products)
    if (!Products) {
      throw new Error("Product model not found");
    }

    return NextResponse.json(Products);
    // return NextResponse.json('hello');
  } catch (error: any) {
    console.error(error);
   return  NextResponse.json({ error: error.message });
  } 
}