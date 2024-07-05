"use client";
import { config } from "@/components/config/wagmi-config";
import CartItem from "@/components/ui/cartItem";
import { cartAtom, totalPriceAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useAccount, useReadContract } from "wagmi";
import { contractAddress } from "@/constants/contractAddress";
import abi from "@/constants/abi.json";
import { formatUnits } from "viem";
import { useState, useRef, useEffect } from "react";
import { IProduct } from "@/model/Product";
import { env } from "@/env";
import { simulateContract, writeContract } from "@wagmi/core";
import { ScrollArea } from "@/components/ui/scroll-area";
import toast from "react-hot-toast";

const Cart = () => {


  const [cart, setCart] = useAtom(cartAtom);
  console.log("🚀 ~ Cart ~ cart:", cart)
  const [totalPrice, setTotalPrice] = useAtom(totalPriceAtom);
  const [latestPrice, setLatestPrice] = useState(0);

  const handleRemoveFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const { address } = useAccount();

  const { data: LatestCryptoPrice, isFetched } = useReadContract({
    abi: abi,
    address: contractAddress,
    functionName: "getLatestPrice",
    account: address,
  });


  useEffect(() => {
    if(isFetched  &&    LatestCryptoPrice){
      console.log(LatestCryptoPrice);

      const Price = formatUnits(LatestCryptoPrice as bigint, 18);
      console.log("🚀 ~ useEffect ~ Price:", Price)

      setLatestPrice(Number(Price));
    }
  },[isFetched, LatestCryptoPrice])
  
  


  const handleChange = async (file: IProduct[]) => {
    console.log("🚀 ~ handleChange ~ file:", file);
    try {
      const uploadPromises = file.map(async (item) => {
        try {
          const resImg = await fetch(item.img);
          const blob = await resImg.blob();
          const fileBuffer = Buffer.from(await blob.arrayBuffer());
  
          const data = new FormData();
          data.append("file", blob);
  
          const res = await fetch("/api/files", {
            method: "POST",
            body: data,
          });
  
          const { IpfsHash } = await res.json();
  
          const Document = {
            name: item.title,
            image: `https://ipfs.io/ipfs/${IpfsHash}`,
            description: item.description,
          };
  
          const jsonDoc = await fetch(
            `https://api.pinata.cloud/pinning/pinJSONToIPFS`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${env.NEXT_PUBLIC_PINATA_JWT}`,
              },
              body: JSON.stringify(Document),
            }
          );
  
          const jsonDocData = await jsonDoc.json();
          console.log(jsonDocData);
  
          const { request } = await simulateContract(config, {
            abi: abi,
            address: contractAddress,
            functionName: "mint",
            args: [jsonDocData.IpfsHash],
          });
  
          const hash = await writeContract(config, request);
          console.log("🚀 ~ handleChange ~ hash:", hash);
  
          toast.success(`NFT minted successfully! Hash: ${hash}`);
  
          return hash;
        } catch (error) {
          console.log(error);
          toast.error("Error minting NFT");
          throw error;
        }
      });
  
      const hashes = await Promise.all(uploadPromises);
      console.log("Hashes:", hashes);
  
      toast.success("All NFTs minted successfully!");
  
      // Do something with the hashes if needed
  
    } catch (error) {
      console.log(error);
      toast.error("Trouble minting NFTs");
    }
  };

  return (
    <div className="w-full overflow-hidden   max-w-6xl  px-4 py-5 pb-0 h-[89vh] mx-auto  ">
      <div className="text-3xl font-bold">Shopping Cart</div>

      <section className="py-14 pb-0 h-full max-h-full   relative   flex items-start justify-between">
        {cart.length > 0 ? (
          <div className="grid grid-cols-2 justify-between  max-h-full  justify-items-end ">
           <ScrollArea className="h-[470px]">
           {cart.map((cardData) => (
              <>
                <CartItem
                  key={cardData.id}
                  cardData={cardData}
                  width={300}
                  height={300}
                  handleRemoveFromCart={() =>
                    handleRemoveFromCart(cardData.id as string)
                  }
                />
              </>
            ))}
           </ScrollArea>
             <div className="max-w-sm w-full h-full max-h-full  ">
                  <div className="bg-gray-50 rounded-xl p-6 w-full mb-8   max-lg:mx-auto">
                    <div className="flex items-center justify-between w-full mb-6">
                      <p className="font-normal text-xl leading-8 text-gray-400">
                        Sub Total
                      </p>
                      <h6 className="font-semibold text-xl leading-8 text-gray-900">
                        ${totalPrice}
                      </h6>
                    </div>
                    <div className="flex items-center justify-between w-full pb-6 border-b border-gray-200">
                      <p className="font-normal text-xl leading-8 text-gray-400">
                        Crypto
                      </p>
                      <h6 className="font-semibold text-xl  leading-8  text-gray-900">
                        {Number(totalPrice) * latestPrice}
                      </h6>
                    </div>
                    <div className="flex items-center justify-between w-full py-6">
                      <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">
                        Total
                      </p>
                      <h6 className="font-manrope font-medium text-2xl leading-9 text-indigo-500">
                        ${totalPrice}.00
                      </h6>
                    </div>
                  </div>
                  <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
                    <button
                      onClick={() => handleChange(cart)}
                      className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700"
                    >
                      Continue to Payment
                      <MdKeyboardDoubleArrowRight size={20} />
                    </button>
                  </div>
                </div>
          </div>
        ) : (
          <div className="text-3xl font-bold">Your cart is empty</div>
        )}
      </section>
    </div>
  );
};

export default Cart;
