# MeanStack-Template
MeanStack Template
This is the starter template for **MEAN STACK**

# starter
General purpose basic template for mean stack. The following npms are used to build this template

1. everyauth
2. mongojs
3. crypto
4. redis
5. express-session
6. redis
7. connect-redis

To start the server
* `npm start`

Before starting the server, redis & mongoDB must be running
* `redis-server`
* `mongod`

Folder Structure
```
-starter
|-bin
|-node_modules
|-public
  |-images
  |-javascripts
    |-controllers
      commonCtrl.js
      indexCtrl.js
      logCtrl.js
  |-libraries
    |-angular
    |-bootstrap
    |-font-awesome
    |-jquery
  |-stylesheets
  |-templates
    |-common
      navBar.html
|-routes
  |-utilities
    auth.js
  customModel.js
  customView.js
|-views
  error.ejs
  index.ejs
  login.ejs
  register.ejs
app.js
package.json
```

