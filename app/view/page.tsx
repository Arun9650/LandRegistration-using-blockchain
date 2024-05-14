'use client';
import { contractAddress, contractAddressBSC } from '@/constants/contractAddress';
import abi from '@/constants/abi.json';
import React from 'react'
import { useReadContract } from 'wagmi';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type TIpfsData = {
    uri: string;
    id: BigInt;
}

type TNFTData = {
    name: string;
    img: string;
    description: string;
}

const ViewNFT = () => {

    const baseurl = "https://ipfs.io/ipfs/";

  const result  = useReadContract({
    abi: abi,
    address: contractAddress,
    functionName: "getAllTokens",
  });
  console.log(result)

  const [nftData, setNftData] = useState<TNFTData[]>([]);

  useEffect(() => {
    if (result.isSuccess && result.data) {
      const fetchIPFSData = async () => {
        const data: TNFTData[] = await Promise.all((result.data as TIpfsData[]).map(async (item) => {
          const response = await fetch(`https://ipfs.io/ipfs/${item.uri}`);
          const ipfsData = await response.json();
          console.log("🚀 ~ data ~ ipfsData:", ipfsData)
          return ipfsData;
        }));
        setNftData(data);
      };
      fetchIPFSData();
    }
  }, [result.data, result.isSuccess]);

  return (
    <div className='max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold text-center'>View NFT</h1>
      <div className='grid grid-cols-4 gap-4'>
        {nftData.map((item: TNFTData) => {
          console.log(item)
          return  (
            <div key={item.name} className='bg-gray-300 p-4 rounded-lg'>
              <Image src={item.img.includes("https") ? item.img : baseurl + item.img} width={300} height={300} alt={item.name} className='w-full h-52 object-cover' />
              <h2 className='text-lg font-semibold'>{item.name}</h2>
              <p className='text-sm'>{item.description}</p>
            </div>
          )
        }
        
        )}
      </div>
    </div>
  );
};

export default ViewNFT