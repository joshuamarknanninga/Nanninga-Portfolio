$(document).ready(function() {
    // Allow windows to be draggable and resizable
    $(".window").draggable().resizable();

    // Bring window to front when clicked
    $(".window").mousedown(function() {
        $(".window").css("z-index", 0);
        $(this).css("z-index", 1);
    });

    // Minimize window
    $(".minimize").click(function() {
        $(this).closest(".window").find(".window-content").toggle();
    });

    // Maximize window
    $(".maximize").click(function() {
        const windowElement = $(this).closest(".window");
        if (windowElement.hasClass("fullScreen")) {
            windowElement.removeClass("fullScreen");
            windowElement.css({ width: "300px", height: "auto" });
        } else {
            windowElement.addClass("fullScreen");
            windowElement.css({ width: "100vw", height: "100vh" });
        }
    });

    // Close window
    $(".close").click(function() {
        $(this).closest(".window").hide();
    });
});
