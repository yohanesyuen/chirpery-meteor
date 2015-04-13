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

    var mentions = chirpery.txt.extractMentionEntitiesFromText(body);

    entities.userMentions = mentions

    entities['user_mentions'] = mentions;

    var chirp = Chirps.insert({
      owner: Meteor.userId(),
      username: Meteor.user().username,

      body: body,
      entities : entities,
      createdAt: new Date()
    });

    if (mentions.length > 0) {
      for (i in mentions) {
        var mention = mentions[i];
        Events.insert({
          type : 'mention',
          creator : Meteor.userId(),
          recipient : mention.id,
          chirp : chirp,
          viewed : false
        });
      }
    }
  }
});
