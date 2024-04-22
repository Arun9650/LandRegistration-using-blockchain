"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IProduct } from "@/model/Product";
import CustomCard from "@/components/ui/customcard";
export default function Home() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["allProducts"],
    queryFn: () => axios.get("/api/allProducts").then((res) => res.data),
    
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(data[0].title);

  

  return (
    <main className="flex min-h-screen bg-[#f2f2f2] items-center justify-between p-24 pt-5">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full gap-6 ">
        {[...data].reverse().map((item : IProduct) => { // just to show good quality images first 
          console.log(item);
          return (
            <CustomCard cardData={item} width={300} height={300} key={item.id} />
          );
        })}
      </div>
    </main>
  );
}
