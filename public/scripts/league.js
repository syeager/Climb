$(document).ready(function() {
  $.get(host + "league/listAll",
    null,
    function(leagues) {
      for (var i = 0; i < leagues.length; i++) {
        var user = document.createElement("li");
        user.innerHTML = JSON.stringify(leagues[i]);
        $("#allLeagues").append(user);
      }
    },
    "json");

  $("#deleteButton").click(function() {
    $.post(host + "league/delete",
      { leagueID: $("#deleteLeague").val() },
      function() {
        location.reload();
      })
  });

  $('#searchLeagueButton').click(function(e) {
    var data = new Object();
    data['leagueName'] = $('#searchLeagueName').val();
    data['userEmail'] = getCookie('email');
    $.post("http://localhost:8081/league/joinMember",
      data,
      function() {
        location.reload();
      });
  });

  $('#create').click(function(e) {
    var data = new Object();
    data['name'] = $('#name').val();
    data['description'] = $('#description').val();
    data['adminEmail'] = getCookie('email');
    console.log(data);

    $.post("http://localhost:8081/league/create",
      data,
      function() {
        location.reload();
      });
  });

  $.get("http://localhost:8081/league/listMemberOf",
    { email: getCookie('email') },
    function(data) {
      for (var i = 0; i < data.length; i++) {
        $("#joinedLeagues").append('<li>' + data[i].name + '</li>');
      }
    });
});