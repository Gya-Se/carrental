import About from "@/components/About";
import Contact from "@/components/Contact";
import Jumbo from "@/components/Jumbo";
import RecentlyAdded from "@/components/RecentlyAdded";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main>
      <Jumbo />
      <RecentlyAdded />
      <About />
      <Team />
      <Testimonials />
      <Contact />
    </main>
  );
}
