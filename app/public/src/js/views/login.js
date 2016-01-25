var BaseView = require('./base');
var _ = require('underscore');
var jQuery = require('jQuery');
var Promise = require('bluebird');
var tpl = require('./templates/login-form.jade');
var greetingTpl = require('./templates/login-greeting.jade');

//Class LoginView
//shows the login form
module.exports = BaseView.extend({

  userSelector: 'input[type="text"]',
  passSelector: 'input[type="password"]',
  errorSelector: '#errors',

  errors: [],

  events: {
    "submit": "onLogin",
    "change input": "hardReset"
  },

  initialize: function(cfg) {
    this.initConfigs(cfg);
  },

  //reset error messages
  reset: function(flushEl) {
    this.errors = [];

    //remove elements from DOM
    if(flushEl){
      this.getErrors().html('');
    }
  },

  //reset errors and flush DOM
  hardReset: function() {
    this.reset(true);
  },

  //perform login event
  onLogin: function($event) {
    self = this;
    console.log('$event is', $event);
    console.log('onLogin hit');
    $event.preventDefault(); //prevent login
    this.validate().then(function(){
      var username = self.getUser().val();
      var password = self.getPass().val();
      var user = {
        username: username,
        password: password,
      };
      jQuery.post('/login', user);
      // Still super hacky way of doing this
      // TODO Implement session based auth
      window.location = "/";
    }).catch(function(err){
      self.showValidationErrors();
    });


  },

  //add an error to list of errors
  error: function(msg) {
    this.errors.push(msg);
    return this;
  },

  //return username from input
  getUser: function() {
    return this.$el.find(this.userSelector);
  },

  //return password from input
  getPass: function() {
    return this.$el.find(this.passSelector);
  },

  //return errors el
  getErrors: function() {
    return this.$el.find(this.errorSelector);
  },

  //validate the form fields
  validate: function() {
    var self = this;
    var valid = true;
    var username = this.getUser().val();
    var password = this.getPass().val();
    var user = {
      username: username,
      password: password,
    };

    return new Promise(function(resolve, reject){
      if(!username){
        valid = false;
        self.error('Username cannot be blank');
      }

      if(!password) {
        valid = false;
        self.error('Password cannot be blank');
      }

      if (!valid){
        return reject('invalid form fields');
      }
      jQuery.post('/api/login', user ,function(data){
          return resolve(true);
      }).error(function(){
          self.error('invalid username and password combination');
          return reject('Invalid passwords');
      });
    });
  },

  //display the current errors in the DOM
  showValidationErrors: function() {
    var self = this;
    var errors = this.getErrors();

    //loop through errors and add them to the DOM
    _.each(this.errors, function(msg) {
      var el = self.$('<li />').html(msg);
      errors.append(el);
    });

    this.reset(); //purge error list
  },

  renderGreeting: function() {
    this.$el.append(greetingTpl());
    return this;
  },

  //render view
  render: function() {
    this.$el.append(tpl());
    this.renderGreeting();
    return this;
  }
});
