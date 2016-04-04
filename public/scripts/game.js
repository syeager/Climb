$(document).ready(function() {
  $.get(host + "game/listAll",
    null,
    function(games) {
      for (var i = 0; i < games.length; i++) {
        var user = document.createElement("li");
        user.innerHTML = JSON.stringify(games[i]);
        $("#allGames").append(user);
      }
    },
    "json");

  $("#deleteButton").click(function() {
    $.post(host + "game/delete",
      { leagueID: $("#deleteGame").val() },
      function() {
        location.reload();
      })
  });

  $('#create').click(function(e) {
    var data = new Object();
    data['name'] = $('#name').val();

    $.post("http://localhost:8081/game/create",
      data,
      function() {
        location.reload();
      });
  });
});