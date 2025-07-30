import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';

const Homepage: React.FC = () => {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Services />
      <Testimonials />
      <CTASection />
    </main>
  );
};

export default Homepage;