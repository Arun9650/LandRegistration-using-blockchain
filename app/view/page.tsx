"use client";
import {
  contractAddress,
  contractAddressBSC,
} from "@/constants/contractAddress";
import abi from "@/constants/abi.json";
import React from "react";
import { useReadContract } from "wagmi";
import Image from "next/image";
import { useEffect, useState } from "react";

type TIpfsData = {
  uri: string;
  id: BigInt;
};

type TNFTData = {
  name: string;
  img: string;
  image?: string;
  description: string;
};

const ViewNFT = () => {
  const baseurl = "https://ipfs.io/ipfs/";

  const result = useReadContract({
    abi: abi,
    address: contractAddress,
    functionName: "getAllTokens",
  });

  const [nftData, setNftData] = useState<TNFTData[]>([]);

  function getImageUrl(item: TNFTData, baseUrl: string): string {
    let imageUrl = item.image || item.img;
    if (!imageUrl.includes("https")) {
      imageUrl = baseUrl + imageUrl;
    }
    return imageUrl;
  }

  useEffect(() => {
    if (result.isSuccess && result.data) {
      const fetchIPFSData = async () => {
        const data: TNFTData[] = await Promise.all(
          (result.data as TIpfsData[]).map(async (item) => {
            const response = await fetch(`https://ipfs.io/ipfs/${item.uri}`);
            const ipfsData = await response.json();
            console.log("🚀 ~ data ~ ipfsData:", ipfsData);
            return ipfsData;
          })
        );
        setNftData(data);
      };
      fetchIPFSData();
    }
  }, [result.data, result.isSuccess]);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center">View NFT</h1>
      <div className="grid grid-cols-4 gap-4">
        {nftData.map((item: TNFTData) => {
          console.log(item);
          return (
            <div key={item.name} className="bg-gray-300 p-4 rounded-lg">
              <Image
                src={getImageUrl(item, baseurl)}
                width={300}
                height={300}
                alt={item.name}
                className="w-full h-52 object-cover"
              />{" "}
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewNFT;
