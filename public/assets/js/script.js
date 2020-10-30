$(function() {

    // User can submit a new burger
    $(".create-burger").on("submit", function(event) {
        event.preventDefault();

        // Create a new burger which will then be sent to the back-end
        const newBurger = {
            burger_name: $("#burger-input").val(),
            // The 0 is equivalent to "false"
            devoured: 0
        };

        console.log(newBurger);
        // Send the POST request
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function() {
            console.log("Added a new burger!");
            // Reload the page to get an updated list
            location.reload();
        });
    });

    // If a user clicks on a "Devour it!" button, then the burger will move to the devour side.
    $(".devour-button").on("click", function(event) {
        event.preventDefault();

        const id = $(this).data("id");

        const newEatenState = {
            devoured: true
        };

        // Send the PUT request
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newEatenState
        }).then(function() {
            console.log("Changed eaten state to true");
            // Reload the page to get the updated list
            location.reload();
        });

    });
});