var linkToMention = function(entity, text, options) {
  var at = text.substring(entity.indices[0], entity.indices[0] + 1);
  var user = entity.screenName;

  var displayScreenName = text.substring(entity.indices[0], entity.indices[1]);

  return '<a href="/' + user + '">' + displayScreenName + '</a>';
};

Template.chirpItem.helpers({
  prettyCreationDate: function () {
    console.log(this.createdAt);
    return moment(this.createdAt).fromNow();
  },

  formattedChirpBody: function () {
    var text = this.body;
    var formattedBody = "";
    var entities = this.entities;

    // TODO: Possibly create a package for this to be uploaded to the atmosphere?
    // TODO: refactor these functionalities to another library? They do not belong here
    // TODO: extract all entities into an array and work with them as such
    var userMentions = entities.userMentions; // This is an ugly way of extracting

    var startIndex = 0;

    for (i in userMentions) {
      var mention = userMentions[i];
      formattedBody += text.substring(startIndex, mention.indices[0]);
      formattedBody += linkToMention(mention, text);
      startIndex = mention.indices[1];
    }

    return formattedBody;
  }
});
