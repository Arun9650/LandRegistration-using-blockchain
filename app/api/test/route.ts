import dbConnect from "@/lib/dbConnection";


export async function GET(request: Request) {
  await dbConnect();
  console.log("🚀 ~ GET ~ dbConnect:", dbConnect)

  return new Response('Hello, Next.js!');
 
}
