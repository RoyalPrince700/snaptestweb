import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ArrowRight from "../assets/arrow-right.svg?react";
import startImage from "../assets/star.png";
import springImage from "../assets/spring.png";

export const CallToAction = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  
  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-white to-[#d2dcff] py-24 overflow-x-clip"
    >
      <div className="container mx-auto px-4">
        <div className="section-heading relative">
          <h2 className="section-title text-4xl font-bold text-center">
            Sign up for free
          </h2>
          <p className="section-description mt-5 text-center text-lg max-w-2xl mx-auto">
            Celebrate the joy of accomplishment with an app designed to track
            your progress and motivate your efforts.
          </p>
          <motion.img
            src={startImage}
            alt="Star Image"
            className="absolute w-[360px] -left-[350px] -top-[137px] hidden md:block"
            style={{
              translateY,
            }}
          />
          <motion.img
            src={springImage}
            alt="Spring Image"
            className="absolute w-[360px] -right-[331px] -top-[19px] hidden md:block"
            style={{
              translateY,
            }}
          />
        </div>
        <div className="flex gap-4 mt-10 justify-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Get for free
          </button>
          <button className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition-colors">
            <span>Learn more</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;