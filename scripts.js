// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    const windows = document.querySelectorAll('.window');

    windows.forEach(windowElement => {
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        const header = windowElement.querySelector('.window-header');

        // Dragging functionality
        header.addEventListener('mousedown', function(e) {
            isDragging = true;
            offsetX = e.clientX - windowElement.offsetLeft;
            offsetY = e.clientY - windowElement.offsetTop;
            windowElement.style.position = 'absolute';
            windowElement.style.zIndex = 1;
        });

        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                windowElement.style.left = (e.clientX - offsetX) + 'px';
                windowElement.style.top = (e.clientY - offsetY) + 'px';
            }
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
        });

        // Bring window to front when clicked
        windowElement.addEventListener('mousedown', function() {
            windows.forEach(w => w.style.zIndex = 0);
            windowElement.style.zIndex = 1;
        });

        // Minimize window
        const minimizeBtn = windowElement.querySelector('.minimize');
        minimizeBtn.addEventListener('click', function() {
            const content = windowElement.querySelector('.window-content');
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
        });

        // Maximize window
        const maximizeBtn = windowElement.querySelector('.maximize');
        maximizeBtn.addEventListener('click', function() {
            if (windowElement.classList.contains('fullScreen')) {
                windowElement.classList.remove('fullScreen');
                windowElement.style.width = '300px';
                windowElement.style.height = 'auto';
                windowElement.style.left = '0';
                windowElement.style.top = '0';
            } else {
                windowElement.classList.add('fullScreen');
                windowElement.style.width = '100vw';
                windowElement.style.height = '100vh';
                windowElement.style.left = '0';
                windowElement.style.top = '0';
            }
        });

        // Close window
        const closeBtn = windowElement.querySelector('.close');
        closeBtn.addEventListener('click', function() {
            windowElement.style.display = 'none';
        });
    });
});
