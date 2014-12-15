var BaseView = require('./base');
var _ = require('underscore');

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
    if(!this.validate()){
      $event.preventDefault(); //prevent login
      this.showValidationErrors();
    }
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
    var valid = true;

    if(!this.getUser().val()){
      valid = false;
      this.error('Username cannot be blank');
    }
    if(!this.getPass().val()) {
      valid = false;
      this.error('Password cannot be blank');
    }
    return valid;
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

  //render view
  render: function() {
    this.$el.html(this.$html('#tpl-login-form'));
    return this;
  }
});
