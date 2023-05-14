import { ReactNode } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { AiOutlineMinus } from 'react-icons/ai'
import { useState, useContext } from 'react';
import { PriceChekoutContext } from '@/context/priceCheckoutContext';



type props = {
}

const FoodItem: React.FC<props> = () => {

  const { setTotalPrice } = useContext(PriceChekoutContext)



  const [counter, setCounter] = useState(0)

  function increment() {
    setCounter(counter + 1)
    setTotalPrice((prev: number) => prev + 0.25)
  }


  function decrement() {
    if (counter == 0) {
      return
    } else {
      setCounter(counter - 1)
      setTotalPrice((prev: number) => prev - 0.25)

    }
  }




  return (
    <>
      <div className='w-full h-[90px] flex justify-between items-center'>
        <img src="https://th.bing.com/th/id/OIP.O6ie7Bfyg3NbRV6rleGztwHaGN?pid=ImgDet&rs=1"
          style={{ width: 'auto', height: '90px', borderRadius: '16%', }} alt="" />

        <div className='flex flex-col gap-3 h-full'>
          <p>Pao de sal</p>

          <div className="flex gap-[20px] ">
            <p>00,25 R$</p>

            <div className='flex gap-3'>

              <button className='bg-blue-500 rounded-full w-[24px] h-[24px] flex items-center justify-center text-white' onClick={decrement}><AiOutlineMinus /></button>
              <p>{counter}</p>
              <button className='bg-blue-500 rounded-full w-[24px] h-[24px] flex items-center justify-center text-white' onClick={increment}><AiOutlinePlus /></button>

            </div>

          </div>

        </div>

      </div>
    </>
  )
}

export default FoodItem
