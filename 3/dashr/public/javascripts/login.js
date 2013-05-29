(function( $ ) {

    $.fn.login = function(options) { 

        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            login: "#email"
            , password: "#password"
            , url: '/userLogin'
            , success: loginOK
            , error: loginFailed
        }, options );


        function collectFormValues() {
            return {
                email: $(settings.login).val()
                    , password: $(settings.password).val()
            };
        }   

        function tryToLogin(vals) {
            $.ajax({
                url: settings.url
                , dataType: 'json'
                , processData: false
                , type: 'POST'
                , contentType: 'application/json'
                , data: JSON.stringify(vals)
                , success: function(data, status, jqXHR) { settings.success(data, status); }
                , error: function(jqXHR, status, err) { settings.error(status, err); }
            });
        }

        function loginOK(data) {
            console.log('loginOK');
            console.log(data);

            if (data.error) {
                loginFailed(data.error);
            } else {
                // login success!
            }
        }

        function loginFailed(errorStatus, httpError) {
            console.log('loginFailed');
            console.log(errorStatus);
            console.log(httpError);
        }

        this.on("submit", function(event) {
            event.preventDefault();
            tryToLogin(collectFormValues());
        });

        /*
           $("#register").click(function(event) {
           event.preventDefault();
           console.log('REGISTER');
           });
           */

        return this;
    };

})( jQuery );
