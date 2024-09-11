$(document).ready(function() {
    const minimizedHeight = [];
    const minimizedWidth = [];

    // Initialize windows functionality
    $(".window").draggable({ cancel: ".wincontent" });
    $(".wincontent").resizable();

    // Activate the clicked window
    $(".window").mousedown(function() {
        makeWindowActive($(this).attr("data-id"));
    });

    // Close window function
    $(".winclose").click(function() {
        const windowId = $(this).closest(".window").attr("data-id");
        closeWindow(windowId);
    });

    // Minimize window function
    $(".winminimize").click(function() {
        const windowId = $(this).closest(".window").attr("data-id");
        minimizeWindow(windowId);
    });

    // Maximize window function
    $(".winmaximize").click(function() {
        const windowElement = $(this).closest(".window");
        const windowId = windowElement.attr("data-id");

        if (windowElement.hasClass('fullSizeWindow')) {
            windowElement.removeClass('fullSizeWindow');
            windowElement.find(".wincontent").height(minimizedHeight[windowId]);
            windowElement.find(".wincontent").width(minimizedWidth[windowId]);
        } else {
            windowElement.addClass('fullSizeWindow');
            minimizedHeight[windowId] = windowElement.find(".wincontent").height();
            minimizedWidth[windowId] = windowElement.find(".wincontent").width();
            adjustFullScreenSize();
        }
    });

    // Handle the taskbar click to minimize or restore windows
    $(".taskbarPanel").click(function() {
        const windowId = $(this).attr("data-id");
        if ($(this).hasClass("activeTab")) {
            minimizeWindow(windowId);
        } else if ($(this).hasClass("minimizedTab")) {
            openMinimized(windowId);
        } else {
            makeWindowActive(windowId);
        }
    });

    // Function to adjust window size to fit the screen
    function adjustFullScreenSize() {
        $(".fullSizeWindow").css({
            width: $(window).width(),
            height: $(window).height()
        });
    }

    // Handle form submission for contact window
    $("#contactForm").submit(function(event) {
        event.preventDefault();
        alert("Your message has been sent!");
        // Here you can handle form data submission (AJAX or other)
        $(this)[0].reset(); // Reset the form fields
    });
});
