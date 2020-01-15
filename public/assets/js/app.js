$(document).on("click", "#scrape", function() {
    $.ajax({
        method: "GET",
        url: "/scrape"
    })
    .then(function(data) {
        console.log("scrape complete")
        location.reload();
    })
});
  
  
  // Whenever someone clicks a p tag
  $(document).on("click", ".comment",  function() {
    console.log("click");
    // Empty the notes from the note section
    $("#comments").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $("#comments").append("<h3>" + data.title + "</h3>");
        // An input to enter a new title
        $("#comments").append("<div class=form-group id=title-input></div>");
        $("#title-input").append("<input id='titleinput' name='title' >");
        $("#comments").append("<div class=form-group id=body-input></div>");
        // A textarea to add a new note body
        $("#body-input").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#comments").append("<button type=button class='btn btn-light' data-id='" + data._id + "' id='savecomment'>Save</button>");
  
        // If there's a note in the article
        if (data.comment) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.comment.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.comment.comment);
        }
      });
  });
  
  $(document).on("click", "#savecomment", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        comment: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#comments").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  