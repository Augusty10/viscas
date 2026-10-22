import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import Steps from "@/components/landing/Steps";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1 overflow-x-hidden">
        <Hero />
        <Steps />
        <Features />
        <Pricing />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}