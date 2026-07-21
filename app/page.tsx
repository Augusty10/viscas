import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import Steps from "@/components/landing/Steps";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Steps />
        <Features />
        <Pricing />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}