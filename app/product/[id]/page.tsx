import SingleCard from "@/components/ui/singleCard";
import { fetchProductById } from "@/lib/action";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await fetchProductById(params.id);

  if (data.length == 0) {
    return <div className="max-w-6xl mx-auto ">NO Item to show</div>;
  }

  return <SingleCard data2={data} />;
}
