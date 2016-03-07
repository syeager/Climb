$(document).ready(function () {

  logIn(undefined, undefined, function (username) {
    if (username != undefined) {
      showUser(username);
    }
  });

  $('#user-login').submit(function (event) {
    console.log("submit");

    event.preventDefault();

    var email = $('#email').val();
    var password = $('#password').val();
    logIn(email, password, showUser);
  });

});

function showUser(username) {
  console.log("showUser");

  $('#user-login').hide();
  $('#username').show();
  $('#username').text(username);
  $('#signout').show();
}

function signOut() {
  setCookie('email', "", -1);
  setCookie('password', "", -1);
  $('#user-login').show();
  $('#username').hide();
  $('#signout').hide();
}