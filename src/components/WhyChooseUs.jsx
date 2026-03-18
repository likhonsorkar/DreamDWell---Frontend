import { ShieldCheck, Headset, Zap } from 'lucide-react';
const features = [
  {
    name: 'Verified Listings',
    description: 'Every property is manually verified by our team to ensure quality and authenticity. Rent with confidence.',
    icon: ShieldCheck,
  },
  {
    name: '24/7 Support',
    description: 'Our dedicated support team is here to help you at any stage of your rental journey, day or night.',
    icon: Headset,
  },
  {
    name: 'Instant Booking',
    description: 'Found your dream home? Book it instantly with our streamlined and secure booking process.',
    icon: Zap,
  },
];
const WhyChooseUs = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-orange-600 font-semibold tracking-wide uppercase">Why Choose Us</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A Better Way to Find Your Home
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            We provide a seamless and trustworthy experience for renters and landlords alike.
          </p>
        </div>
        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
export default WhyChooseUs;
