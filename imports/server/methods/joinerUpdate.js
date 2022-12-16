import { Rooms } from '/imports/collections'

Meteor.methods({
  joinerUpdate(roomId, userId) {
    return Rooms.update(
      { _id: roomId },
      {
        $addToSet: { joiner: userId },
      },
    )
  },
})
