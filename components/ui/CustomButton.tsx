'use client'
import { cartAtom } from '@/lib/atoms';
import { useAtom } from 'jotai';
import React from 'react'
import { Button } from './button';
import { IProduct } from '@/model/Product';

const CustomButton = ({data} : {data: IProduct}) => {

    const [cart, setCart] = useAtom(cartAtom);

  return (
    <div>
        <Button onClick={() => setCart([...cart,data ])}>Add to cart</Button>
    </div>
  )
}

export default CustomButton