import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import Steps from "@/components/landing/Steps";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import CtaBand from "@/components/landing/CtaBand";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <Steps />
        <Features />
        <Pricing />
        <FAQ />
        <CtaBand />
      </main>

      <Footer />
    </div>
  );
}