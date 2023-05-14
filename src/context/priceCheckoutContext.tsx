import { createContext, ReactNode, useState, Dispatch, SetStateAction } from "react"


type PriceChekoutProviderProps = {
  children: ReactNode
}


type PriceChekoutContextProps = {
  setTotalPrice: Dispatch<SetStateAction<any>>
  totalPrice: Number
}


export const PriceChekoutContext = createContext({} as PriceChekoutContextProps)

export const PriceChekoutProvider: React.FC<PriceChekoutProviderProps> = ({ children }) => {

  const [totalPrice, setTotalPrice] = useState<Number>(0)




  return <PriceChekoutContext.Provider value={{ setTotalPrice, totalPrice }}>{children}</PriceChekoutContext.Provider>

}