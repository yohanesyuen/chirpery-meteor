Meteor.publish('users', function () {
  return Meteor.users.find({
    fields : {
      username : 1,
      _id : 1,
      createdAt : 1
    }
  });
});
