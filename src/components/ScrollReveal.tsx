import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export const ScrollReveal = ({ children, className, delay = 0, duration = 0.6 }: ScrollRevealProps) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    variants={fadeUp}
  >
    {children}
  </motion.div>
);

export const StaggerContainer = ({ children, className }: { children: ReactNode; className?: string }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    transition={{ staggerChildren: 0.08 }}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className }: { children: ReactNode; className?: string }) => (
  <motion.div
    className={className}
    variants={fadeUp}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);
