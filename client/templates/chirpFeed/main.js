Template.chirpFeed.helpers({
  chirps: function () {
    var chirps = Chirps.find({}, {sort: {createdAt: -1}});
    return chirps;
  }
});

Template.chirp.helpers({
  prettyCreationDate: function() {
    console.log(this.createdAt);
    return moment(this.createdAt).fromNow();
  }
});
