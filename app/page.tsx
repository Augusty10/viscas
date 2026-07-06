import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import Workspace from "@/components/landing/Workspace";
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
        <Workspace />
        <Features />
        <Pricing />
        <FAQ />
        <Footer />

      </main>
    </>
  );
}