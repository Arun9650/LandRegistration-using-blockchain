import SingleCard from "@/components/ui/singleCard";
import { fetchProductById } from "@/lib/action";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await fetchProductById(params.id);

  return <SingleCard data2={data} />;
}
