(function (global) {
  if ( typeof chirpery  === 'undefined' || chirpery === null) {
    var chirpery = {};
  }

  chirpery.txt = {};

  chirpery.txt.linkToMention = function(entity, text, options) {
    var at = text.substring(entity.indices[0], entity.indices[0] + 1);
    var user = entity.screenName;

    var displayScreenName = text.substring(entity.indices[0], entity.indices[1]);

    return '<a href="/' + user + '">' + displayScreenName + '</a>';
  };

  chirpery.txt.autoLinkMentions = function(text, entities, options) {
    var userMentions = entities.userMentions;

    var startIndex = 0;
    var result = "";

    for (i in userMentions) {
      var mention = userMentions[i];
      result += text.substring(startIndex, mention.indices[0]);
      result += this.linkToMention(mention, text);
      startIndex = mention.indices[1];
    }

    result += text.substring(startIndex, text.length);

    return result;
  };

  chirpery.txt.extractMentionEntitiesFromText = function (text, opts) {
    var mentionRegEx = /(@[a-zA-Z0-9]{1,20})/g;

    mentionsMatch = mentionRegEx.exec(text);

    var mentions = [];

    while (mentionsMatch) {
      var matchedString = mentionsMatch[1];
      var mentionStartIndex = mentionsMatch.index;
      var mentionEndIndex = mentionStartIndex + matchedString.length;

      var username = matchedString.substring(1);

      var mentionedUser = Meteor.users.findOne({username : username});

      if ( mentionedUser ) {

        var mention = {
          indices : [mentionStartIndex, mentionEndIndex],
          screenName : mentionedUser.username,
          id : mentionedUser._id,
        };

        mentions.push(mention);
      }

      mentionsMatch = mentionRegEx.exec(text);

    }

    return mentions;
  };

  global.chirpery = chirpery;
})(this);
