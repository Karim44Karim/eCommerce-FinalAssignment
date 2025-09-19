  import Image from 'next/image';
  import Link from 'next/link';
  import React from 'react'
  // import qrCode "../"
  // import gplay from '/public/GooglePlay.png'
  // import appStore from '/public/appStore.png'

  export default function Footer() {
    return (
      <section className="text-white bg-black">
        <div className="container w-[80%]  mx-auto py-16 grid grid-cols-1 md:grid-cols-5 gap-7">
          <div>
            <h2 className="text-2xl font-bold pb-5">
              <Link href="/">Exclusive</Link>
            </h2>
            <p className="text-xl font-medium">
              <Link href="/">Subscribe</Link>
            </p>
            <p className='py-3'>Get 10% off your first order</p>
            <div className="border rounded-[4px] border-white flex items-center p-2 overflow-hidden">
              <input
                className="outline-none bg-transparent flex-grow min-w-0 text-sm"
                type="email"
                placeholder="Enter Your Email"
              />
              <button className="ml-2">
                <i className="fa-solid fa-paper-plane hover:text-blue-600 cursor-pointer"></i>
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-medium pb-5">Support</h4>
            <ul className="flex flex-col gap-3">
              <li>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</li>
              <li>exclusive@gmail.com</li>
              <li>+88015-88888-9999</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-medium pb-5">Account</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/myaccount">My Account</Link>
              </li>
              <li>
                <Link href="/login">Login</Link> /{" "}
                <Link href="/register">Register</Link>
              </li>
              <li>
                <Link href="/cart">Cart</Link>
              </li>
              <li>
                <Link href="/wishlist">Wishlist</Link>
              </li>
              <li>
                <Link href="/products">Shop</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-medium pb-5">Quick Link</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/">Terms Of Use</Link>
              </li>
              <li>
                <Link href="/">FAQ</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-medium pb-5">Download App</h4>
            <p>Save $3 with App New User Only</p>
            <div className="flex justify-center items-center py-3 gap-2">
              <div>
                <Image
                  src="/qr-code.png"
                  width={80}
                  height={80}
                  alt="qr-code"
                  className='cursor-pointer'
                ></Image>
              </div>
              <div className="flex flex-col flex-grow gap-2">
                <Image
                  src="/GooglePlay.png"
                  width={104}
                  height={30}
                  alt="GooglePlay"
                  className='cursor-pointer'
                ></Image>
                <Image
                  src="/AppStore.png"
                  width={104}
                  height={30}
                  alt="AppStore"
                  className='cursor-pointer'
                ></Image>
              </div>
            </div>
            <div className="flex">
              <ul className="flex row justify-between items-center w-100">
                <li>
                  <i className="fa-brands fa-facebook-f cursor-pointer"></i>
                </li>
                <li>
                  <i className="fa-brands fa-twitter cursor-pointer"></i>
                </li>
                <li>
                  <i className="fa-brands fa-instagram cursor-pointer"></i>
                </li>
                <li>
                  <i className="fa-brands fa-linkedin cursor-pointer"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
