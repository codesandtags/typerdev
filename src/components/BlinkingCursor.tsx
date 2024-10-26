import React from 'react';
import { motion } from 'framer-motion';

const BlinkingCursor: React.FC = () => {
  return (
    <motion.span
      className="bg-typerdev-yellow mt-2"
      style={{
        display: 'inline-block',
        width: '14px',
        height: '1em',
        position: 'relative',
        top: '0.125em',
      }}
      animate={{ opacity: [0, 1] }}
      transition={{ repeat: Infinity, duration: 0.8 }}
    />
  );
};

export default BlinkingCursor;
