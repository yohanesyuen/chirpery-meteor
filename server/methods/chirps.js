Meteor.methods({
  'chirps.create' : function(data) {
    if (!Meteor.userId()) {
      throw new Meteor.error('not-authorized');
    }

    Chirps.insert({
      owner: Meteor.userId(),
      username: Meteor.user().username,
      body: data.body,
      createdAt: new Date()
    });
  }
});
