"use client"
import Link from 'next/link';
import React, { useContext } from 'react'
import { signOut, useSession } from "next-auth/react"
import { cartContext } from '@/context/CartContext';
import { wishlistContext } from '@/context/WishlistContext';

export default function Navbar() {

  const {numberOfCartItems} = useContext(cartContext)!;
  const {numberOfWishlistItems} = useContext(wishlistContext)!;

  const { data: session, status } = useSession();
  console.log(session);
  
  
  function logOut() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <nav className="bg-emerald-600 text-white">
      <div className="container w-full lg:w-[80%] mx-auto p-4 flex flex-col lg:flex-row gap-4 justify-between items-center">
        <div className="left">
          <ul className="flex gap-2 lg:gap-6 items-center">
            <li className="text-2xl flex">
              <Link href="/">
                <i className="fa-solid fa-cart-shopping"></i>Fresh Cart
              </Link>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
            {session && (
              <li>
                <Link className="relative" href="/cart">
                  Cart
                  {numberOfCartItems > 0 && (
                    <span className="absolute top-[-10px] end-[-10px] flex size-5 bg-red-500 text-white rounded-full justify-center items-center font-bold">
                      {numberOfCartItems}
                    </span>
                  )}
                </Link>
              </li>
            )}
            {session && (
              <li>
                <Link className="relative" href="/wishlist">
                  Wishlist
                  {numberOfWishlistItems > 0 && (
                    <span className="absolute top-[-10px] end-[-10px] flex size-5 bg-red-500 text-white rounded-full justify-center items-center font-bold">
                      {numberOfWishlistItems}
                    </span>
                  )}
                </Link>
              </li>
            )}
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/categories">Categories</Link>
            </li>
            <li>
              <Link href="/brands">Brands</Link>
            </li>
          </ul>
        </div>
        <div className="right">
          <ul className="flex gap-4">
            {!session ? (
              <>
                <li>
                  <i className="fab fa-facebook"></i>
                </li>
                <li>
                  <i className="fab fa-twitter"></i>
                </li>
                <li>
                  <i className="fab fa-instagram"></i>
                </li>
                <li>
                  <i className="fab fa-tiktok"></i>
                </li>
                <li>
                  <i className="fab fa-linkedin"></i>
                </li>
                <li>
                  <Link href="/register">Register</Link>
                </li>
                <li>
                  <Link href="/login">Login</Link>
                </li>
              </>
            ) : (
              <>
                {session && <li>Hi {session?.user.name}</li>}
                <li>
                  <span className="cursor-pointer" onClick={logOut}>
                    Signout
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
