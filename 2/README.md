grunt!
sudo npm install -g grunt-cli
npm install grunt --save-dev
npm install grunt-contrib-jshint --save-dev
create Gruntfile.js
grunt
npm install grunt-contrib-jasmine --save-dev
change package.json -> 'grunt test'
edit Gruntfile.js:     grunt.registerTask('test', ['jshint', 'jasmine']);
edit Gruntfile.js:     add jasmine section
edit Gruntfile.js:     load plugin
move spec into a 'server' 'client' dirs


npm install grunt-jasmine-node --save-dev
edit Gruntfile.js:     load plugin
edit Gruntfile.js:     grunt.registerTask('test', ['jshint', 'jasmine', 'jasmine_node']);
edit Gruntfile.js:     add jasmine_node section
edit index.dust to add login.js script & jquery & html/dustjs
edit public/javascripts/login.js to add login logic
edit spec/client/loginSpec.js to add tests!


# step 3!
#edit app.js to be loaded as a module for grunt-express
#install grunt-express --save-dev
#edit Gruntfile.js for grunt-express

