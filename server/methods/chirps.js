Meteor.methods({
  'chirps.create' : function(data) {

    var body = data.body;

    if (!Meteor.userId()) {
      throw new Meteor.error('not-authorized');
    }

    if (body.length > 140) {
      throw new Meteor.error('Too many characters!');
    }

    var entities = {};

    entities.userMentions = chirpery.txt.extractMentionEntitiesFromText(body);

    entities['user_mentions'] = chirpery.txt.extractMentionEntitiesFromText(body);

    console.log(JSON.stringify(mentions));

    Chirps.insert({
      owner: Meteor.userId(),
      username: Meteor.user().username,

      body: body,
      entities : entities,
      createdAt: new Date()
    });
  }
});
