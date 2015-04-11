Template.chirpItem.helpers({
  prettyCreationDate: function () {
    console.log(this.createdAt);
    return moment(this.createdAt).fromNow();
  },

  formattedChirpBody: function () {
    var formattedBody = this.body;
    var mentions = this.userMentions;

    for (i in mentions) {
      var mention = mentions[i],
          mentionStartIndex = mention.indices[0],
          mentionEndIndex = mention.indices[1];
      var leftHTML = formattedBody.substring(0, mentionStartIndex);
      var rightHTML = formattedBody.substring(mentionEndIndex);
      var mentionString = formattedBody.substring(mentionStartIndex, mentionEndIndex);
      console.log(mention);
      var mentionHTML = '<a href="/users/' + mention.screenName + '">' + mentionString + '</a>'
      formattedBody = leftHTML + mentionHTML + rightHTML;
    }

    return formattedBody;
  }
});
