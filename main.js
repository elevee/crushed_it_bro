(function() {

	window.App = {
		Models: {},
		Collections: {},
		Views: {}
	};

	window.template = function(id) {
		return _.template( $('#' + id).html() );
	};

	App.Models.Task = Backbone.Model.extend({});

	App.Collections.Tasks = Backbone.Collection.extend({
		model: App.Models.Task

	});

	App.Views.Tasks = Backbone.View.extend({
		tagName: 'ul', 
		
		render: function() {
			this.collection.each(this.addOne, this);

			return this;
		},

		addOne: function(task){
			//creating a new child view
			var taskView = new App.Views.Task({ model: task });
			
			//append to the root element
			this.$el.append(taskView.render().el);
		}

	})

	App.Views.Task = Backbone.View.extend({
		tagName: 'li',

		template: template('taskTemplate'),

		events: {

		},

		render: function(){
			var template = this.template( this.model.toJSON() ); 

			this.$el.html( template );
			return this;
		}

	});


	var tasksCollection = new App.Collections.Tasks([
		{
			title: "Go to the Apple store",
			priority: 4
		},
		{
			title: "Get a brocut",
			priority: 2
		},
		{
			title: "Go to the bro bar",
			priority: 5
		}
		
	]);

	var tasksView = new App.Views.Tasks({
		collection: tasksCollection
	});

	console.log(tasksView.el);
	$('.task_list').html(tasksView.render().el)

})();