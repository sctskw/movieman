var BaseView = require('./base');
var _ = require('underscore');

var headerTpl = require('./templates/header.jade');
var footerTpl = require('./templates/footer.jade');

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

  initialize: function(cfg) {
    this.initConfigs(cfg);
    this.setElement('body'); //attach to document.body
  },

  //render a partial template to document.body
  _renderPartial: function(templateFunc, data) {
    this.$el.append(templateFunc(data || {})); //append tpl to document
    return this;
  },

  //render the header as a partial
  _renderHeader: function() {
    this._renderPartial(headerTpl, {
      username: this.getUserName()
    });

    return this;
  },

  //render the footer as a partial
  _renderFooter: function() {
    this._renderPartial(footerTpl);
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
