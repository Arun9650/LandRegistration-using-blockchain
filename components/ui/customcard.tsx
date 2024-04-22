import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { atom, useAtom } from 'jotai';
import { IProduct } from "@/model/Product";
import { cartAtom } from "@/lib/atoms";





export interface CardData extends IProduct {
    _id?: string;
}

const CustomCard : React.FC<{ cardData: CardData, width: number, height: number }> = ({cardData, width, height}) => {
    const [cart, setCart] = useAtom<CardData[]>(cartAtom);

    const handleAddToCart = () => {
        setCart((prevCart) => {
          const updatedCart = [...prevCart, cardData];
          return updatedCart;
        });
      };


  return (  
    <Card className=" flex justify-between shadow-lg flex-col">
      <CardHeader className="my-auto">
        <CardTitle className=" h-64  flex items-center" ><Image src={cardData.img} alt={cardData.title} width={width} height={height}/></CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between ">
      <div className="flex flex-col">
      <Label>{cardData.title}</Label>
        <CardDescription> ${cardData.price}</CardDescription>
      </div>

        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;

