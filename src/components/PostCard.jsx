"use client";

import Image from "next/image";

export default function PostCard({
  brand,
  year,
  model,
  price,
  image,
  available,
  onBookNow,
}) {
  return (
    <div className="bg-white px-6 py-8 rounded-md shadow-md">
      <div className="relative h-64 w-full">
        <Image
          src={image}
          alt="Images"
          priority
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          objectFit="cover"
          className="rounded-md"
        />
        <p className="my-3 bg-white absolute rounded-full px-6 py-2 right-3 -top-1">
          <sup className="font-bold text-gray-400">&#8373;</sup>
          <span className="text-2xl font-black text-orange-500">{price}</span>
          <sub className="font-bold text-gray-400">/day</sub>
        </p>
      </div>

      <h2 className="font-semibold text-3xl mt-4 mb-2">
        {brand} {model}
      </h2>

      <div className="grid grid-cols-2 gap-2">
        <p className="py-2 bg-neutral-100 rounded-md flex justify-between px-3">
          <span className="text-gray-400">Year:</span>
          <span className="font-semibold text-gray-600">{year}</span>
        </p>
        <p className="py-2 bg-neutral-100 rounded-md flex justify-between px-3">
          <span className="text-gray-400">Make:</span>
          <span className="font-semibold text-gray-600">{brand}</span>
        </p>
        <p className="py-2 bg-neutral-100 rounded-md flex justify-between px-3">
          <span className="text-gray-400">Model:</span>
          <span className="font-semibold text-gray-600">{model}</span>
        </p>
        <p
          className={`${
            available ? "bg-green-400" : "bg-red-500"
          } px-3 text-white rounded-md py-2 text-center`}
        >
          {available ? "Available" : "Unavailable"}
        </p>
      </div>
      {available ? (
        <button
          onClick={onBookNow}
          className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-md w-full"
        >
          Book Now
        </button>
      ) : (
        <button
          className="mt-4 px-4 py-2 bg-orange-300 text-white rounded-md w-full"
          disabled
        >
          Book Now
        </button>
      )}
    </div>
  );
}
