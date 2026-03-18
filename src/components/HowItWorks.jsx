import React from 'react';
import { Search, Home, Key } from 'lucide-react';

const steps = [
  {
    name: 'Find Your Home',
    description: 'Use our advanced search filters to find the perfect home for you. Search by location, price, amenities, and more.',
    icon: Search,
  },
  {
    name: 'Visit the Property',
    description: 'Schedule a visit to your chosen property at a time that works for you. See your future home in person.',
    icon: Home,
  },
  {
    name: 'Move In',
    description: 'Finalize Request a rent and when owner accept request you just payment invoice and confirm book.',
    icon: Key,
  },
];
const HowItWorks = () => {
  return (
    <div id="how-it-works" className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-orange-600 font-semibold tracking-wide uppercase">How It Works</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Getting Your New Home is Easy
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Follow our simple three-step process to find and move into your new home.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {steps.map((step, index) => (
              <div key={step.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                    <step.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{`Step ${index + 1}: ${step.name}`}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{step.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
export default HowItWorks;
