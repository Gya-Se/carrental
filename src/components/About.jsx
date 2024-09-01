import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section className="bg-white pt-16 pb-24 mt-24" id="about">
      <div className="px-5 md:px-0 container mx-auto overflow-hidden">
        <div className="flex justify-center text-stone-600 font-black my-10">
          <h1 className="text-3xl">About Us</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-96 md:h-full relative rounded-lg">
            <Image
              src={"/car.jpg"}
              alt=""
              fill
              objectFit="cover"
              className="p-2 bg-orange-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-slate-500 mb-4">
              Welcome to Car Rental, where we provide a seamless and enjoyable
              car rental experience for every journey. Whether you are planning a
              family vacation, a business trip, or just need a reliable vehicle
              for your day-to-day needs, we have the perfect car for you.
            </p>
            <h2 className="text-xl font-bold text-orange-600 mb-2">
              Our Mission
            </h2>
            <p className="text-slate-500 mb-4">
              Our mission is to make car rentals easy, accessible, and
              affordable for everyone. We strive to offer exceptional customer
              service and a wide range of well-maintained vehicles to meet your
              needs.
            </p>
            <h2 className="text-xl font-bold text-orange-600 mb-2">
              Why Choose Us?
            </h2>
            <ul className="text-slate-500 list-disc pl-5 mb-4">
              <li>Wide selection of vehicles for every occasion.</li>
              <li>Competitive pricing with no hidden fees.</li>
              <li>24/7 customer support for a hassle-free experience.</li>
              <li>
                Easy booking process with flexible pick-up and drop-off options.
              </li>
              <li>Well-maintained and regularly serviced vehicles.</li>
            </ul>
            <p className="text-slate-500">
              Ready to get started?{" "}
              <Link href={"/#"} className="font-semibold text-orange-600">
                Book your car today
              </Link>{" "}
              and enjoy the freedom of driving with Car Rental.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
