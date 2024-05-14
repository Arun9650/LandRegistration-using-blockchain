"use client";
import { config } from "@/components/config/wagmi-config";
import CartItem from "@/components/ui/cartItem";
import { cartAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useAccount, useReadContract } from "wagmi";
import { contractAddress, contractAddressBSC } from "@/constants/contractAddress";
import abi from "@/constants/abi.json";
import { formatUnits } from "viem";
import { useState, useRef } from "react";
import { IProduct } from "@/model/Product";
import pinata from "@pinata/sdk";
import { env } from "@/env";
import { simulateContract, writeContract } from "@wagmi/core";

const Cart = () => {
  const [file, setFile] = useState("");
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);

  const inputFile = useRef(null);

  const [cart, setCart] = useAtom(cartAtom);
  console.log(cart);

  const handleRemoveFromCart = (_id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== _id));
  };

  const { address } = useAccount();

  const { data, isFetched } = useReadContract({
    abi: abi,
    address: contractAddress,
    functionName: "getLatestPrice",
    account: address,
  });
  console.log(data);

  let price: string;
  if (data && isFetched) {
    const dataBigInt = BigInt(isFetched && (data as unknown as string));
    price = formatUnits(dataBigInt, 18);
  }

  const uploadFile = async (fileToUpload: File) => {
    try {
      setUploading(true);
      const data = new FormData();
      data.set("file", fileToUpload);
      const res = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const resData = await res.json();
      setCid(resData.IpfsHash);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChange = async (file: IProduct[]) => {
    const resImg = await fetch(file[0].img);
    const blob = await resImg.blob();
    const fileBuffer = Buffer.from(await blob.arrayBuffer());

    const data = new FormData();
    data.append("file", blob)


    const res = await fetch("/api/files", {
      method: "POST",
      body: data,
    });

  const {IpfsHash} = await res.json();


    const Document = {
      name: file[0].title,
      img: `https://ipfs.io/ipfs/${IpfsHash}`,
      description: file[0].description,
    };


    const jsonDoc = await fetch(`https://api.pinata.cloud/pinning/pinJSONToIPFS`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.NEXT_PUBLIC_PINATA_JWT}`,
      },
      body: JSON.stringify(Document),
    })


    const jsonDocData = await jsonDoc.json();
    console.log(jsonDocData);
    // console.log(Document);
    const a = {
      IpfsHash: 'QmRfCuUA5GfhNGLwuLGzN1YXvA5DJ5Tkzy1YQcjAiD34Z6',
      PinSize: 252,
      Timestamp: '2024-05-09T19:15:58.136Z'
    }


    const {request} = await simulateContract(config, {
      abi: abi,
      address: contractAddressBSC,
      functionName: "mint",
      args: [jsonDocData.IpfsHash],
    })

    const hash = await writeContract(config, request)
    console.log("🚀 ~ handleChange ~ hash:", hash)


  };

  return (
    <div className="w-full  max-w-6xl  px-4 py-5 mx-auto  ">
      <div className="text-3xl font-bold">Shopping Cart</div>

      <section className="py-24 relative flex items-start justify-between">
        {cart.length > 0 ? (
          <div className="grid grid-cols-2 justify-between justify-items-end ">
            {cart.map((cardData) => (
              <>
                <CartItem
                  key={cardData._id}
                  cardData={cardData}
                  width={300}
                  height={300}
                  handleRemoveFromCart={() =>
                    handleRemoveFromCart(cardData._id as string)
                  }
                />

                <div className="max-w-sm w-full">
                  <div className="bg-gray-50 rounded-xl p-6 w-full mb-8   max-lg:mx-auto">
                    <div className="flex items-center justify-between w-full mb-6">
                      <p className="font-normal text-xl leading-8 text-gray-400">
                        Sub Total
                      </p>
                      <h6 className="font-semibold text-xl leading-8 text-gray-900">
                        ${cart[0].price}
                      </h6>
                    </div>
                    <div className="flex items-center justify-between w-full pb-6 border-b border-gray-200">
                      <p className="font-normal text-xl leading-8 text-gray-400">
                        Crypto
                      </p>
                      <h6 className="font-semibold text-xl  leading-8  text-gray-900">
                        {Number(price) * cart[0].price}
                      </h6>
                    </div>
                    <div className="flex items-center justify-between w-full py-6">
                      <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">
                        Total
                      </p>
                      <h6 className="font-manrope font-medium text-2xl leading-9 text-indigo-500">
                        $405.00
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
              </>
            ))}
          </div>
        ) : (
          <div className="text-3xl font-bold">Your cart is empty</div>
        )}
      </section>
    </div>
  );
};

export default Cart;
