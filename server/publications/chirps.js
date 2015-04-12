Meteor.publish('chirps', function () {
  var chirps = Chirps.find();

  return chirps;
});
