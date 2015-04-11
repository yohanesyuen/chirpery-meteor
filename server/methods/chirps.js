Meteor.methods({
  'chirps.create' : function(data) {
    if (!Meteor.userId()) {
      throw new Meteor.error('not-authorized');
    }

    if (data.body.length > 140) {
      throw new Meteor.error('Too many characters!');
    }

    var mentionsRegEx = /(@[a-zA-Z0-9]{1,20})/g;

    var mentions = [];

    mentionsMatch = mentionsRegEx.exec(data.body);

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
      mentionsMatch = mentionsRegEx.exec(data.body);

    }

    console.log(JSON.stringify(mentions));

    Chirps.insert({
      owner: Meteor.userId(),
      username: Meteor.user().username,
      body: data.body,
      userMentions : mentions,
      createdAt: new Date()
    });
  }
});
