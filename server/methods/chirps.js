Meteor.methods({
  'chirps.create' : function(data) {
    if (!Meteor.userId()) {
      throw new Meteor.error('not-authorized');
    }

    if (data.body.length > 140) {
      throw new Meteor.error('Too many characters!');
    }

    Chirps.insert({
      owner: Meteor.userId(),
      username: Meteor.user().username,
      body: data.body,
      createdAt: new Date()
    });
  }
});
