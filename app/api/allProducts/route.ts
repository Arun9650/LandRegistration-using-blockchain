import dbConnect from "@/lib/dbConnection";
import Product from "@/model/Product";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();
    // Check if the 'Product' model exists
    const Products = await Product.find({});
    if (!Products) {
      throw new Error("Product model not found");
    }

    return NextResponse.json(Products);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  } 
}
