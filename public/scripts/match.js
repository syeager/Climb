var leagues = new Array();
var seasons = new Array();
var users = new Array();

$(document).ready(function() {


  $("#leagues").change(function() {
    updateSeasonsDropDown();
  });

  $.get(host + "user/getID",
    { userEmail: getCookie('email') },
    function(userID) {
      console.log(userID);
      $.get(host + "league/membersLeague",
        { userID: userID },
        function(leagueList) {
          leagues = leagueList;
          for (var i = 0; i < leagues.length; i++) {
            var option = document.createElement("option");
            option.innerHTML = leagues[i].name;
            option.setAttribute("value", leagues[i]._id);
            $("#leagues").append(option);
          }

          updateSeasonsDropDown();
        });

      $.get(host + "season/listParticipantOf",
        { userID: userID },
        function(seasonList) {
          seasons = seasonList;
          updateSeasonsDropDown();
        });

      $.get(host + "user/listAll",
        null,
        function(userList) {
          users = userList;
          updatePlayersDropDown();
        });
    }
  );

  $('#create').click(function(e) {
    var data = new Object();
    data['seasonName'] = $('#seasonName').val();
    data['leagueName'] = $('#leagueName').val();
    data['gameName'] = $('#gameName').val();
    data['adminEmail'] = getCookie('email');

    $.post(host + "match/create",
      data,
      function() {
        location.reload();
      });
  });
});

var updateSeasonsDropDown = function() {
  var leagueID = $("#leagues").val();
  $("#seasons").empty();

  for (var i = 0; i < seasons.length; i++) {
    if (seasons[i].league != leagueID) {
      continue;
    }
    var option = document.createElement("option");
    option.innerHTML = seasons[i].name;
    option.setAttribute("value", seasons[i]._id);
    $("#seasons").append(option);
  }
}

var updatePlayersDropDown = function() {
  var seasonID = $("#seasons").val();
  var season = $.grep(seasons, function(s) {return s._id == seasonID})[0];

  for(var i = 0; i < season.participants.length; i++) {
    var userID = season.participants[i];
    var username;
    for (var j = 0; j < users.length; j++) {
      console.log(users[j])
      if (users[j]._id == userID) {
        username = users[j].name;
        break;
      }
    }

    var option1 = document.createElement("option");
    option1.innerHTML = username;
    option1.setAttribute("value", userID);
    $("#player1").append(option1);

    var option2 = document.createElement("option");
    option2.innerHTML = username;
    option2.setAttribute("value", userID);
    $("#player2").append(option2);
  }
}