import { Link } from 'react-router';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
const Footer = () => {
    const socialLinks = [
        { icon: Facebook, url: "https://facebook.com" },
        { icon: Instagram, url: "https://instagram.com" },
        { icon: Linkedin, url: "https://linkedin.com" },
        { icon: Twitter, url: "https://twitter.com" },
    ];
    return (
        <footer className="bg-base-100 border-t border-base-200 pt-16 pb-8 px-4 md:px-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div className="lg:col-span-2 flex flex-col items-center md:items-start space-y-4 text-center md:text-left">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                            </div>
                            <span className="font-black text-2xl tracking-tighter text-base-content">
                                Dream<span className="text-primary">DWell</span>
                            </span>
                        </div>
                        <p className="max-w-sm text-base-content/70 text-base leading-relaxed">
                            Finding your next home shouldn't be a hassle. We provide a seamless experience to discover and rent properties that fit your lifestyle.
                        </p>
                    </div>
                    <div className="flex flex-col items-center md:items-start space-y-4">
                        <h6 className="footer-title text-primary opacity-100 font-bold text-lg mb-2">Company</h6>
                        <nav className="flex flex-col space-y-3 items-center md:items-start">
                            <Link to="/about" className="link link-hover text-base-content/70 hover:text-primary transition-colors">Our Story</Link>
                            <Link to="/team" className="link link-hover text-base-content/70 hover:text-primary transition-colors">Meet the Team</Link>
                            <Link to="/careers" className="link link-hover text-base-content/70 hover:text-primary transition-colors">Careers</Link>
                        </nav>
                    </div>
                    <div className="flex flex-col items-center md:items-start space-y-4">
                        <h6 className="footer-title text-primary opacity-100 font-bold text-lg mb-2">Support</h6>
                        <nav className="flex flex-col space-y-3 items-center md:items-start">
                            <Link to="/help" className="link link-hover text-base-content/70 hover:text-primary transition-colors">Help Center</Link>
                            <Link to="/contact" className="link link-hover text-base-content/70 hover:text-primary transition-colors">Contact Us</Link>
                            <Link to="/privacy" className="link link-hover text-base-content/70 hover:text-primary transition-colors">Privacy Policy</Link>
                        </nav>
                    </div>
                </div>
                <div className="border-t border-base-200 pt-8 mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-base-content/50 font-medium tracking-wide order-2 md:order-1">
                        &copy; {new Date().getFullYear()} HouseForRent Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 order-1 md:order-2 text-base-content/50">
                        {socialLinks.map((social, index) => (
                            <a 
                                key={index} 
                                href={social.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-base-content/50 hover:text-primary transition-colors"
                            >
                                <social.icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;