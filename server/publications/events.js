Meteor.publish('events', function () {
  var events = Events.find();

  return events;
});
