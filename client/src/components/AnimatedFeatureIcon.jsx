// AnimatedFeatureIcon.jsx
import React from 'react';
import { motion } from 'framer-motion';
const AnimatedFeatureIcon = ({ icon, color }) => {
    return (
      <motion.div
        className="relative"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        {icon}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-purple-300"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border border-purple-200"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.5,
          }}
        />
      </motion.div>
    );
  };
  
 export default AnimatedFeatureIcon;