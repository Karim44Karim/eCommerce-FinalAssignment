"use client";
import React, { useContext } from 'react'
import { signOut, useSession } from "next-auth/react"
import { cartContext } from '@/context/CartContext';
import { wishlistContext } from '@/context/WishlistContext';
import { MenuIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from 'next/navigation';

import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const Navbar5 = () => {
  const pathname = usePathname();
  const { numberOfCartItems } = useContext(cartContext)!;
  const { numberOfWishlistItems } = useContext(wishlistContext)!;

  const { data: session, status } = useSession();
  console.log(session);

  function logOut() {
    signOut({ callbackUrl: "/login" });
  }

  const links = [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/products",
      label: "Products",
    },
    {
      path: "/categories",
      label: "Categories",
    },
    {
      path: "/brands",
      label: "Brands",
    },
  ];


  const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]
  return (
    <>
      <section className=" bg-white z-30 w-full fixed m-0">
        <div className="container mx-auto">
          <nav className="flex items-center justify-between border-b">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-semibold tracking-tighter p-5">
                Exclusive
              </span>
            </Link>
            <NavigationMenu className="hidden lg:block">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/"
                    className={navigationMenuTriggerStyle()}
                  >
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/contact"
                    className={navigationMenuTriggerStyle()}
                  >
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/about"
                    className={navigationMenuTriggerStyle()}
                  >
                    About
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/categories"
                    className={navigationMenuTriggerStyle()}
                  >
                    Categories
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/brands"
                    className={navigationMenuTriggerStyle()}
                  >
                    brands
                  </NavigationMenuLink>
                </NavigationMenuItem>
                {session && (
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/allorders"
                      className={navigationMenuTriggerStyle()}
                    >
                      My Orders
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}
                {!session && (
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/register"
                      className={navigationMenuTriggerStyle()}
                    >
                      Sign Up
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
            <div className="hidden items-center gap-4 lg:flex">
              <div className="right">
                <ul className="flex gap-4 items-center">
                  {session && (
                    <li>
                      <Link className="relative" href="/wishlist">
                        <i className="fa-regular fa-heart"></i>

                        {numberOfWishlistItems > 0 && (
                          <span className="absolute top-[-10px] end-[-10px] flex size-5 bg-red-500 text-white rounded-full justify-center items-center font-bold">
                            {numberOfWishlistItems}
                          </span>
                        )}
                      </Link>
                    </li>
                  )}
                  {session && (
                    <li>
                      <Link className="relative" href="/cart">
                        <i className="fa-solid fa-cart-shopping"></i>
                        {numberOfCartItems > 0 && (
                          <span className="absolute top-[-10px] end-[-10px] flex size-5 bg-red-500 text-white rounded-full justify-center items-center font-bold">
                            {numberOfCartItems}
                          </span>
                        )}
                      </Link>
                    </li>
                  )}
                  {!session ? (
                    <>
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
                  {session && (
                    <li>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="size-8 rounded-full!"
                          >
                            <i className="fa-regular fa-user"></i>
                            {/* 
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <i className="fa-regular fa-user"></i>

                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar> */}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-45" align="end">
                          <DropdownMenuGroup>
                            <DropdownMenuItem>
                              <Link href="managemyaccount">
                                <i className="fa-regular fa-user"></i>
                                Manage My Account
                                </Link>
                            </DropdownMenuItem>
                            <Link href="/allorders">
                              <DropdownMenuItem>
                                <i className="fa-solid fa-bag-shopping"></i>
                                My Orders
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem>
                              <i className="fa-regular fa-circle-xmark"></i>
                              My Cancellations
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <i className="fa-regular fa-star"></i>
                              My Reviews
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <span className="cursor-pointer" onClick={logOut}>
                                <i className="fa-solid fa-arrow-right-from-bracket fa-flip-horizontal"></i>
                                Logout
                              </span>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon">
                  <MenuIcon className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="max-h-screen overflow-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2">
                      <span className="text-lg font-semibold tracking-tighter">
                        Exclusive
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col p-4">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-row gap-5">
                      {session && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              className="size-8 rounded-full!"
                            >
                              <i className="fa-regular fa-user"></i>
                              {/* 
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <i className="fa-regular fa-user"></i>

                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar> */}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-45" align="end">
                            <DropdownMenuGroup>
                              <DropdownMenuItem>
                                <Link href="/managemyaccount">
                                  <i className="fa-solid fa-user"></i>
                                  Manage My Account
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Link href="/allorders">
                                  <i className="fa-solid fa-bag-shopping"></i>
                                  My Orders
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <i className="fa-regular fa-circle-xmark"></i>
                                My Cancellations
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <i className="fa-regular fa-star"></i>
                                My Reviews
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <i className="fa-solid fa-arrow-right-from-bracket fa-flip-horizontal"></i>
                                Logout
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}

                      {!session ? (
                        <>
                          <Link href="/register">Register</Link>
                          <Link href="/login">Login</Link>
                        </>
                      ) : (
                        <>
                          {session && <li>Hi {session?.user.name}</li>}
                          <span className="cursor-pointer" onClick={logOut}>
                            Signout
                          </span>
                        </>
                      )}
                    </div>
                    <div className="mt-6 flex flex-col gap-4">
                      {session && (
                        <li>
                          <Link className="relative" href="/wishlist">
                            <i className="fa-regular fa-heart"></i>

                            {numberOfWishlistItems > 0 && (
                              <span className="absolute top-[-10px] end-[-10px] flex size-5 bg-red-500 text-white rounded-full justify-center items-center font-bold">
                                {numberOfWishlistItems}
                              </span>
                            )}
                          </Link>
                        </li>
                      )}
                      {session && (
                        <li>
                          <Link className="relative" href="/cart">
                            <i className="fa-solid fa-cart-shopping"></i>
                            {numberOfCartItems > 0 && (
                              <span className="absolute top-[-10px] end-[-10px] flex size-5 bg-red-500 text-white rounded-full justify-center items-center font-bold">
                                {numberOfCartItems}
                              </span>
                            )}
                          </Link>
                        </li>
                      )}
                    </div>
                    <Link href="/" className="font-medium">
                      Home
                    </Link>
                    <Link href="/contact" className="font-medium">
                      Contact
                    </Link>
                    <Link href="/about" className="font-medium">
                      About
                    </Link>
                    <Link href="/categories" className="font-medium">
                      categories
                    </Link>
                    <Link href="/brands" className="font-medium">
                      brands
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </section>
    </>
  );
};

export { Navbar5 };
