import { env } from "@/env";
import { createClient } from "@/utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";


export async function GET(request: NextRequest) {
  try {
   
    const supabase = createClient();
    const {data} =   await supabase.from("product").select("*");
    
    return NextResponse.json({ data }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
