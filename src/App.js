// App.js

import React, { useState } from 'react';
import Window from './components/Window';
import StartMenu from './components/StartMenu';
import './tailwind.css';

// Utility function to generate random positions
const getRandomPosition = () => {
  const x = Math.floor(Math.random() * (window.innerWidth - 350));
  const y = Math.floor(Math.random() * (window.innerHeight - 250));
  return { x, y };
};

function App() {
  // Initial window states
  const initialWindowState = {
    window1: { visible: true, minimized: false, maximized: false, position: getRandomPosition() },
    window2: { visible: true, minimized: false, maximized: false, position: getRandomPosition() },
    window3: { visible: true, minimized: false, maximized: false, position: getRandomPosition() },
    window4: { visible: true, minimized: false, maximized: false, position: getRandomPosition() },
  };

  // State management
  const [windows, setWindows] = useState(initialWindowState);

  // Function to toggle windows
  const toggleWindow = (windowId, action) => {
    setWindows((prevWindows) => {
      const currentWindow = prevWindows[windowId];
      switch (action.type) {
        case 'close':
          return {
            ...prevWindows,
            [windowId]: { ...currentWindow, visible: false },
          };
        case 'minimize':
          return {
            ...prevWindows,
            [windowId]: { ...currentWindow, minimized: !currentWindow.minimized },
          };
        case 'maximize':
          return {
            ...prevWindows,
            [windowId]: { ...currentWindow, maximized: !currentWindow.maximized },
          };
        case 'reopen':
          return {
            ...prevWindows,
            [windowId]: {
              ...currentWindow,
              visible: true,
              minimized: false,
              maximized: false,
              position: getRandomPosition(),
            },
          };
        case 'move':
          return {
            ...prevWindows,
            [windowId]: { ...currentWindow, position: action.payload },
          };
        default:
          return prevWindows;
      }
    });
  };

  // Function to reset all windows
  const resetWindows = () => {
    setWindows({
      window1: { visible: true, minimized: false, maximized: false, position: getRandomPosition() },
      window2: { visible: true, minimized: false, maximized: false, position: getRandomPosition() },
      window3: { visible: true, minimized: false, maximized: false, position: getRandomPosition() },
      window4: { visible: true, minimized: false, maximized: false, position: getRandomPosition() },
    });
  };

  // Return statement inside the App function
  return (
    <div className="h-screen bg-gradient-to-br from-gray-200 to-gray-500 relative">
      {/* Dark Mode Toggle */}
      <div className="flex justify-end p-4">
        <button
          id="theme-toggle"
          className="bg-gray-800 text-white py-2 px-4 rounded"
          onClick={() => document.body.classList.toggle('dark')}
        >
          Toggle Dark Mode
        </button>
      </div>

      {/* Render each window component */}
      {Object.keys(windows).map((windowId) => (
        windows[windowId].visible && (
          <Window
            key={windowId}
            windowId={windowId}
            title={windowId.replace('window', 'Window ')}
            isMinimized={windows[windowId].minimized}
            isMaximized={windows[windowId].maximized}
            position={windows[windowId].position}
            onClose={() => toggleWindow(windowId, { type: 'close' })}
            onMinimize={() => toggleWindow(windowId, { type: 'minimize' })}
            onMaximize={() => toggleWindow(windowId, { type: 'maximize' })}
            onMove={(position) => toggleWindow(windowId, { type: 'move', payload: position })}
          >
            {/* Window content */}
            {windowId === 'window1' && <p>Welcome to my portfolio! This window contains information about me.</p>}
            {windowId === 'window2' && (
              <ul>
                <li>Project 1: Interactive Portfolio</li>
                <li>Project 2: Web Development Tools</li>
              </ul>
            )}
            {windowId === 'window3' && <p>Download my <a href="#">Resume</a></p>}
            {windowId === 'window4' && (
              <form>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" className="border" required />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" className="border" required />
                <label htmlFor="message">Message:</label>
                <textarea id="message" rows="5" className="border" required></textarea>
                <button type="submit" className="bg-green-500 text-white p-2 mt-2">Send</button>
              </form>
            )}
          </Window>
        )
      ))}

      {/* Taskbar to manage closed windows */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-800 p-2 flex justify-center space-x-4">
        {Object.keys(windows).map((windowId) => (
          !windows[windowId].visible && (
            <button
              key={windowId}
              onClick={() => toggleWindow(windowId, { type: 'reopen' })}
              className="bg-gray-600 text-white px-3 py-1 rounded shadow hover:bg-gray-700 transition flex items-center"
            >
              {windowId.replace('window', 'Window ')}
            </button>
          )
        ))}
        <button
          onClick={resetWindows}
          className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600 transition flex items-center"
        >
          Reset All
        </button>
      </div>

      {/* Start Menu (Optional Enhancement) */}
      <StartMenu windows={windows} toggleWindow={toggleWindow} />
    </div>
  );
}

export default App;
