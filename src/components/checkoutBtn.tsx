"use client"

import { PriceChekoutContext } from "@/context/priceCheckoutContext";
import { useContext, useCallback } from "react";




const CheckOutBtn: React.FC = () => {

  const { totalPrice, setTotalPrice } = useContext(PriceChekoutContext)

  const CalcPreco = useCallback(
    (preco: Number) => {
      var f2 = preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
      return f2
    },
    []
  )



  return (
    <>
      <div
        className="w-full h-[50px] fixed bottom-[36px] px-2 bg-blue-500 flex items-center justify-between pr-[50px]">
        <p className="text-white text-lg font-medium">{CalcPreco(totalPrice)}</p>
        <p className="text-white font-semibold">CHECKOUT</p>
      </div>  
    </>
  );
}

export default CheckOutBtn;