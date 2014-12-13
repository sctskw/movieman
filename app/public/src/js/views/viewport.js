var BaseView = require('./base');
var _ = require('underscore');

/**
 * Class ViewPort
 *
 * This is the main view for the entire application. It will render
 * all the partials onto the document to formulate the view across
 * all page renders. This includes the header, footer, and whatever
 * else makes up the application view.
 *
 */
module.exports = BaseView.extend({

  //render a partial template to document.body
  _renderPartial: function(templateId, data) {
    var tpl= this.$html(templateId); //retrieve html template from DOM
    var template = _.template(tpl); //convert to template func
    this.$('body').append(template(data)); //append tpl to document
    return this;
  },

  //render the header as a partial
  _renderHeader: function() {
    var user = this.getUser();
    this._renderPartial('#tpl-header', {
      username: user.name
    });

    return this;
  },

  //render the footer as a partial
  _renderFooter: function() {
    this._renderPartial('#tpl-footer');
    return this;
  },

  //render viewport
  render: function() {
    console.log('rendering viewport');
    this._renderHeader();
    this._renderFooter();
    return this;
  }
});
