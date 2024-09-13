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

        document.addEventListener('mouseu