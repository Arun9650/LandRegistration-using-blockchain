"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use } from "react";
import { usePathname } from "next/navigation";
import { BsCart3 } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./button";
import { cartAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { IProduct } from "@/model/Product";

const NavBar = () => {

  const [cart, setCart] = useAtom<IProduct[]>(cartAtom);
  const total  = cart.reduce((acc, item) => acc + item.price, 0)
  const router = useRouter();

  return (
    <div className="w-full   px-4 py-5 mx-auto md:px-24 lg:px-8 bg-gray-200">
      <div className="relative flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center">
          <Link
            href="/"
            aria-label="Company"
            title="Company"
            className="inline-flex items-center mr-8"
          >
            <svg
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              stroke="currentColor"
              fill="none"
              className="w-8 text-gray-900"
            >
              <rect x="3" y="1" width="7" height="12"></rect>
              <rect x="3" y="17" width="7" height="6"></rect>
              <rect x="14" y="1" width="7" height="6"></rect>
              <rect x="14" y="11" width="7" height="12"></rect>
            </svg>{" "}
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
              E-Commers NFT
            </span>
          </Link>
        </div>
        <ul className=" items-center hidden space-x-8 lg:flex">
          <li>
            <ConnectButton />
          </li>

          <Button onClick={() => router.push("/view")}>View Nft</Button>

          <DropdownMenu  >
            <DropdownMenuTrigger className="focus:outline-none relative">
              {" "}
              <BsCart3 size={24} className="mr-3"/>
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1.5 text-xs font-bold leading-none text-red-100 transform scale-75 bg-primary rounded-full">
                {cart.length}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 mt-2">
              <DropdownMenuLabel>{cart.length} Items</DropdownMenuLabel>
              <DropdownMenuItem>subtotal :  ${total}</DropdownMenuItem>
              <DropdownMenuItem>
                <Button onClick={() => router.push("/cart")} className="uppercase text-xs w-full">
                  View Cart
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ul>
        <div className="lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
          >
            <svg viewBox="0 0 24 24" className="w-5 text-gray-600">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              ></path>
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              ></path>
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
