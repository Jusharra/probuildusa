import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Building2, Zap, ClipboardCheck, Flame, Users, Factory, HardHat, Briefcase, Shield, Globe } from 'lucide-react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';

// ─── Trust Positioning Strip ───────────────────────────────────────────────
const TrustStrip: React.FC = () => (
  <section className="py-16 bg-slate-900 border-b border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-amber-400 font-semibold uppercase tracking-widest text-sm mb-4">Why We Exist</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-5">
          Not all projects are simple—and not all contractors are qualified.
        </h2>
        <p className="text-lg text-slate-300 leading-relaxed">
          We specialize in coordinating <span className="text-white font-semibold">infrastructure, mechanical, and compliance-sensitive work</span>, ensuring every project is matched with professionals who can execute efficiently and meet regulatory standards.
        </p>
      </div>
    </div>
  </section>
);

// ─── How It Works ──────────────────────────────────────────────────────────
const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Submit Your Request',
      description: 'Tell us what you need — scope, location, and timeline. Takes less than 5 minutes.',
      icon: ClipboardCheck,
    },
    {
      number: '02',
      title: 'We Qualify & Match',
      description: 'We connect you with vetted professionals aligned to your project requirements and compliance needs.',
      icon: Shield,
    },
    {
      number: '03',
      title: 'Project Execution Begins',
      description: 'Your contractor reaches out quickly to confirm details and move the project forward.',
      icon: HardHat,
    },
    {
      number: '04',
      title: 'We Stay in the Loop',
      description: 'We track progress to ensure communication and execution stay on point — start to finish.',
      icon: CheckCircle,
    },
  ];

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-amber-400 font-semibold uppercase tracking-widest text-sm mb-3">The Process</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            Seamless From{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Request to Execution
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            We handle coordination so you can focus on your operation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="bg-slate-800 rounded-2xl p-7 border border-slate-700 hover:border-amber-400/40 transition-all duration-300 h-full">
                  <div className="flex items-start justify-between mb-5">
                    <div className="bg-amber-500/10 p-3 rounded-xl">
                      <Icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <span className="text-4xl font-black text-slate-700">{step.number}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-amber-500/50 to-transparent z-10"></div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/get-started"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

// ─── Why Choose Us ─────────────────────────────────────────────────────────
const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: Building2,
      title: 'Specialized Focus',
      description: "We don't handle everything — we focus on high-value, infrastructure and compliance-driven work. That specificity is what makes us effective.",
    },
    {
      icon: Shield,
      title: 'Qualified Network',
      description: 'We work with professionals experienced in commercial, industrial, and regulated environments. No generalists — only specialists.',
    },
    {
      icon: Zap,
      title: 'Faster Response Times',
      description: "No more chasing contractors. We streamline communication and coordination so your project moves without delays.",
    },
    {
      icon: Globe,
      title: 'Nationwide Reach',
      description: 'From local jobs to multi-site needs, we operate across key U.S. markets with contractors ready to deploy.',
    },
  ];

  return (
    <section className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-amber-400 font-semibold uppercase tracking-widest text-sm mb-3">Our Advantage</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            Why{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              ProBuild Concierge
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Authority, precision, and a network built for serious work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="flex space-x-5 bg-slate-900 rounded-2xl p-7 border border-slate-700 hover:border-amber-400/40 transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="bg-amber-500/10 p-3 rounded-xl">
                    <Icon className="w-6 h-6 text-amber-400" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <h3 className="text-lg font-bold">{reason.title}</h3>
                  </div>
                  <p className="text-slate-400 leading-relaxed">{reason.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ─── Who We Serve ──────────────────────────────────────────────────────────
const WhoWeServe: React.FC = () => {
  const clients = [
    { icon: Building2, label: 'Property Owners & Managers' },
    { icon: HardHat, label: 'Commercial Developers' },
    { icon: Factory, label: 'Facility Managers' },
    { icon: Briefcase, label: 'General Contractors' },
    { icon: Flame, label: 'Industrial Operators' },
    { icon: Users, label: 'Oil & Gas Companies' },
  ];

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-amber-400 font-semibold uppercase tracking-widest text-sm mb-3">Our Clients</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-5">Who We Serve</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Built for operators and decision-makers who need execution, not excuses.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {clients.map((client, index) => {
            const Icon = client.icon;
            return (
              <div
                key={index}
                className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-amber-400/50 transition-all duration-300 text-center group hover:-translate-y-1 transform"
              >
                <div className="bg-amber-500/10 p-3 rounded-xl mx-auto w-fit mb-4 group-hover:bg-amber-500/20 transition-colors">
                  <Icon className="w-6 h-6 text-amber-400" />
                </div>
                <p className="text-sm font-semibold text-slate-300 leading-tight">{client.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ─── Partner CTA ───────────────────────────────────────────────────────────
const PartnerBanner: React.FC = () => (
  <section className="py-16 bg-slate-800 border-t border-slate-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-slate-900 rounded-2xl border border-slate-700 p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div>
          <p className="text-amber-400 font-semibold uppercase tracking-widest text-sm mb-2">For Contractors & Service Providers</p>
          <h2 className="text-3xl font-bold mb-3">Join a network built for serious work.</h2>
          <p className="text-slate-400 max-w-xl leading-relaxed">
            We partner with contractors and service providers in infrastructure & paving, electrical & HVAC, inspections & compliance, and industrial & oil/gas support.
          </p>
        </div>
        <div className="flex-shrink-0">
          <Link
            to="/why-partner"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
          >
            <span>Apply to Partner</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

// ─── Homepage ──────────────────────────────────────────────────────────────
const Homepage: React.FC = () => {
  return (
    <main className="overflow-hidden">
      <Hero />
      <TrustStrip />
      <Services />
      <HowItWorks />
      <WhyChooseUs />
      <WhoWeServe />
      <Testimonials />
      <CTASection />
      <PartnerBanner />
    </main>
  );
};

export default Homepage;
