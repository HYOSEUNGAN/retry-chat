import { Meteor } from "meteor/meteor";
import { Rooms } from "/imports/collections";

Meteor.publish("roomList", function (check) {
  console.log(check);
  return Rooms.find({});
});
