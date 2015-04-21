Router.configure({
	layoutTemplate: "main"
});

Router.route('/', function () {
	this.render('index');
	},{fastRender:true}
);

Router.route('/create', function () {
	this.render('createView');
	},{fastRender:true}
);

Router.route('/about', function () {
	this.render('aboutView');
	},{fastRender:true}
);