import React from 'react';
import { Star, Quote, Building2, Zap, ClipboardCheck, Flame } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Marcus T.',
      role: 'Regional Property Manager',
      location: 'Houston, TX',
      project: 'Parking Lot Resurfacing & Restriping',
      amount: '$38,500',
      icon: Building2,
      rating: 5,
      quote: 'We had three retail centers that needed full parking lot overhauls before our lease renewals. Goree & Associates matched us with a crew that handled everything — paving, sealcoating, ADA striping. Professional, on schedule, and compliant.',
    },
    {
      id: 2,
      name: 'Dana W.',
      role: 'Facilities Director',
      location: 'Dallas, TX',
      project: 'Commercial HVAC & Panel Upgrade',
      amount: '$72,000',
      icon: Zap,
      rating: 5,
      quote: "Our warehouse had aging electrical and HVAC that was killing productivity. The contractors they matched us with were industrial-grade, permitted, and done in two weeks. Couldn't have coordinated this ourselves.",
    },
    {
      id: 3,
      name: 'Luis R.',
      role: 'Industrial Site Manager',
      location: 'Midland, TX',
      project: 'Oil Site Safety Inspection & Compliance',
      amount: '$24,000',
      icon: Flame,
      rating: 5,
      quote: "Nobody in our area was doing compliance coordination at this level. Goree & Associates found us certified inspectors, handled the regulatory documentation, and kept us out of trouble. This service is irreplaceable.",
    },
  ];

  const stats = [
    { number: '500+', label: 'Projects Coordinated', icon: Building2 },
    { number: '$50M+', label: 'Project Value Managed', icon: Zap },
    { number: '98%', label: 'Client Satisfaction', icon: Star },
    { number: '24hr', label: 'Average Match Time', icon: ClipboardCheck },
  ];

  return (
    <section className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-amber-400 font-semibold uppercase tracking-widest text-sm mb-3">Results</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trusted by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Serious Operators
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Property managers, facility directors, and industrial operators — here's what they say.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-slate-900 rounded-2xl p-6 border border-slate-700 hover:border-amber-400/50 transition-all duration-300 text-center">
                <Icon className="w-7 h-7 text-amber-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.id} className="group bg-slate-900 rounded-2xl p-7 border border-slate-700 hover:border-amber-400/50 transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
                {/* Rating */}
                <div className="flex items-center mb-5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <div className="relative mb-6 flex-1">
                  <Quote className="w-6 h-6 text-amber-400/25 absolute -top-1 -left-1" />
                  <p className="text-slate-300 leading-relaxed pl-5">
                    "{t.quote}"
                  </p>
                </div>

                {/* Client */}
                <div className="flex items-center space-x-4 mb-5">
                  <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-slate-900 font-bold text-lg">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-sm text-slate-400">{t.role}</div>
                    <div className="text-xs text-slate-500">{t.location}</div>
                  </div>
                  <div className="ml-auto">
                    <div className="bg-amber-500/10 p-2 rounded-lg">
                      <Icon className="w-4 h-4 text-amber-400" />
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="pt-4 border-t border-slate-700">
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="text-slate-500">Project:</span>
                    <span className="text-slate-300 font-medium text-right">{t.project}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Project Value:</span>
                    <span className="text-amber-400 font-bold">{t.amount}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
