```tsx
import React, { useState } from 'react';
import { ChevronDown, HelpCircle, DollarSign, Users, Shield, Calendar } from 'lucide-react';

const FAQs: React.FC = () => {
  const faqCategories = [
    {
      name: 'General Questions',
      icon: HelpCircle,
      faqs: [
        {
          question: 'What is ProBuild Concierge?',
          answer: 'ProBuild Concierge is a platform that connects property owners with pre-vetted, high-ticket construction contractors for specialized services like line striping, power washing, and window cleaning. We streamline the process of finding reliable professionals for your projects.'
        },
        {
          question: 'How is ProBuild Concierge different from other service directories?',
          answer: 'Unlike generic directories, we focus exclusively on high-ticket, specialized construction services. We rigorously vet our contractors for licensing, insurance, and proven experience, and we offer a dedicated concierge service to guide you through the process, ensuring quality and reducing your hassle.'
        },
        {
          question: 'Is there a fee to use your service as a property owner?',
          answer: 'No, our service is completely free for property owners seeking contractors. We earn a referral fee from our network contractors when a project is successfully completed.'
        },
        {
          question: 'How long does it take to get matched with a contractor?',
          answer: 'Typically, you will be matched with 1-3 qualified contractors within 24-48 hours of submitting your project details. Our AI-powered matching system and concierge team work quickly to find the best fit for your needs.'
        }
      ]
    },
    {
      name: 'Service-Specific Questions',
      icon: Shield,
      faqs: [
        {
          question: 'What types of line striping services do you offer?',
          answer: 'We offer a comprehensive range of line striping services including parking lot layout and re-striping, ADA compliance markings, fire lane striping, directional arrows, custom stenciling, and thermoplastic applications for durability.'
        },
        {
          question: 'What is the difference between power washing and pressure washing?',
          answer: 'While often used interchangeably, power washing typically uses heated water, making it more effective for tough stains like grease and oil. Pressure washing uses unheated water but at high pressure. Both are effective for deep cleaning, and our contractors are experts in both methods.'
        },
        {
          question: 'Do your window cleaning services include high-rise buildings?',
          answer: 'Yes, our network includes contractors specialized in commercial window cleaning for buildings of all heights, from low-rise to high-rise, ensuring streak-free results and safety compliance.'
        },
        {
          question: 'Can you help with asphalt sealcoating and paving?',
          answer: 'Absolutely. We connect you with experts in asphalt sealcoating to protect and extend the life of your pavement, as well as paving and patching services for new installations, overlays, and repairs of existing asphalt surfaces.'
        }
      ]
    },
    {
      name: 'Partner & Contractor Questions',
      icon: Users,
      faqs: [
        {
          question: 'How can I join your network as a contractor?',
          answer: 'Contractors can apply to join our exclusive network through the "Partner With Us" section of our website. We have strict vetting requirements including licensing, insurance, and a proven track record of high-quality work.'
        },
        {
          question: 'What are the benefits of partnering with ProBuild Concierge?',
          answer: 'Partners gain access to pre-qualified, high-ticket leads, reduced competition (1-3 contractors per lead), dedicated concierge support, and advanced project management tools. We focus on quality over quantity, helping you grow your business with serious clients.'
        },
        {
          question: 'What are the fees for contractors?',
          answer: 'We operate on a success-based referral fee model. There is a monthly listing fee, and a small percentage success fee on projects won through our platform, ensuring we only get paid when you do.'
        },
        {
          question: 'How are leads qualified?',
          answer: 'All leads are rigorously pre-qualified for budget, timeline, and decision-making authority. Our concierge team conducts initial screenings to ensure you only receive serious inquiries for high-value projects.'
        }
      ]
    }
  ];

  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleCategory = (categoryName: string) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
    setOpenFAQ(null); // Close any open FAQ when changing category
  };

  const toggleFAQ = (faqIndex: number) => {
    setOpenFAQ(openFAQ === faqIndex ? null : faqIndex);
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Questions</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about our services, processes, and partnerships.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, catIndex) => {
            const IconComponent = category.icon;
            return (
              <div key={catIndex} className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-slate-700"
                >
                  <div className="flex items-center space-x-4">
                    <IconComponent className="w-6 h-6 text-amber-400" />
                    <h2 className="text-2xl font-bold">{category.name}</h2>
                  </div>
                  <ChevronDown className={\`w-6 h-6 transition-transform ${openCategory === category.name ? 'rotate-180' : ''}`} />
                </button>

                {openCategory === category.name && (
                  <div className="p-6 border-t border-slate-700">
                    {category.faqs.map((faq, faqIndex) => (
                      <div key={faqIndex} className="mb-4 last:mb-0">
                        <button
                          onClick={() => toggleFAQ(faqIndex)}
                          className="w-full flex items-center justify-between text-left py-3 px-4 rounded-lg transition-colors hover:bg-slate-700/50"
                        >
                          <h3 className="font-semibold text-white">{faq.question}</h3>
                          <ChevronDown className={\`w-5 h-5 transition-transform ${openFAQ === faqIndex ? 'rotate-180' : ''}`} />
                        </button>
                        {openFAQ === faqIndex && (
                          <p className="text-slate-300 mt-2 px-4 py-2 bg-slate-700/30 rounded-lg leading-relaxed">
                            {faq.answer}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-16 text-center bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Our team is here to help. Reach out to us directly for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/get-started"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </Link>
            <Link
              to="/why-partner"
              className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
```