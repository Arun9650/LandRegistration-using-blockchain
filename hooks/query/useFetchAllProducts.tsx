'use client'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetchAllProducts = () => {
  return useQuery({
    refetchOnWindowFocus: true,
    queryKey: ["fetch-all-products"],
    queryFn: () => fetchAllProducts(),
  });
};

export default useFetchAllProducts;


const fetchAllProducts = async () => {

    try {
        const data  = await axios.get(`http://localhost:3000/api/allProducts`);
        return data;
      } catch (error) {
        throw error;
      }
}
