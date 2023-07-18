function setupDropdown(hasDropdownSelector, dropdownSelector) {
    var dropdownTimer; // Timer variable to track the delay

    // Event listener when cursor leaves .has-dropdown
    $(hasDropdownSelector).mouseleave(function () {
        // Set a new timeout to check if cursor is back inside after 0.5 second
        dropdownTimer = setTimeout(function () {
            if (!$(hasDropdownSelector).is(':hover')) {
                // If the cursor is not back inside .has-dropdown, remove active class from .dropdown
                $(dropdownSelector).removeClass('active');
            }
        }, 300);
    });

    // Event listener when cursor enters .has-dropdown
    $(hasDropdownSelector).mouseenter(function () {
        // If the cursor enters .has-dropdown, clear the timeout (if exists)
        clearTimeout(dropdownTimer);
    });
}

$(document).ready(function () {
    function updateSelectImage(selectElement) {
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        const image = selectedOption.getAttribute('data-image');
        $(selectElement).css('background-image', `url(${image})`);
    }

    const selectElement = $('#language-select');
    updateSelectImage(selectElement[0]); // Set the image on page load

    selectElement.on('change', function () {
        updateSelectImage(this); // Set the image whenever the select value changes
    });

    setupDropdown('.has-dropdown', '.dropdown');

    // toggle dropdown on click
    $('.has-dropdown').hover(function () {
        $(this).find('.dropdown').toggleClass('active');
    });

    // when .hovered is hovered, toggle active class on it. But if it has data-self and the data-self is hovered, keep it active
    $('.hovered').hover(function () {
        $(this).toggleClass('active');
    });





    // when data-self is hovered, show the element with the same data-parent
    $('[data-self]').hover(
        function () {
            const self = $(this).data('self');

            $(`[data-parent]`).removeClass('active');
            $(`[data-parent="${self}"]`).addClass('active');

        }, function () {
            const self = $(this).data('self');

            $(`[data-parent="${self}"]`).removeClass('active');
        }
    );

    // when data-parent is hovered keep the element active
    $('[data-parent]').hover(
        function () {
            const parent = $(this).data('parent');
            $(this).addClass('active');
        },
        function () {
            const parent = $(this).data('parent');
            $(this).removeClass('active');
        }
    );

    
});