import { Read } from "../../collections";
import { Meteor } from "meteor/meteor";

Meteor.publish("read", function (user_id) {
  return Read.find({ userId: user_id });
});