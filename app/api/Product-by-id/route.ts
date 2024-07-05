import { env } from "@/env";
import { IProduct } from "@/model/Product";
import { createClient } from "@/utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";


export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const  query = request.nextUrl.searchParams;
    const id = query.get('id')
  
    const supabase = createClient();
    const {data }  = await supabase.from("product").select("*").eq("id", id);
    
    return NextResponse.json({ data }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
