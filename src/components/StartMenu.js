// StartMenu.js

import React, { useState } from 'react';

function StartMenu({ windows, toggleWindow }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div className="absolute bottom-16 left-5">
      <button
        onClick={handleToggle}
        className="bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-600 transition"
      >
        Start
      </button>
      {isOpen && (
        <div className="mt-2 bg-gray-700 text-white p-2 rounded shadow-lg">
          {Object.keys(windows).map((windowId) => (
            <div key={windowId} className="mb-1">
              <button
                onClick={() => {
                  toggleWindow(windowId, { type: 'reopen' });
                  setIsOpen(false);
                }}
                className="w-full text-left px-2 py-1 hover:bg-gray-600 transition"
              >
                {windowId.replace('window', 'Window ')}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StartMenu;
