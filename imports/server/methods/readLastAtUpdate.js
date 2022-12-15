import { Read } from "/imports/collections";

Meteor.methods({
  readLastAtUpdate(roomId, click_time, userId) {
      return Read.update(
        { roomId: roomId },
        { $set: { readAt: click_time } }
      )
  },
});
