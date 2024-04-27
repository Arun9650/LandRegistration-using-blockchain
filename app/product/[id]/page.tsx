'use client'
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export default  function Page({ params }: { params : { id: string} }) {


  // const data = await getData(params.id);
  const { isPending, error, data } = useQuery({
    queryKey: ["product", params.id],
    queryFn: () => axios.get(`http://localhost:3000/api/product/${params.id}`).then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;


  console.log(data);
    return (<div className="max-w-6xl mx-auto border">
      
  {/* <button className="text-3xl font-bold" onClick={handleback} >back</button> */}
      <div className="grid grid-cols-1  ">
        <div className="w-full max-w-xl   ">
          <div className="w-full">
            <div className="grid grid-cols-1    border-y py-6">
              <div className="flex items-center     gap-3  w-full">
                <div className="img-box">
                  <Image
                    src={data.img}
                    alt="perfume bottle image"
                    width={300}
                    height={300}
                    className="rounded-md border"
                  />
                </div>
                <div className="w-full h-full flex flex-col justify-between  ">
                  <div>
                    <div className="flex justify-between">
                      <h5 className="font-semibold w-full text-xl leading-8 text-black ">
                        {data.title}
                      </h5>
                      <RxCross2
                        // onClick={handleRemoveFromCart}
                        className="text-gray-500/70 cursor-pointer"
                      />
                    </div>
                    <p className="font-normal text-sm leading-1 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                     {data.description}
                    </p>
                  </div>
                  <h6 className="font-medium  leading-8   max-[550px]:text-center">
                    ${data.price}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }

