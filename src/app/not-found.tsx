import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-96 text-center">
      <span className="text-6xl font-bold">404 Not Found</span>
      <p className="mt-2 text-gray-600">
        The page you are looking for does not exist.
      </p>

      <Link href="/" className="btn bg-red-400 px-4 py-2 rounded text-white">
        Back To Home Page
      </Link>
    </div>
  );
}
