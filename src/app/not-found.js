import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[calc(70vh-80px)] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-8xl text-red-600 leading-none">404</h1>
        <h2 className="font-bold leading-none">Page Not Found</h2>
        <p className="my-5 text-2xl italic text-neutral-500">
          Sorry, the page you are looking for doesn&apos;t exist.
        </p>
        <div className="space-x-2 flex">
          <span>Go back to the</span>
          <Link href={"/"} className="underline text-orange-500">
            Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
