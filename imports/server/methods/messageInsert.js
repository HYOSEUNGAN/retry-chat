import { Meteor } from "meteor/meteor";
import { Messages, Rooms } from "/imports/collections";

Meteor.methods({
  messageInsert(data) {
    Rooms.update(
      { _id: data.roomId },
      {
        $set: {
          updateAt: data.createdAt,
          lastUserId: data.userId,
          lastUserName: data.nickName,
          lastUserAvatar: data.avatarImg,
          lastMessage: data.message,
        },
      }
    );
    return Messages.insert(data);
  },
});
