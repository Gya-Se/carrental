import { MdOutlineContactSupport, MdOutlineSell } from "react-icons/md";
import { LuBug } from "react-icons/lu";

export default function Contact() {
  return (
    <section className="pt-16 pb-32" id="contact">
      <div className="px-5 md:px-0 container mx-auto overflow-hidden">
        <div className="flex justify-center text-stone-600 font-black my-10">
          <h1 className="text-3xl">Contact Us</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <MdOutlineContactSupport size={30} className="text-orange-500" />
            <div className="flex flex-col">
              <p className="mb-2 font-bold">Technical support</p>
              <p className="text-neutral-500 ">gctuproject2024@gmail.com</p>
              <p className="text-neutral-500 ">+233 559 452-818</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MdOutlineSell size={30} className="text-orange-500" />
            <div className="flex flex-col">
              <p className="mb-2 font-bold ">Sales questions</p>
              <p className="text-neutral-500 ">gctuproject2024@gmail.com</p>
              <p className="text-neutral-500 ">+233 559 452-818</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <LuBug size={30} className="text-orange-500" />
            <div className="flex flex-col">
              <p className="mb-2 font-bold">Bug report</p>
              <p className="text-neutral-500 ">gctuproject2024@gmail.com</p>
              <p className="text-neutral-500">+233 559 452-818</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
