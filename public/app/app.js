(function ($) {

  var app = app || {}
  app.views = {}
  app.collections = {}
  app.models = {}

  var allData = Backbone.Collection.extend({
    model: itemModel
  });

  var data = window.data;
  console.log(data)
  var allData = new Backbone.Collection(data);

  var filteredData = new Backbone.Collection({});
  filteredData.reset()
  filteredData.add(allData.models[1].get("enumItems")[0]);
  filteredData.add(allData.models[1].get("enumItems")[1]);
  filteredData.add(allData.models[1].get("enumItems")[2]);
  filteredData.add(allData.models[1].get("enumItems")[3]);
  filteredData.add(allData.models[1].get("enumItems")[4]);

  window.f = filteredData

  console.log(allData.length);

  var itemModel = Backbone.Model.extend({});

  //
  // this view manages the searching and updating of the selected results collection
  //
  var SearchView = Backbone.View.extend({
    el: $('#searchView'),


    initialize: function () {
      _.bindAll(this, 'render');


      this.render();
    },


  });


  var PinnedView = Backbone.View.extend({
    el: $('#pinnedView'),

    initialize: function () {
      _.bindAll(this, 'render');

      this.listenTo(filteredData,'all',this.render);

      this.render();
    },

    render: function () {

      this.$el.html("");
      console.log('rendering pinnedview')
      _(filteredData.models).each(function (item) { // in case collection is not empty

        var out = new PinnedItemView({model: item}).render().el;

        this.$el.append(out);
      }, this);

      return this;
    }
  });

  var PinnedItemView = Backbone.View.extend({

    tagName: "div",
    attributes: {
      class: "col-md-4"
    },

    events:{
      "click .panel-title":"removeMe"
    },
    removeMe:function(){
      this.model.destroy();
    },
    initialize: function () {
      _.bindAll(this, 'render');


    },


    render: function () {

      var tmp = _.template($("#pinnedItemTemplate").html());

      console.log(this.model.get('enumName'))

      $(this.el).html(tmp({pinnedItem: this.model, enumItems: this.model.get("enumItems")}));


      return this;
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
      _(allData.models).each(function (item) { // in case collection is not empty
        //this.appendItem(item);
        $("#classList", this.el).append(new ResultItemView({model: item}).render().el);
      }, this);

      return this;
    },

  });

  var ResultItemView = Backbone.View.extend({

    tagName: "div",
    attributes: {
      class: "panel panel-default"
    },

    events:{
      "click button":"addToPinned"
    },

    addToPinned:function(e){
      var enumName = ($(e.currentTarget).attr("id")).replace("btn_","");
      _.each(this.model.get("enumItems"),function(item){
        if(item.enumName == enumName){
          filteredData.add(item);
          return;
        }
      });
    },

    initialize: function () {
      _.bindAll(this, 'render');
    },


    render: function () {

      var tmp = _.template($("#resultItemTemplate").html());
      var idToUse = this.model.get("ClassName").replace(/\./g, "_");

      $(this.el).html(tmp({resultItem: this.model, id: idToUse, enumItems: this.model.get("enumItems")}));


      return this;
    }
  });

  var resultView = new ResultView();
  var pinnedView = new PinnedView();
  var searchView = new SearchView();


})(jQuery);