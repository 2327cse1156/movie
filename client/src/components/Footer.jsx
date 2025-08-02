import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="px-6 pt-10 md:px-16 lg:px-36 bg-black text-gray-300">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 border-b border-gray-700 pb-10">

        {/* Left Section */}
        <div>
          <img alt="Logo" className="h-11" src={assets.logo} />
          <p className="mt-6 text-sm leading-relaxed text-gray-400">
            Your ultimate destination for movie lovers. Discover trending movies,
            watch trailers, and stay updated with the latest entertainment news.
            Join us to explore the world of cinema like never before!
          </p>
          <div className="flex items-center gap-3 mt-5">
            <img
              src={assets.googlePlay}
              alt="Google Play"
              className="h-10 w-auto border border-white rounded-lg hover:scale-105 transition"
            />
            <img
              src={assets.appStore}
              alt="App Store"
              className="h-10 w-auto border border-white rounded-lg hover:scale-105 transition"
            />
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h2 className="font-semibold text-lg text-white mb-4">Company</h2>
          <ul className="text-sm space-y-2">
            <li><a href="#" className="hover:text-red-400">Home</a></li>
            <li><a href="#" className="hover:text-red-400">About Us</a></li>
            <li><a href="#" className="hover:text-red-400">Contact Us</a></li>
            <li><a href="#" className="hover:text-red-400">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <h2 className="font-semibold text-lg text-white mb-4">Get in Touch</h2>
          <div className="text-sm space-y-2">
            <p className="hover:text-red-400">+1-234-567-890</p>
            <p className="hover:text-red-400">contact@moviesite.com</p>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="font-semibold text-lg text-white mb-4">Follow Us</h2>
          <div className="flex gap-4 text-gray-300 mb-3">
            <a href="#" className="hover:text-red-400"><Facebook size={22} /></a>
            <a href="#" className="hover:text-red-400"><Instagram size={22} /></a>
            <a href="#" className="hover:text-red-400"><Twitter size={22} /></a>
            <a href="#" className="hover:text-red-400"><Youtube size={22} /></a>
          </div>
          <p className="text-sm text-gray-400">
            Join our community for movie updates, reviews & trailers.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <p className="pt-5 text-center text-sm text-gray-400 border-t border-gray-700 mt-8">
        © {new Date().getFullYear()} ANSH KAUSHAL. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
