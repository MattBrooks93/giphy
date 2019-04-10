$(document).ready(function () {


  var topics = [];

  // Pushes new topic to topics array
  $("#add-topic").on("click", function (event) {

    event.preventDefault();

    var topic = $("#topic-input").val().trim();

    topics.push(topic);
  });

  // Creates buttons with topic inside topic array
  $("#add-topic").on("click", function renderButtons() {

    $("#buttons-appear-here").empty();

    for (var i = 0; i < topics.length; i++) {

      var btn = $("<button>");

      btn.addClass("topic btn btn-white mar");

      btn.attr("data-name", topics[i]);

      btn.text(topics[i]);

      $("#buttons-appear-here").append(btn).append(" ");
    }
    $("#topic-input").val('');
  });

  $("#buttons-appear-here").on("click", '.topic', function response() {
    var name = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=PjMOi4vtKzd8NPYAvcV5rv31WZPMhqtD&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(queryURL);

      console.log(response);

      var results = response.data;

      for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var gifDiv = $("<div>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var gifImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        gifImage.attr("src", results[i].images.fixed_height.url);

        // Appending the paragraph and image tag to the animalDiv
        gifDiv.append("<br>");
        gifDiv.append(gifImage);
        gifDiv.append(p);
        

        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifs-appear-here").prepend(gifDiv);
      }
    })
    
  });






})