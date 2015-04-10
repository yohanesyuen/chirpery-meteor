Router.route('/', function () {
  // this.layout('appLayout');
  this.render('home');
});

Router.route('/users', function () {
  this.render('usersList');
});
