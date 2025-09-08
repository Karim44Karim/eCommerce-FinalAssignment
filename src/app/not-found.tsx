import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className="d-flex flex-column vh-100 justify-content-center align-items-center">
      <span className="fs-1 fw-bold">Something went wrong</span>
      <img className="col-2" src="../../public/404.png" alt="404 Not Found" />

      <Link href="/" className="btn">
        Back To Home Page
      </Link>
    </div>
  );
}
