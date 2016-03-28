$(document).ready(function() {
  $.get(host + "game/listAll",
  null,
  function(data) {
    console.log(data);
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