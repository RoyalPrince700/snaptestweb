import React from "react";
import { Link } from "react-router-dom";
import LOGO from "../assets/snaptest-logo.png";
import SocialX from "../assets/social-x.svg?react";
import SocialInsta from "../assets/social-insta.svg?react";
import SocialLinkedIn from "../assets/social-linkedin.svg?react";
import SocialYoutube from "../assets/social-youtube.svg?react";
import SocialPin from "../assets/social-pin.svg?react";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 text-sm text-gray-600">
      <div className="container mx-auto px-4 py-10">
        {/* Logo + Nav */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={LOGO} alt="SnapTest" className="h-8 w-8" />
          </Link>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-4 text-gray-500">
            <Link to="/how-it-works" className="hover:text-indigo-600 transition-colors">
              How It Works
            </Link>
          
            <Link to="/about-us" className="hover:text-indigo-600 transition-colors">
              About
            </Link>
           
          </nav>
        </div>

        {/* Socials */}
        <div className="flex justify-center gap-4 mt-6">
          <Link to="https://x.com/snaptestweb?t=gyXwIIhhHrD_RqT2L0R--w&s=09">
          <SocialX className="h-5 w-5 hover:text-indigo-600 transition-colors" />
          </Link>
          <SocialLinkedIn className="h-5 w-5 hover:text-indigo-600 transition-colors" />
        </div>

        {/* Copyright */}
        <p className="mt-6 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} SnapTest. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
