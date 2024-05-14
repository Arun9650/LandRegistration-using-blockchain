import * as React from "react";

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
import { IProduct } from "@/model/Product";
import Link from "next/link";
import CustomButton from "./CustomButton";

const CustomCard: React.FC<{
  cardData: IProduct;
  width: number;
  height: number;
}> = ({ cardData, width, height }) => {
  return (
    <Card className=" flex justify-between shadow-lg flex-col">
      <CardHeader className="my-auto">
        <Link href={`/product/${cardData.id}`}>
          <CardTitle className=" h-64  flex items-center">
            <Image
              src={cardData.img}
              alt={cardData.title}
              width={width}
              height={height}
            />
          </CardTitle>
        </Link>
      </CardHeader>
      <CardFooter className="flex justify-between ">
        <div className="flex flex-col">
          <Label>{cardData.title}</Label>
          <CardDescription> ${cardData.price}</CardDescription>
        </div>
        <CustomButton data={cardData} />
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
