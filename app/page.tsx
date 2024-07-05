  'use client'
import { IProduct } from "@/model/Product";
import CustomCard from "@/components/ui/customcard";
import Skeleton  from "@/components/skeleton";
import useFetchAllProducts from "@/hooks/query/useFetchAllProducts";
export default  function Home() {
  



  const {data,isLoading, isFetching} = useFetchAllProducts();
  console.log("🚀 ~ Home ~ data:", data?.data)

  if (!data || data?.data.data.length === 0) {
    return <div>no data</div>;
  }

  if (isLoading || isFetching) {
    return (
      <main className="flex w-full min-h-screen bg-[#f2f2f2] items-center justify-between p-24 pt-5">
        <div><Skeleton/></div>
      </main>
    );
  }

 

  return (
    <main className="flex min-h-screen bg-[#f2f2f2] items-center justify-between p-24 pt-5">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full gap-6 ">
        {[...data?.data.data].reverse().map((item: IProduct) => {
          return (
            <CustomCard cardData={item} width={300} height={300} key={item.id} />
          );
        })}
      </div>
    </main>
  );
}
