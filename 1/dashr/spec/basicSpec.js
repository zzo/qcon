var http = require('http');

describe("A suite", function() {
  it("should respond be alive", function() {
    var done;
    runs(function() {
        var req = http.request("http://localhost:3000", function(response) {
            expect(response.statusCode).toEqual(200);
            response.on('data', function(chunk) {
                console.log(chunk.toString());
                // Welcome to Express
                expect(chunk.toString()).toMatch(/Welcome to Express/);
                done = true;
            });
        });
        req.end();
    });
    waitsFor(function() { return done; }, "Tested body", 5000);
  });
});
