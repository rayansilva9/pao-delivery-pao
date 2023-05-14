"use client"

import React, { useContext } from "react"
import { UserContext } from "@/context/userContext"
import FoodItem from "@/components/foodItem"
import CheckOutBtn from "@/components/checkoutBtn"
const Home: React.FC = ({ }) => {

  const { user } = useContext(UserContext)


  return (
    <>
      {!user && null}
      {user && (
        <>
          <div className="mt-[100px] flex flex-col gap-2 px-2">
            <FoodItem />
            <FoodItem />
            <FoodItem />
          </div>
          <CheckOutBtn />
        </>
      )}
    </>
  )
}

export default Home