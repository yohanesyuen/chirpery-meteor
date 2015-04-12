
var extractMentionEntitiesFromText = function (text, opts) {
  var mentionRegEx = /(@[a-zA-Z0-9]{1,20})/g;

  mentionsMatch = mentionRegEx.exec(text);

  var mentions = [];

  while (mentionsMatch) {
    var matchedString = mentionsMatch[1];
    var mentionStartIndex = mentionsMatch.index;
    var mentionEndIndex = mentionStartIndex + matchedString.length;

    var username = matchedString.substring(1);

    var mentionedUser = Meteor.users.findOne({username : username});

    var mention = {
      indices : [mentionStartIndex, mentionEndIndex],
      screenName : mentionedUser.username,
      id : mentionedUser._id,
    };

    mentions.push(mention);
    mentionsMatch = mentionsRegEx.exec(text);

  }

  return mentions;
};

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

    entities.userMentions = extractMentionEntitiesFromText(body);

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
