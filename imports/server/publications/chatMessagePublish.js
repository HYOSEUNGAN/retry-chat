import { Meteor } from "meteor/meteor";
import { Messages } from "../../collections";

Meteor.publish("chatMessage", function (roomId) {
  return Messages.find({  $or : [ { roomId : roomId }, { roomId : "first" } ] });
});
