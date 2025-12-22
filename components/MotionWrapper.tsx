"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MotionWrapperProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
  mobileDirection?: "up" | "down" | "left" | "right";
  mobileDuration?: number;
}

const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  className = "",
  mobileDirection,
  mobileDuration,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const directionVariants = {
    up: { opacity: 0, y: isMobile ? 50 : 100 },
    down: { opacity: 0, y: isMobile ? -50 : -100 },
    left: { opacity: 0, x: isMobile ? 50 : 100 },
    right: { opacity: 0, x: isMobile ? -50 : -100 },
  };

  const currentDirection =
    isMobile && mobileDirection ? mobileDirection : direction;
  const currentDuration =
    isMobile && mobileDuration ? mobileDuration : duration;

  return (
    <motion.div
      className={className}
      initial={directionVariants[currentDirection]}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{
        once: true,
        amount: isMobile ? 0.2 : 0.3,
        margin: isMobile ? "-50px" : "-100px",
      }}
      transition={{
        duration: currentDuration,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
