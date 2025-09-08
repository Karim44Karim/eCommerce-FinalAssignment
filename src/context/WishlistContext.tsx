"use client"

import { WishlistProductType } from "@/types/wishlist.type";
import getLoggedUserWishlist from "@/WishlistActions/getUserWishlist";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

interface WishlistContextType {
  numberOfWishlistItems: number;
  setnumberOfWishlistItems: Dispatch<SetStateAction<number>>;
  wishlistProducts: WishlistProductType[];
  isLoading: boolean;
  getUserWishlist: () => Promise<void>;
}


interface WishlistContextProviderProps {
  children: ReactNode;
}


export const wishlistContext = createContext<WishlistContextType | undefined>(undefined);

export default function WishlistContextProvider({children} : WishlistContextProviderProps){
    const [numberOfWishlistItems, setnumberOfWishlistItems] = useState<number>(0);
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

      async function getUserWishlist(){
        try {
          setIsLoading(true);
          const res = await getLoggedUserWishlist();
          
          if (res.status === 'success') {
            setWishlistProducts(res.data);
            setnumberOfWishlistItems(res.count);
            console.log(wishlistProducts);
            setIsLoading(false);
          }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    
      }

    useEffect(() => {
      getUserWishlist();
    }, [])
    
    

    return (
      <wishlistContext.Provider value={{ numberOfWishlistItems, setnumberOfWishlistItems, wishlistProducts, isLoading, getUserWishlist }}>
        {children}
      </wishlistContext.Provider>
    );
}