import Image from "next/image";

export default function Testimonials() {
  return (
    <section className="bg-white pt-16 pb-32" id="testimonials">
      <div className="px-5 md:px-0 container mx-auto overflow-hidden">
        <div className="flex justify-center text-stone-600 font-black my-10">
          <h1 className="text-3xl">Testimonials</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col border p-5 rounded-md hover:border-orange-600">
            <div className="relative flex justify-center mb-3">
              <Image
                src={"/image.png"}
                alt=""
                width={90}
                height={90}
                className="rounded-full bg-orange-500 p-1"
              />
            </div>
            <p className="text-center mb-2 italic text-neutral-500">
              &quot;Renting a car from this service was a breeze! The booking
              process was smooth, and I appreciated the variety of cars
              available. The vehicle I chose was in great condition, and the
              staff was friendly and helpful. I will definitely be renting again
              for my next trip!&quot;
            </p>
            <h1 className="text-orange-500 text-center font-medium">
              James M.
            </h1>
          </div>
          <div className="flex flex-col border p-5 rounded-md hover:border-orange-600">
            <div className="relative flex justify-center mb-3">
              <Image
                src={"/portrait.webp"}
                alt=""
                width={90}
                height={90}
                className="rounded-full bg-orange-500 p-1 "
              />
            </div>
            <p className="text-center mb-2 italic text-neutral-500">
              &quot;Amazing experience! The customer service was top-notch, and
              the car was spotless and reliable. I loved the easy online booking
              and the quick pickup and return process. It made my vacation
              stress-free, and I could not be happier with the service.&quot;
            </p>
            <h1 className="text-orange-500 text-center font-medium">
              Sophia L.
            </h1>
          </div>
          <div className="flex flex-col border rounded-md p-5 hover:border-orange-600">
            <div className="relative flex justify-center mb-3">
              <Image
                src={"/image1.png"}
                alt=""
                width={90}
                height={90}
                className="rounded-full bg-orange-500 p-1 "
              />
            </div>
            <p className="text-center mb-2 italic text-neutral-500">
              &quot;This car rental service exceeded my expectations! The rates
              were competitive, and the car was in excellent shape. I also
              appreciated the flexibility with pickup and drop-off times. The
              team was very accommodating, and I felt valued as a customer.
              Highly recommend!&quot;
            </p>
            <h1 className="text-orange-500 text-center font-medium">
              David K.
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
