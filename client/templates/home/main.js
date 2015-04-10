Template.home.helpers({
});
Template.home.events({
  'submit .compose-chirp' : function(event) {
    var data = {}
        target = event.target;
    data.body = target.body.value;
    Meteor.call('chirps.create', data);
    target.value = "";
    return false;
  }
});

Template.newChirpForm.helpers({
  charactersLeft : function () {
    return Template.instance().charactersLeft.get();
  },
  charactersOver : function () {
    return 0 - Template.instance().charactersLeft.get();
  },
  characterLimitExceeded : function () {
    return Template.instance().charactersLeft.get() < 0;
  }
});

Template.newChirpForm.events({
  'keyup .chirp-body' : function(event, template) {
    var bodyLength = event.target.value.length;
    var limit = 140;
    var charLeft = limit - bodyLength;
    Template.instance().charactersLeft.set(limit - bodyLength);
  }
});

Template.newChirpForm.created = function() {
  this.charactersLeft = new ReactiveVar(140);
}
