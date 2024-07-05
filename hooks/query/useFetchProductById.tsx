import { IProduct } from "@/model/Product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetchProductById = (id : string) => {
  return useQuery({
    queryKey: ["fetch-all-products"],
    queryFn: () => fetchProductById(id),
  });
};

export default useFetchProductById; 


const fetchProductById = async (id: string ) => {

    try {
        const data  = await axios.get(`http://localhost:3000/api/Product-by-id?id=${id}`);
        return data;
      } catch (error) {
        throw error;
      }
}
