import Image from "next/image";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { CardData } from "./customcard";

const CartItem: React.FC<{
  cardData: CardData;
  width: number;
  height: number;
  handleRemoveFromCart: () => void;
}> = ({ cardData, width, height, handleRemoveFromCart }) => {
  return (
    <div>
      <div className="w-full max-w-xl   ">
        <div className="w-full">
          <div className="grid grid-cols-1    border-y py-6">
            <div className="flex items-center     gap-3  w-full">
              <div className="img-box">
                <Image
                  src={cardData.img}
                  alt="perfume bottle image"
                  width={width}
                  height={height}
                  className="rounded-md border"
                />
              </div>
              <div className="w-full h-full flex flex-col justify-between  ">
                <div>
                  <div className="flex justify-between">
                    <h5 className="font-semibold w-full text-xl leading-8 text-black ">
                      {cardData.title}
                    </h5>
                    <RxCross2
                      onClick={handleRemoveFromCart}
                      className="text-gray-500/70 cursor-pointer"
                    />
                  </div>
                  <p className="font-normal text-sm leading-1 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                    {cardData.description}
                  </p>
                </div>
                <h6 className="font-medium  leading-8   max-[550px]:text-center">
                  {Number(cardData.price).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
