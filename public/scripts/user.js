$(document).ready(function() {
  $.get(host + "user/listAll",
    null,
    function(users) {
      for (var i = 0; i < users.length; i++) {
        var user = document.createElement("li");
        user.innerHTML = JSON.stringify(users[i]);
        $("#users").append(user);
      }
    });

  $("#deleteButton").click(function() {
    $.post(host + "user/delete",
      { userID: $("#deleteUser").val() },
      function() {
        location.reload();
      })
  });
});