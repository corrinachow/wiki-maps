$(window).on("load", () => {
  $("#login").on("click", function(e) {
    e.preventDefault();

    console.log("Login clicked");
    Cookies.set('user_id', '1');
    console.log(Cookies.get('user_id'))
  });

  $("#logout").on("click", function(e) {
    e.preventDefault();

    console.log("Logout clicked");
    Cookies.remove('user_id');
    console.log(Cookies.get('user_id'))
  });

});
