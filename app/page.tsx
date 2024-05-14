import { IProduct } from "@/model/Product";
import CustomCard from "@/components/ui/customcard";
import { FetchAllProducts } from "@/lib/action";
export default async function Home() {
  

  let something = 0;
  const data = await FetchAllProducts();
  something = 1;


  if(something === 0) return <div>no data</div>

  return (
    <main className="flex min-h-screen bg-[#f2f2f2] items-center justify-between p-24 pt-5">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full gap-6 ">
        {[...data].reverse().map((item : IProduct) => { // just to show good quality images first 
          return (
            <CustomCard cardData={item} width={300} height={300} key={item.id} />
          );
        })}
      </div>
    </main>
  );
}
