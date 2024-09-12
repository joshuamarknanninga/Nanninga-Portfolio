import React from 'react';
import Draggable from 'react-draggable'; // For draggable functionality

function Window({ title, isMinimized, isMaximized, onClose, onMinimize, onMaximize, position, onMove, children }) {
  const handleDrag = (e, data) => {
    onMove({ x: data.x, y: data.y });
  };

  return (
    <Draggable handle=".window-header" bounds="parent" position={position} onStop={handleDrag}>
      <div
        className={`window bg-white border shadow-lg ${isMaximized ? 'w-screen h-screen' : 'w-80 h-auto'} 
          ${isMinimized ? 'hidden' : 'block'} p-4 absolute`}
      >
        <div className="window-header bg-green-500 text-white p-2 flex justify-between items-center cursor-move">
          <h2>{title}</h2>
          <div>
            {/* Minimize Button */}
            <img
              src="https://cdn.iconfinder.com/data/icons/feather/24/minimize-512.png" // Minimize Icon URL
              alt="Minimize"
              className="w-6 h-6 cursor-pointer inline-block mx-1"
              onClick={onMinimize}
            />

            {/* Maximize Button */}
            <img
              src="https://cdn.iconfinder.com/data/icons/feather/24/maximize-512.png" // Maximize Icon URL
              alt="Maximize"
              className="w-6 h-6 cursor-pointer inline-block mx-1"
              onClick={onMaximize}
            />

            {/* Close Button */}
            <img
              src="https://cdn.iconfinder.com/data/icons/feather/24/x-512.png" // Close Icon URL
              alt="Close"
              className="w-6 h-6 cursor-pointer inline-block mx-1"
              onClick={onClose}
            />
          </div>
        </div>
        <div className="window-content p-4">
          {children}
        </div>
      </div>
    </Draggable>
  );
}

export default Window;
