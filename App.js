import React, { useState } from 'react';
import Window from './Window';
import './tailwind.css';

// Utility function to generate random positions based on the viewport dimensions
const getRandomPosition = () => {
  const x = Math.floor(Math.random() * (window.innerWidth - 350)); // Window width assumed to be 350px
  const y = Math.floor(Math.random() * (window.innerHeight - 250)); // Window height assumed to be 250px
  return { x, y };
};

function App() {
  // Initial window states with visibility, minimized/maximized, and random positions
  const initialWindowState = {
    window1: { visible: true, minimized: false, maximized: false, position: getRandomPosition() },
    window2: { visible: true, minimized: false, maximized: false, position: getRandomPosition() },
    window3: { visible: true, minimized: false, maximized: false, position: getRandomPosition() },
    window4: { visible: true, minimized: false, maximized: false, position: getRandomPosition() },
  };

  // State to manage window states
  const [windows, setWindows] = useState(initialWindowState);

  const toggleWindow = (windowId, action) => {
    setWindows((prevWindows) => {
      const currentWindow = prevWindows[windowId];
      switch (action) {
        case 'close':
          return {
            ...prevWindows,
            [windowId]: { ...currentWindow, visible: false },
          };
        case 'minimize':
          return { ...prevWindows, [windowId]: { ...currentWindow, minimized: !currentWindow.minimized } };
        case 'maximize':
          return { ...prevWindows, [windowId]: { ...currentWindow, maximized: !currentWindow.maximized } };
        case 'reopen':
          return {
            ...prevWindows,
            [windowId]: {
              ...currentWindow,
              visible: true,
              minimized: false,
              maximized: false,
              position: getRandomPosition(), // Reposition window on reopen
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

  return (
    <div className="h-screen bg-gradient-to-br from-gray-200 to-gray-500 relative">
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
            onClose={() => toggleWindow(windowId, 'close')}
            onMinimize={() => toggleWindow(windowId, 'minimize')}
            onMaximize={() => toggleWindow(windowId, 'maximize')}
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

      {/* Reset Windows Link */}
      <div className="absolute bottom-5 left-5">
        <a
          href="#"
          onClick={resetWindows}
          className="bg-red-500 text-white p-2 rounded shadow-lg"
        >
          Reset All Windows
        </a>
      </div>
    </div>
  );
}

export default App;
