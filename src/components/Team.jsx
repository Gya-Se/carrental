import Image from "next/image";

export default function Team() {
  return (
    <section className="bg-orange-600 pt-16 pb-24" id="team">
      <div className="px-5 md:px-0 container mx-auto overflow-hidden">
        <div className="flex justify-center text-white font-black my-10">
          <h1 className="text-3xl">Team</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center px-5 py-8">
            <div className="relative h-32 w-32 mb-3">
              <Image
                src={"/portrait.webp"}
                alt=""
                fill
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <h1 className="text-white text-center font-bold my-1">
              Emily Thompson - Customer Service Manager
            </h1>
            <p className="text-stone-200 text-center">
              Emily ensures a smooth customer experience with her 8 years of
              industry expertise and friendly approach and design.
            </p>
          </div>
          <div className="flex flex-col px-5 py-8 items-center">
            <div className="relative h-32 w-32 mb-3">
              <Image
                src={"/portrait.webp"}
                alt=""
                fill
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <h1 className="text-white font-bold my-1 text-center">
              Michael Harris - Fleet Manager
            </h1>
            <p className="text-stone-200 text-center">
              Michael manages our fleet with precision, leveraging his 10 years
              of automotive experience to keep vehicles in top condition.
            </p>
          </div>
          <div className="flex flex-col px-5 py-8 items-center">
            <div className="relative h-32 w-32 mb-3">
              <Image
                src={"/portrait.webp"}
                alt=""
                fill
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <h1 className="text-white font-bold my-1 text-center">
              Sofia Martinez - Marketing Specialist
            </h1>
            <p className="text-stone-200 text-center">
              Sofia drives our marketing efforts with creativity and strategy,
              enhancing our brand presence and customer outreach.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
