// app/page.tsx
import AboutPage from "./Components/AboutUs";
import CTA from "./Components/CTA";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import ImpactSection from "./Components/GetInvolvedSection";
import OurServices from "./Components/OurServices";
import GetInvolvedSection from "./Components/GetInvolvedSection";
import ContactSection from "./Components/ContactSection";


export default function HomePage() {
  return (
    <section>
      <Hero />
      <AboutPage/>
      <OurServices/>
      <GetInvolvedSection/>
      <CTA/>
      <ContactSection/>
      <Footer/>
      
    </section>
  );
}
