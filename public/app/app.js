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
            _(allData.models).each(function(item){ // in case collection is not empty
                this.appendItem(item);
            }, this);

        },

        appendItem: function(item){

            $("#classList",this.el).append('<li class="list-group-item">' + item.get("ClassName") + "</li>");
        }
    });

    var ResultItemView = Backbone.View.extend({

    });

    var resultView = new ResultView();

    var searchView = new SearchView();


})(jQuery);