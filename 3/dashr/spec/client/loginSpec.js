describe("login", function() {

    var login;

    it("should use defaults", function() {

        setFixtures('\
            <form id="loginForm">\
            <input id="emaillogin" type="text" placeholder="Email" />\
            <input id="passwordlogin" type="password" placeholder="Password" />\
            </form>\
            ');

        var user = 'mark@zzo.com'
            , password = 'mark rox'
            , login = $("#loginForm").login()
        ;

        spyOn($, "ajax");
        $("#emaillogin").val('mark@zzo.com');
        $("#passwordlogin").val('mark rox');
        login.submit();

        var args = $.ajax.mostRecentCall.args[0];
        expect(args.url).toEqual("/user/login");
        expect(args.dataType).toEqual("json");
        expect(args.processData).toBeFalsy();
        expect(args.type).toEqual("POST");
        expect(args.contentType).toEqual("application/json");

        var data = JSON.parse(args.data);
        expect(data.email).toEqual("mark@zzo.com");
        expect(data.password).toEqual("mark rox");
    });

    it("should be configurable", function() {

        setFixtures('\
            <form id="loginfoo">\
            <input id="emailfoo" type="text" placeholder="Email" />\
            <input id="passwordfoo" type="password" placeholder="Password" />\
            </form>\
            ');

        var user = 'mark@zzo.com'
            , password = 'mark rox'
            , foo = $("#loginfoo").login({
                login: "#emailfoo"
                , password: "#passwordfoo"
                , url: '/user/foo'
                , modalId: "#loginfoo"
            })
        ;

        spyOn($, "ajax");
        $("#emailfoo").val('mark@zzo.com');
        $("#passwordfoo").val('mark rox');
        foo.submit();

        var args = $.ajax.mostRecentCall.args[0];
        expect(args.url).toEqual("/user/foo");
        expect(args.dataType).toEqual("json");
        expect(args.processData).toBeFalsy();
        expect(args.type).toEqual("POST");
        expect(args.contentType).toEqual("application/json");

        var data = JSON.parse(args.data);
        expect(data.email).toEqual("mark@zzo.com");
        expect(data.password).toEqual("mark rox");
    });
});

