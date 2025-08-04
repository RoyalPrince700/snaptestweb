"use client";
import productImage from "../assets/product-image.png";
import pyramidImage from "../assets/pyramid.png";
import tubeImage from "../assets/tube.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const ProductShowcase = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={sectionRef}
      className="overflow-x-clip bg-gradient-to-b from-[#fff] to-[#D2DCFF] py-24"
    >
      <div className="container">
        <div className="section-heading">
          <div className="flex justify-center">
            <div className="tag">Boost your Productivity</div>
          </div>
          <h2 className="section-title mt-5">
            A more effective way to track progress
          </h2>
          <p className="section-description mt-5">
            Effortlessly turn your ideas into a fully functional, responsive,
            SaaS website in just minutes with this template.
          </p>
        </div>
        <div className="relative">
          <LazyLoadImage
            src={productImage}
            alt="Product Image"
            className="mt-10"
            effect="blur"
          />
          <motion.div
            className="absolute -right-36 -top-32 hidden md:block"
            style={{ translateY }}
          >
            <LazyLoadImage
              src={pyramidImage}
              alt="Pyramid Image"
              width={262}
              height={262}
              effect="blur"
            />
          </motion.div>
          <motion.div
            className="absolute bottom-24 -left-36 hidden md:block"
            style={{ translateY }}
          >
            <LazyLoadImage
              src={tubeImage}
              alt="Tube Image"
              width={248}
              height={248}
              effect="blur"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
