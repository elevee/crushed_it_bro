(function() {

	window.App = {
		Models: {},
		Collections: {},
		Views: {}
	};

	window.template = function(id) {
		return _.template( $('#' + id).html() );
	};

	App.Models.Task = Backbone.Model.extend({
		validate: function(attrs){
			if ( ! $.trim(attrs.title) ) {        //trim helps us cover multiple spaces on an empty title
				return 'Please enter a valid title';
			}
		}
	});

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

		initialize: function(){
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.remove, this);
		},

		template: template('taskTemplate'),

		events: {
			'click .edit': 'edit',
			'click .delete': 'destroy' 
		},

		edit: function(){
			var newTitle = prompt("What would you like to change the task to?", this.model.get('title'))
			

			if (! newTitle) return; //We have the validate method, but ensuring no falsey values get through.


			this.model.set('title', newTitle, {validate: true});
		},

		destroy: function(){
			var confirmation = confirm("You sure you ain't cray?");
			if (confirmation) {
				console.log(confirmation);
				this.model.destroy();
				console.log(tasksCollection);
			}
		},

		remove: function(){
			this.$el.remove();
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

	$('.task_list').html(tasksView.render().el)

})();