function test() {
  console.log("Testing!");
  $.get("http://localhost:8081/user/test");
}


function logIn(email, password, onComplete) {
  console.log("logIn");
  if (email == undefined) {
    email = getCookie("email");
    password = getCookie("password");
  }

  if (email == "" || password == "") {
    onComplete(undefined);
    return;
  }
    setCookie("email", email, 30);
    setCookie("password", password, 30);

   $.post("http://localhost:8081/user/logIn",
    {
      email: email,
      password: password
    },
    onComplete,
    "text");
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}