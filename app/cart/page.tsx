"use client";
import CartItem from "@/components/ui/cartItem";
import { cartAtom } from "@/lib/atoms";
import { useAtom } from "jotai";


const Cart = () => {
  const [cart, setCart] = useAtom(cartAtom);
  console.log(cart.length);

  const handleRemoveFromCart = (_id: string) => {
    setCart(prevCart => prevCart.filter(item => item._id !== _id));
  };

  return (
    <div className="w-full  max-w-6xl  px-4 py-5 mx-auto  ">
      <div className="text-3xl font-bold">Shopping Cart</div>

      <section className="py-24 relative flex items-start justify-between">
        {cart.length > 0 ? (
          <div className="grid grid-cols-1  ">
            {cart.map((cardData) => (
              <CartItem
                key={cardData._id}
                cardData={cardData}
                width={300}
                height={300}
                handleRemoveFromCart={() => handleRemoveFromCart(cardData._id as string)}
              />
            ))}
          </div>
        ) : (
          <div className="text-3xl font-bold">Your cart is empty</div>
        )}

        <div>
          <div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
            <div className="flex items-center justify-between w-full mb-6">
              <p className="font-normal text-xl leading-8 text-gray-400">
                Sub Total
              </p>
              <h6 className="font-semibold text-xl leading-8 text-gray-900">
                $360.00
              </h6>
            </div>
            <div className="flex items-center justify-between w-full pb-6 border-b border-gray-200">
              <p className="font-normal text-xl leading-8 text-gray-400">
                Delivery Charge
              </p>
              <h6 className="font-semibold text-xl leading-8 text-gray-900">
                $45.00
              </h6>
            </div>
            <div className="flex items-center justify-between w-full py-6">
              <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">
                Total
              </p>
              <h6 className="font-manrope font-medium text-2xl leading-9 text-indigo-500">
                $405.00
              </h6>
            </div>
          </div>
          <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
            <button className="rounded-full py-4 w-full max-w-[280px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100">
              <span className="px-2 font-semibold text-lg leading-8 text-indigo-600">
                Add Coupon Code
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <path
                  d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998"
                  stroke="#4F46E5"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700">
              Continue to Payment
              <svg
                className="ml-2"
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
              >
                <path
                  d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998"
                  stroke="white"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
