import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, DollarSign, TrendingUp, Shield, Clock, CheckCircle, ArrowRight, Phone, Mail, ExternalLink, CreditCard, Home, Percent, Calendar } from 'lucide-react';

const FinancingPage: React.FC = () => {
  const [calculatorData, setCalculatorData] = useState({
    projectCost: '',
    downPayment: '',
    interestRate: '7.5',
    loanTerm: '10'
  });

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    calculatePayment();
  }, [calculatorData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCalculatorData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculatePayment = () => {
    const principal = parseFloat(calculatorData.projectCost) - parseFloat(calculatorData.downPayment || '0');
    const rate = parseFloat(calculatorData.interestRate) / 100 / 12;
    const payments = parseFloat(calculatorData.loanTerm) * 12;

    if (principal > 0 && rate > 0 && payments > 0) {
      const monthly = (principal * rate * Math.pow(1 + rate, payments)) / (Math.pow(1 + rate, payments) - 1);
      const total = monthly * payments;
      const interest = total - principal;

      setMonthlyPayment(monthly);
      setTotalPayment(total);
      setTotalInterest(interest);
    } else {
      setMonthlyPayment(0);
      setTotalPayment(0);
      setTotalInterest(0);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const lenders = [
    {
      name: 'LightStream',
      type: 'Personal Loans',
      rates: '7.99% - 25.49% APR',
      maxAmount: '$100,000',
      terms: '2-12 years',
      features: ['No collateral required', 'Same-day funding', 'No fees'],
      website: 'https://www.lightstream.com',
      bestFor: 'Good to excellent credit'
    },
    {
      name: 'SoFi',
      type: 'Home Improvement Loans',
      rates: '8.99% - 23.43% APR',
      maxAmount: '$100,000',
      terms: '2-7 years',
      features: ['No origination fees', 'Unemployment protection', 'Member benefits'],
      website: 'https://www.sofi.com',
      bestFor: 'Tech-savvy borrowers'
    },
    {
      name: 'Marcus by Goldman Sachs',
      type: 'Personal Loans',
      rates: '7.99% - 19.99% APR',
      maxAmount: '$40,000',
      terms: '3-6 years',
      features: ['No fees', 'Flexible payment dates', 'Rate discount for autopay'],
      website: 'https://www.marcus.com',
      bestFor: 'No-fee financing'
    },
    {
      name: 'Upgrade',
      type: 'Personal Loans',
      rates: '8.49% - 35.97% APR',
      maxAmount: '$50,000',
      terms: '2-7 years',
      features: ['Credit monitoring', 'Direct payment to creditors', 'Flexible terms'],
      website: 'https://www.upgrade.com',
      bestFor: 'Credit building'
    },
    {
      name: 'Prosper',
      type: 'Personal Loans',
      rates: '7.95% - 35.99% APR',
      maxAmount: '$40,000',
      terms: '2-5 years',
      features: ['Joint applications', 'No prepayment penalty', 'Quick funding'],
      website: 'https://www.prosper.com',
      bestFor: 'Joint applications'
    },
    {
      name: 'Best Egg',
      type: 'Personal Loans',
      rates: '7.99% - 29.99% APR',
      maxAmount: '$50,000',
      terms: '3-5 years',
      features: ['Fast approval', 'Secured loan options', 'Rate discount programs'],
      website: 'https://www.bestegg.com',
      bestFor: 'Fast funding needs'
    }
  ];

  const financingOptions = [
    {
      title: 'Personal Loans',
      description: 'Unsecured loans for home improvement projects',
      pros: ['No collateral required', 'Fixed rates', 'Quick approval'],
      cons: ['Higher interest rates', 'Lower loan amounts', 'Credit dependent'],
      bestFor: 'Smaller projects ($5K-$100K)',
      icon: CreditCard
    },
    {
      title: 'Home Equity Loans',
      description: 'Secured loans using your home as collateral',
      pros: ['Lower interest rates', 'Higher loan amounts', 'Tax deductible interest'],
      cons: ['Home at risk', 'Closing costs', 'Longer approval process'],
      bestFor: 'Major renovations ($50K+)',
      icon: Home
    },
    {
      title: 'HELOC (Home Equity Line of Credit)',
      description: 'Revolving credit line secured by home equity',
      pros: ['Flexible access to funds', 'Interest-only payments', 'Lower rates'],
      cons: ['Variable rates', 'Home at risk', 'Draw period limits'],
      bestFor: 'Ongoing projects with variable costs',
      icon: TrendingUp
    },
    {
      title: 'Cash-Out Refinance',
      description: 'Refinance for more than you owe and take cash',
      pros: ['Lowest rates', 'Large amounts', 'Single payment'],
      cons: ['Closing costs', 'Resets mortgage term', 'Market dependent'],
      bestFor: 'Major projects + mortgage refinancing',
      icon: Percent
    }
  ];

  const tips = [
    {
      title: 'Check Your Credit Score',
      description: 'Your credit score significantly impacts your interest rate. Check it before applying and consider improving it if needed.',
      icon: Shield
    },
    {
      title: 'Compare Multiple Lenders',
      description: 'Shop around with at least 3-5 lenders to find the best rates and terms for your situation.',
      icon: TrendingUp
    },
    {
      title: 'Consider Total Project Cost',
      description: 'Factor in permits, unexpected costs, and a 10-20% contingency when determining your loan amount.',
      icon: Calculator
    },
    {
      title: 'Understand All Fees',
      description: 'Look beyond interest rates to origination fees, closing costs, and prepayment penalties.',
      icon: DollarSign
    },
    {
      title: 'Time Your Application',
      description: 'Apply for financing before starting your project to ensure funds are available when needed.',
      icon: Clock
    },
    {
      title: 'Keep Documentation Ready',
      description: 'Have income verification, tax returns, and project estimates ready to speed up approval.',
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Construction Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Financing</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Calculate payments, explore financing options, and find the perfect loan for your high-ticket construction project.
          </p>
        </div>

        {/* Financing Calculator */}
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 mb-16">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Calculator className="w-8 h-8 text-amber-400" />
              <h2 className="text-3xl font-bold">Financing Calculator</h2>
            </div>
            <p className="text-slate-400">Calculate your monthly payments and total project cost</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Calculator Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Total Project Cost
                </label>
                <input
                  type="number"
                  name="projectCost"
                  value={calculatorData.projectCost}
                  onChange={handleInputChange}
                  placeholder="150000"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  <Home className="w-4 h-4 inline mr-1" />
                  Down Payment
                </label>
                <input
                  type="number"
                  name="downPayment"
                  value={calculatorData.downPayment}
                  onChange={handleInputChange}
                  placeholder="30000"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  <Percent className="w-4 h-4 inline mr-1" />
                  Interest Rate (APR)
                </label>
                <select
                  name="interestRate"
                  value={calculatorData.interestRate}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                >
                  <option value="5.5">5.5% (Excellent Credit)</option>
                  <option value="6.5">6.5% (Very Good Credit)</option>
                  <option value="7.5">7.5% (Good Credit)</option>
                  <option value="9.5">9.5% (Fair Credit)</option>
                  <option value="12.5">12.5% (Poor Credit)</option>
                  <option value="custom">Custom Rate</option>
                </select>
                {calculatorData.interestRate === 'custom' && (
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Enter custom rate"
                    onChange={(e) => setCalculatorData(prev => ({ ...prev, interestRate: e.target.value }))}
                    className="w-full mt-2 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Loan Term
                </label>
                <select
                  name="loanTerm"
                  value={calculatorData.loanTerm}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                >
                  <option value="3">3 years</option>
                  <option value="5">5 years</option>
                  <option value="7">7 years</option>
                  <option value="10">10 years</option>
                  <option value="15">15 years</option>
                  <option value="20">20 years</option>
                </select>
              </div>
            </div>

            {/* Calculator Results */}
            <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold mb-6 text-center">Payment Breakdown</h3>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-400 mb-2">
                    {formatCurrency(monthlyPayment)}
                  </div>
                  <div className="text-slate-400">Monthly Payment</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-400 mb-1">
                      {formatCurrency(parseFloat(calculatorData.projectCost || '0') - parseFloat(calculatorData.downPayment || '0'))}
                    </div>
                    <div className="text-slate-400 text-sm">Loan Amount</div>
                  </div>
                  <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400 mb-1">
                      {formatCurrency(totalInterest)}
                    </div>
                    <div className="text-slate-400 text-sm">Total Interest</div>
                  </div>
                </div>

                <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-white mb-1">
                    {formatCurrency(totalPayment)}
                  </div>
                  <div className="text-slate-400 text-sm">Total of Payments</div>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <div className="flex justify-between text-sm text-slate-400 mb-2">
                    <span>Principal</span>
                    <span>{((parseFloat(calculatorData.projectCost || '0') - parseFloat(calculatorData.downPayment || '0')) / totalPayment * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>Interest</span>
                    <span>{(totalInterest / totalPayment * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  to="/get-started"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Financing Options */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Financing Options</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Choose the right financing solution for your construction project
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {financingOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <div key={index} className="bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-amber-400/50 transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-3 rounded-xl">
                      <IconComponent className="w-6 h-6 text-slate-900" />
                    </div>
                    <h3 className="text-2xl font-bold">{option.title}</h3>
                  </div>

                  <p className="text-slate-300 mb-6 leading-relaxed">{option.description}</p>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-green-400 mb-3">Pros</h4>
                      <ul className="space-y-2">
                        {option.pros.map((pro, proIndex) => (
                          <li key={proIndex} className="flex items-start space-x-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-300">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-red-400 mb-3">Cons</h4>
                      <ul className="space-y-2">
                        {option.cons.map((con, conIndex) => (
                          <li key={conIndex} className="flex items-start space-x-2 text-sm">
                            <div className="w-4 h-4 bg-red-400 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center">
                              <div className="w-2 h-0.5 bg-slate-900"></div>
                            </div>
                            <span className="text-slate-300">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="text-sm text-slate-400 mb-1">Best For:</div>
                    <div className="font-semibold text-amber-400">{option.bestFor}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommended Lenders */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recommended Lenders</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Top-rated lenders for construction and home improvement financing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lenders.map((lender, index) => (
              <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-amber-400/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{lender.name}</h3>
                  <a
                    href={lender.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Type:</span>
                    <span className="text-white font-semibold">{lender.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Rates:</span>
                    <span className="text-amber-400 font-semibold">{lender.rates}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Max Amount:</span>
                    <span className="text-white font-semibold">{lender.maxAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Terms:</span>
                    <span className="text-white font-semibold">{lender.terms}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-green-400 mb-2 text-sm">Key Features:</h4>
                  <ul className="space-y-1">
                    {lender.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-xs text-slate-300 flex items-center space-x-2">
                        <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">Best For:</div>
                  <div className="text-sm font-semibold text-amber-400">{lender.bestFor}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financing Tips */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Financing Tips & Best Practices</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Expert advice to help you secure the best financing for your project
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tips.map((tip, index) => {
              const IconComponent = tip.icon;
              return (
                <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-amber-400/50 transition-all duration-300">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-3 rounded-xl w-fit mb-4">
                    <IconComponent className="w-6 h-6 text-slate-900" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{tip.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{tip.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-slate-600 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Finance Your Project?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Get matched with qualified contractors and explore financing options for your construction project.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              to="/get-started"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <button className="flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors">
              <Phone className="w-5 h-5" />
              <span className="font-semibold">Call (555) 123-BUILD</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-400">
            <div className="flex items-center justify-center space-x-2">
              <Shield className="w-5 h-5 text-amber-400" />
              <span>Licensed & Insured Contractors</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <span>24-Hour Response Time</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5 text-amber-400" />
              <span>100% Satisfaction Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancingPage;