import { Rooms } from "../../collections";

Meteor.methods({
  joinerUpdate(roomId, userId) {
    return Rooms.update(
      { _id: roomId },
      {
        $addToSet: { joiner: userId },
      }
    );
  },
});
