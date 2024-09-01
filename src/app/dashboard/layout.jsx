import DashHeader from "@/components/dash/DashHeader";

export const metadata = {
  title: "Car Rental Website",
  description: "A car rental website",
};

export default function Layout({ children }) {
  return (
    <section>
      <DashHeader />
      {children}
    </section>
  );
}
