Router.route('/', function () {
  // this.layout('appLayout');
  this.render('home');
});

// TODO: Actually create the usersProfile view

Router.route('/:user', function () {
  this.render('usersProfile');
}, {name: 'users.profile'});

Router.route('/users', function () {
  this.render('usersList');
}, {name: 'users.list'});
