
import { IProduct } from "@/model/Product";
import Image from "next/image";
import React from "react";
import { Skeleton } from "./skeleton";
import CustomButton from "./CustomButton";

const SingleCard = ({ data2: data }: { data2: IProduct[] }) => {


  return (
    <div>
      {!data ? (
         <div className="max-w-6xl mx-auto ">
         <div className="grid grid-cols-1  ">
           <div className="w-full    ">
             <div className="w-full">
               <div className="grid grid-cols-1     py-6">
                 <div className="flex items-center     gap-3  w-full">
                   <div className="">
                       <Skeleton className="w-96 h-96 bg-black" />
                   </div>
                   <div className="w-full h-full flex flex-col justify-between  ">
                     <div>
                       <div className="flex justify-between">
                         <h5 className="font-semibold w-full text-xl leading-8 text-black ">
                         <Skeleton className="w-96 h-96 bg-black" />
                         </h5>
                       </div>
                       <p className="font-normal text-sm leading-1 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                       <Skeleton className="w-96 h-96 bg-black" />
                       </p>
                       <h6 className="font-medium  leading-8   max-[550px]:text-center">
                         $ <Skeleton className="w-96 h-96 bg-black" />
                       </h6>
                     </div>

                     <CustomButton data={data[0]} />
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
      ) : (
        <div className="max-w-6xl mx-auto ">
          <div className="grid grid-cols-1  ">
            <div className="w-full    ">
              <div className="w-full">
                <div className="grid grid-cols-1     py-6">
                  <div className="flex items-center     gap-3  w-full">
                    <div className="">
                      {!data ? (
                        <Skeleton className="w-96 h-96 bg-black" />
                      ) : (
                        <Image
                          src={data[0].img}
                          alt={data[0].title}
                          width={500}
                          height={500}
                          className="rounded-md border"
                        />
                      )}
                    </div>
                    <div className="w-full h-full flex flex-col justify-between  ">
                      <div>
                        <div className="flex justify-between">
                          <h5 className="font-semibold w-full text-xl leading-8 text-black ">
                            {data[0].title}
                          </h5>
                        </div>
                        <p className="font-normal text-sm leading-1 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                          {data[0].description}
                        </p>
                        <h6 className="font-medium  leading-8   max-[550px]:text-center">
                          ${data[0].price}
                        </h6>
                      </div>

                      <CustomButton data={data[0]} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleCard;
