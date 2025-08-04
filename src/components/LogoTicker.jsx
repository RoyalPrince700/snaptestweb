import React from "react";
import { motion } from "framer-motion";
import acmeLogo from "../assets/logo-acme.png";
import quantumLogo from "../assets/logo-quantum.png";
import celestialLogo from "../assets/logo-celestial.png";
import pulseLogo from "../assets/logo-pulse.png";
import apexLogo from "../assets/logo-apex.png";
import echoLogo from "../assets/logo-echo.png";

export const LogoTicker = () => {
  return (
    <div className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <motion.div
            className="flex gap-14 flex-none pr-14"
            animate={{
              translateX: "-50%",
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={`logo-set-${i}`}>
                <img
                  src={acmeLogo}
                  alt="Acme Logo"
                  className="logo-ticker-image h-8 w-auto object-contain"
                />
                <img
                  src={quantumLogo}
                  alt="Quantum Logo"
                  className="logo-ticker-image h-8 w-auto object-contain"
                />
                <img
                  src={celestialLogo}
                  alt="Celestial Logo"
                  className="logo-ticker-image h-8 w-auto object-contain"
                />
                <img
                  src={pulseLogo}
                  alt="Pulse Logo"
                  className="logo-ticker-image h-8 w-auto object-contain"
                />
                <img
                  src={apexLogo}
                  alt="Apex Logo"
                  className="logo-ticker-image h-8 w-auto object-contain"
                />
                <img
                  src={echoLogo}
                  alt="Echo Logo"
                  className="logo-ticker-image h-8 w-auto object-contain"
                />
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LogoTicker;