Template.chirpFeed.helpers({
  chirps: function () {
    var chirps = Chirps.find({}, {sort: {createdAt: -1}});
    return chirps;
  }
});
