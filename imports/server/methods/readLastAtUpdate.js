import { Read, Rooms } from '/imports/collections'

Meteor.methods({
  readLastAtUpdate(roomId, userId) {
    const click_time = new Date()
    return Read.update(
      { roomId: roomId },
      { $set: { readAt: click_time, userId: userId } },
    )
  },
})
