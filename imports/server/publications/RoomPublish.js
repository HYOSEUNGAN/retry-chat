import { Meteor } from "meteor/meteor";
import { Rooms } from "/imports/collections";

Meteor.publish("roomList", function (check) {
  return Rooms.find({});
});
