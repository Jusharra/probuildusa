import React from 'react';
import { Star, Quote, Home, Building2, TreePine } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'John D.',
      role: 'Property Manager',
      location: 'Los Angeles, CA',
      project: 'Parking Lot Striping',
      amount: '$3,500',
      image: 'https://images.pexels.com/photos/753876/pexels-photo-753876.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      quote: 'The line striping service was incredibly efficient and professional. Our parking lot looks brand new and is much safer now. Highly recommend!',
      icon: Home,
      beforeAfter: {
        before: 'https://images.pexels.com/photos/753876/pexels-photo-753876.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        after: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
      }
    },
    {
      id: 2,
      name: 'Sarah K.',
      role: 'Homeowner',
      location: 'Miami, FL',
      project: 'Driveway Power Washing',
      amount: '$450',
      image: 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      quote: 'My driveway was covered in mildew and dirt. After the power washing, it looks brand new! The team was quick and thorough.',
      icon: Building2,
      beforeAfter: {
        before: 'https://images.pexels.com/photos/5025639/pexels-photo-5025639.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        after: 'https://images.pexels.com/photos/4254165/pexels-photo-4254165.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
      }
    },
    {
      id: 3,
      name: 'Michael B.',
      role: 'Business Owner',
      location: 'Chicago, IL',
      project: 'Commercial Window Cleaning',
      amount: '$1,200',
      image: 'https://images.pexels.com/photos/355164/pexels-photo-355164.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      quote: 'Our office building windows have never been cleaner. The service was efficient, non-disruptive, and the results are fantastic.',
      icon: TreePine,
      beforeAfter: {
        before: 'https://images.pexels.com/photos/355164/pexels-photo-355164.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        after: 'https://images.pexels.com/photos/273209/pexels-photo-273209.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
      }
    }
  ];

  const stats = [
    { number: '500+', label: 'Completed Projects', icon: Home },
    { number: '$50M+', label: 'Project Value Delivered', icon: Building2 },
    { number: '98%', label: 'Client Satisfaction', icon: Star },
    { number: '48hr', label: 'Average Response Time', icon: TreePine }
  ];

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Clients Say</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Real results from real clients who trusted us with their property maintenance and improvement projects.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-amber-400/50 transition-all duration-300">
                  <IconComponent className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => {
            const IconComponent = testimonial.icon;
            return (
              <div key={testimonial.id} className="group bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-amber-400/50 transition-all duration-300 transform hover:-translate-y-2">
                {/* Before/After Images */}
                <div className="relative h-32 overflow-hidden">
                  <div className="grid grid-cols-2 h-full">
                    <img 
                      src={testimonial.beforeAfter.before} 
                      alt="Before"
                      className="w-full h-full object-cover"
                    />
                    <img 
                      src={testimonial.beforeAfter.after} 
                      alt="After"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-800/90 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between text-xs text-white">
                    <span>Before</span>
                    <span>After</span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative mb-6">
                    <Quote className="w-6 h-6 text-amber-400/30 absolute -top-2 -left-1" />
                    <p className="text-slate-300 leading-relaxed pl-6">
                      "{testimonial.quote}"
                    </p>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center space-x-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-slate-400">{testimonial.role}</div>
                      <div className="text-xs text-slate-500">{testimonial.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="bg-amber-500/20 p-2 rounded-lg">
                        <IconComponent className="w-5 h-5 text-amber-400" />
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Project:</span>
                      <span className="text-white font-semibold">{testimonial.project}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-1">
                      <span className="text-slate-400">Investment:</span>
                      <span className="text-amber-400 font-bold">{testimonial.amount}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-slate-300 mb-6">
              Let us connect you with the perfect service provider for your needs.
            </p>
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105">
              Get Your Service Quote Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;