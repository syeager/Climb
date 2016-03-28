$(document).ready(function() {
  $.get(host + "season/listAll",
    null,
    function(data) {
      console.log(data);
    });

  $('#create').click(function(e) {
    var data = new Object();
    data['seasonName'] = $('#seasonName').val();
    data['leagueName'] = $('#leagueName').val();
    data['gameName'] = $('#gameName').val();
    data['adminEmail'] = getCookie('email');

    $.post("http://localhost:8081/season/create",
      data,
      function() {
        location.reload();
      });
  });

  $('#signUp').click(function(e) {
    var data = new Object();
    data['leagueName'] = $('#signUp_leagueName').val();
    data['seasonName'] = $('#signUp_seasonName').val();
    data['email'] = getCookie('email');
    $.post("http://localhost:8081/season/signUp",
      data,
      function() {
        location.reload();
      });
  });
});