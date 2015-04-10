Meteor.publish('chirps', function () {
  return Chirps.find();
});
