import { Meteor } from "meteor/meteor";
import { Messages, Rooms } from "../../collections";

Meteor.methods({
  roomExit(roomId) {
    // Messages.update({ roomId: roomId }, { $set: { notice: false } });

    return Rooms.update({ _id: roomId }, { $pull: { joiner: this.userId } });
  },
});
