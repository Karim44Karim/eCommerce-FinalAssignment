"use client"

import getLoggedUserCart from "@/CartActions/getUserCart";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

interface CartContextType {
  numberOfCartItems: number;
  setNumberOfCartItems: Dispatch<SetStateAction<number>>;
}


interface CartContextProviderProps {
  children: ReactNode;
}


export const cartContext = createContext<CartContextType | undefined>(undefined);

export default function CartContextProvider({children} : CartContextProviderProps){
    const [numberOfCartItems, setNumberOfCartItems] = useState<number>(0);
    async function getUserCart() {
        try {
            const res = await getLoggedUserCart();
            console.log(res);
            if(res.status === 'success'){
                console.log(res.data.products);
                let sum =0;
                res.data.products.forEach((element: { count: number }) => {
                    sum += element.count;
                });
                setNumberOfCartItems(sum);
                
            }
        } catch (error) {
            // console.log("not logged in");
        }
        
    }

    useEffect(() => {
      getUserCart();
    }, [])
    
    

    return (
      <cartContext.Provider value={{ numberOfCartItems, setNumberOfCartItems }}>
        {children}
      </cartContext.Provider>
    );
}