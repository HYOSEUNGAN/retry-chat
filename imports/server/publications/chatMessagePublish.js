import { Meteor } from "meteor/meteor";
import { Messages } from "../../collections";

Meteor.publish("chatMessage", function (roomId) {
  console.log(roomId);
  return Messages.find({ roomId });
});
