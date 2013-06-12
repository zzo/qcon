describe("login", function() {

  var login;

  beforeEach(function() {
  });

  it("make a basic ajax call", function() {
    setFixtures('\
        <form id="loginForm">\
            <input id="email" type="text" placeholder="Email" />\
            <input id="password" type="password" placeholder="Password" />\
            <button id="login">Sign in</button>\
            <button id="register">Register</button>\
        </form>\
    ');

    login = $("#loginForm").login();
    spyOn($, "ajax");
    $("#email").val('mark@zzo.com');
    $("#password").val('mark rox');
    login.submit();
    var args = $.ajax.mostRecentCall.args[0];
    expect(args.url).toEqual("/userLogin");
    expect(args.dataType).toEqual("json");
    expect(args.processData).toBeFalsy();
    expect(args.type).toEqual("POST");
    expect(args.contentType).toEqual("application/json");

    var data = JSON.parse(args.data);
    expect(data.email).toEqual("mark@zzo.com");
    expect(data.password).toEqual("mark rox");
  });

  it("make a basic ajax call", function() {
    setFixtures('\
        <form id="loginForm">\
            <input id="login" type="text" placeholder="Email" />\
            <input id="pass" type="password" placeholder="Password" />\
            <button id="login">Sign in</button>\
            <button id="register">Register</button>\
        </form>\
    ');


    login = $("#loginForm").login({
        url: '/mark'
        , login: '#login'
        , password: '#pass'
        , success: function(data) { 
            /* I WAS CALLED! */ 
            expect(data.data).toEqual(22);
        }
    });

    spyOn($, "ajax");
    $("#login").val('qcon');
    $("#pass").val('2013');
    login.submit();

    var args = $.ajax.mostRecentCall.args[0];
    expect(args.url).toEqual("/mark");
    expect(args.dataType).toEqual("json");
    expect(args.processData).toBeFalsy();
    expect(args.type).toEqual("POST");
    expect(args.contentType).toEqual("application/json");

    var data = JSON.parse(args.data);
    expect(data.email).toEqual("qcon");
    expect(data.password).toEqual("2013");

    args.success({ data: 22 });
  });

});

