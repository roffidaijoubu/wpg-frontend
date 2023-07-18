$(document).ready(function () {

    const scrollContainer = $('.scroll-container');

    // Function to enable drag scrolling on desktop
    function enableDragScroll() {
        let isDragging = false;
        let startX, scrollLeft;

        scrollContainer.mousedown(function (e) {
            isDragging = true;
            startX = e.pageX - scrollContainer.offset().left;
            scrollLeft = scrollContainer.scrollLeft();
            scrollContainer.addClass('dragging');
        });

        $(document).mouseup(function () {
            isDragging = false;
            scrollContainer.removeClass('dragging');
        });

        $(document).mousemove(function (e) {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offset().left;
            const walk = (x - startX) * 2; // Adjust scrolling speed
            scrollContainer.scrollLeft(scrollLeft - walk);
        });
    }

    // Call the function to enable drag scrolling
    enableDragScroll();

    // Function to get the average color of the outer pixels of an image
    function getAverageColor(imageSrc) {
        var img = new Image();
        img.crossOrigin = "Anonymous"; // Enable CORS to prevent security issues
        img.src = imageSrc;

        img.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;

            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            var pixelData = ctx
                .getImageData(0, 0, img.width, img.height)
                .data;
            var totalPixels = 5 * img.width * 4 + 5 * img.height * 4;

            var sumRed = 0,
                sumGreen = 0,
                sumBlue = 0;

            // Iterate through the outer pixels and sum up the color components
            for (var i = 0; i < totalPixels; i += 4) {
                sumRed += pixelData[i];
                sumGreen += pixelData[i + 1];
                sumBlue += pixelData[i + 2];
            }

            // Calculate the average color components
            var avgRed = Math.floor(sumRed / totalPixels);
            var avgGreen = Math.floor(sumGreen / totalPixels);
            var avgBlue = Math.floor(sumBlue / totalPixels);

            // Convert RGB to HEX format
            var avgColorHex = "#" + (
                (1 << 24) + (avgRed << 16) + (avgGreen << 8) + avgBlue)
                .toString(16)
                .slice(1);

            // Set the average color as the background of the #main-banner div
            $('#main-banner').css('background-color', avgColorHex);
        };
    }

    // Get the image source from the img element inside #main-banner and call the getAverageColor function with it
    var imageSrc = $('#main-banner img').attr('src');
    getAverageColor(imageSrc);

    // Function to calculate darker color
    function getDarkerColor(hex, amount) {
        // Convert HEX to RGB
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        // Calculate the darker color components
        const darkerR = Math.max(r - amount, 0);
        const darkerG = Math.max(g - amount, 0);
        const darkerB = Math.max(b - amount, 0);

        // Convert darker RGB to HEX format
        return "#" + ((1 << 24) + (darkerR << 16) + (darkerG << 8) + darkerB).toString(16).slice(1);
    }

    // Starting color #D1DBE1
    let currentColor = "#D1DBE1";
    const amount = 20; // Adjust this value to control the darkness increment

    // Loop through each .category-box and set the background color
    $('.category-box').each(function () {
        $(this).css('background-color', currentColor);
        currentColor = getDarkerColor(currentColor, amount);
    });
});