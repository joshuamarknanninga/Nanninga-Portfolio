// Window.js

import React from 'react';
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';

function Window({ title, isMinimized, isMaximized, onClose, onMinimize, onMaximize, position, onMove, children }) {
  const handleDrag = (e, data) => {
    onMove({ x: data.x, y: data.y });
  };

  return (
    <Draggable
      handle=".window-header"
      bounds="parent"
      position={isMaximized ? { x: 0, y: 0 } : position}
      onStop={handleDrag}
    >
      <motion.div
        className={`window bg-white border shadow-lg ${isMaximized ? 'w-screen h-screen' : 'w-80 h-auto'} 
          ${isMinimized ? 'hidden' : 'block'} p-4 absolute transition-all duration-300`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <div className="window-header bg-green-500 text-white p-2 flex justify-between items-center cursor-move">
          <h2>{title}</h2>
          <div>
            {/* Minimize Button */}
            <img
              src="https://cdn.iconfinder.com/data/icons/feather/24/minimize-512.png"
              alt="Minimize"
              className="w-6 h-6 cursor-pointer inline-block mx-1"
              onClick={onMinimize}
            />
            {/* Maximize Button */}
            <img
              src="https://cdn.iconfinder.com/data/icons/feather/24/maximize-512.png"
              alt="Maximize"
              className="w-6 h-6 cursor-pointer inline-block mx-1"
              onClick={onMaximize}
            />
            {/* Close Button */}
            <img
              src="https://cdn.iconfinder.com/data/icons/feather/24/x-512.png"
              alt="Close"
              className="w-6 h-6 cursor-pointer inline-block mx