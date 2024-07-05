"use client";
import SingleCard from "@/components/ui/singleCard";
import { Skeleton } from "@/components/ui/skeleton";
import useFetchProductById from "@/hooks/query/useFetchProductById";

export default function Page({ params }: { params: { id: string } }) {
  // const data = await fetchProductById(params.id);

  const { data, isLoading, error, isFetching } = useFetchProductById(params.id);

  if (error || data?.data == undefined) {
    return <div>something went wrong</div>;
  }

  if (isLoading || isFetching) {
    return (
      <div className="max-w-6xl mx-auto ">
      <div className="grid grid-cols-1  ">
        <div className="w-full    ">
          <div className="w-full">
            <div className="grid grid-cols-1     py-6">
              <div className="flex items-center     gap-3  w-full">
                <div className="">
                    <Skeleton className="w-80 h-80 bg-gray-400" />
                </div>
                <div className="w-full h-full flex flex-col justify-between  ">
                  <div>
                    <div className="flex justify-between">
                      <h5 className="font-semibold w-full text-xl leading-8 text-black ">
                      <Skeleton className="w-60 h-9 bg-gray-400" />
                      </h5>
                    </div>
                    <p className="font-normal text-sm leading-1 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                    <Skeleton className="w-full h-16 bg-gray-400" />
                    </p>
                    <h6 className="font-medium flex items-center leading-8   max-[550px]:text-center">
                       <Skeleton className="w-16 h-6 bg-gray-400" />
                    </h6>
                  </div>
                  <Skeleton className="w-16 h-6 bg-gray-400"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

  return <SingleCard data2={data?.data.data} />;
}
