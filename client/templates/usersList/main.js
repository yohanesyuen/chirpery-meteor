Template.usersList.helpers({
  users: function () {
    var users = Meteor.users.find({});
    console.log(users);
    return users;
  }
});
