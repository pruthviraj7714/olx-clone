import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">About Us</h4>
            <p className="text-gray-400">
              OLX is a global online marketplace, connecting local buyers and
              sellers in real-time. Find great deals, buy and sell effortlessly.
            </p>
          </div>

          <div className="mb-6 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400">Have questions? Reach out to us:</p>
            <p className="text-gray-400">Email: support@olxclone.com</p>
            <p className="text-gray-400">Phone: +1 234 567 890</p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-white"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-white"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-white"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-400 hover:text-white"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-gray-500">
          &copy; {new Date().getFullYear()} OLX Clone. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
