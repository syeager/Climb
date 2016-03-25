$(document).ready(function () {

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

$.get("http://localhost:8081/league/listAll",
    null,
    function(data) {
      for (var i = 0; i < data.length; i++) {
        $("#leagues").append('<li>'+data[i].name+'</li>');
      }
    },
    "json");
});