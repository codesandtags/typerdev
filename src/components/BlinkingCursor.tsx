import React from 'react';
import { motion } from 'framer-motion';

const BlinkingCursor: React.FC = () => {
  return (
    <motion.span
      className="mt-2 bg-yellow-200"
      style={{
        display: 'inline-block',
        width: '2px',
        height: '1em',
        position: 'absolute',
        top: '-0.4rem',
        left: '0',
      }}
      animate={{ opacity: [0, 1] }}
      transition={{ repeat: Infinity, duration: 0.8 }}
    />
  );
};

export default BlinkingCursor;
