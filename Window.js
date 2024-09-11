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
            <button className="bg-yellow-500 text-white px-2" onClick={onMinimize}>-</button>
            <button className="bg-blue-500 text-white px-2" onClick={onMaximize}>[]</button>
            <button className="bg-red-500 text-white px-2" onClick={onClose}>x</button>
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
