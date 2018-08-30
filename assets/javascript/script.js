var topics = ["cat", "dog", "monkey", "bear", "squirrel", "beaver", "narwhal", "hippo", "gorilla", "cheetah", "alligator", "kangaroo", "snek", "koala"];


function addButtons() {

    $("#buttons-div").empty();

    for (var i = 0; i < topics.length; i++) {

        var a = $("<button>");
        a.addClass("btn btn-primary btn-lg");
        a.attr("type", "button")
        a.attr("data-animal", topics[i]);
        a.text(topics[i]);
        $("#buttons-div").append(a);
    }
}

function displayGifs() {
    console.log("ran displayGifs()");
    $(".btn").on("click", function () {

        var animal = $(this).attr("data-animal");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                var results = response.data;
                console.log(response);
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");
                    gifDiv.addClass("gif-div");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);

                    var animalImage = $("<img>");
                    animalImage.addClass("gif");
                    animalImage.attr("src", results[i].images.fixed_height_still.url);
                    animalImage.attr("data-animate", results[i].images.fixed_height.url);
                    animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                    animalImage.attr("data-state", "still");


                    gifDiv.prepend(p);
                    gifDiv.prepend(animalImage);

                    $("#gif-div").prepend(gifDiv);
                }
            });
    });
}

$("#add-animal").on("click", function (event) {
    event.preventDefault();
    var animal = $("#search-input").val().trim();
    console.log(animal);
    topics.push(animal);
    addButtons();
    displayGifs();
});

function stateToggle() {
    $(".gif").unbind().on("click", function () {
        console.log("registered click");
        var state = $(this).attr("data-state");
        if (state == "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
}

$(document).on("click", ".animal-btn", displayGifs);
$(document).on("click", ".gif", stateToggle);

window.onload = function () {
    addButtons();
    displayGifs();
}
