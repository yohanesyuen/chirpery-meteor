var txt = chirpery.txt;

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

    formattedBody = txt.autoLinkMentions(text, entities);

    return formattedBody;
  }
});
