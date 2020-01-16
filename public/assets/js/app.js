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
    $("#comments").empty();
    var thisId = $(this).attr("data-id");
  
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      .then(function(data) {
        console.log(data);
        $("#comments").append("<h3>" + data.title + "</h3>");
        $("#comments").append("<div class=form-group id=title-input></div>");
        $("#title-input").append("<input id='titleinput' name='title' >");
        $("#comments").append("<div class=form-group id=body-input></div>");
        $("#body-input").append("<textarea id='bodyinput' name='body'></textarea>");
        $("#comments").append("<button type=button class='btn btn-light' data-id='" + data._id + "' id='savecomment'>Save</button>");

        if (data.comment) {
          $("#titleinput").val(data.comment.title);
          $("#bodyinput").val(data.comment.comment);
        }
      });
  });
  
  $(document).on("click", "#savecomment", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        title: $("#titleinput").val(),
        comment: $("#bodyinput").val()
      }
    })
      .then(function(data) {
        console.log(data);
        $("#comments").empty();
      });
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  