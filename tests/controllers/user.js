// Log In
//  right email, right password
//  right email, wrong password
//  wrong email, right password
//  wrong email, wrong password

describe("Log In", function () {
  it("Logs in.", function () {
    var email = "yeagz7@gmail.com";
    var password = "knight42";
    logIn(email, password, function (username) {
      expect(username).toEqual("boyBlue_");
    });
  });
});