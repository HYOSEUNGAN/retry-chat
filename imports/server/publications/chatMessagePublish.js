import { Meteor } from 'meteor/meteor'
import { Messages } from '/imports/collections'

Meteor.publish('chatMessage', function(roomId) {
  return Messages.find({ roomId: roomId })
})
