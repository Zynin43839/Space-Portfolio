import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const btnHover = { y: -2, boxShadow: "0 8px 24px rgba(124,77,255,.35)" };
export const btnTap = { scale: 0.98 };

/** External link / mailto (uses href) */
export function FancyLink({ className = "", children, ...props }) {
  return (
    <motion.a
      className={className}
      whileHover={btnHover}
      whileTap={btnTap}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      {...props}
    >
      {children}
    </motion.a>
  );
}

/** Internal link (React Router: uses to) */
const MotionLink = motion(Link);
export function FancyRouterLink({ className = "", children, ...props }) {
  return (
    <MotionLink
      className={className}
      whileHover={btnHover}
      whileTap={btnTap}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      {...props} // ต้องมี prop: to="/path"
    >
      {children}
    </MotionLink>
  );
}
