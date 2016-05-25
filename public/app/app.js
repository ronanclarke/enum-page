(function ($) {

  var app = app || {}
  app.views = {}
  app.collections = {}
  app.models = {}

  var allData = Backbone.Collection.extend({
    model: itemModel
  });
  var itemModel = Backbone.Model.extend({

  });

  //
  // this view manages the searching and updating of the selected results collection
  //
  var SearchView = Backbone.View.extend({
    el: $('#searchView'),


    initialize: function () {
      _.bindAll(this, 'render');


      this.render();
    },

    render: function () {

      var data = window.data;
      console.log(data)
      allData = new Backbone.Collection(data);

      console.log(allData.length);




      $(this.el).append("<ul> <li>hello world</li> </ul>");
    }
  });

  //
  // display the results of the selected enums in this view
  //
  var ResultView = Backbone.View.extend({
    el: $('#resultsView'),

    initialize: function () {
      _.bindAll(this, 'render');

      this.render();
    },

    render: function () {
      $(this.el).append('<div class="col-md-3"> hi there this is the results </div>');
    }
  });

  var resultView = new ResultView();

  var searchView = new SearchView();


})(jQuery);