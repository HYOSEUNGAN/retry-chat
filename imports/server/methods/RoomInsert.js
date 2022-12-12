import { Meteor } from "meteor/meteor";
import { Rooms, Read } from "/imports/collections";

// "rooms": {
//   "_id": "String",
//     "updatedAt": "Date",
//     "lastUserId": "String",
//     "lastUserName": "String",
//     "lastUserAvatar": "String",
//     "lastMessage": "String",
//     "joiner": "Array"
// },
//
// "read": {
//   "_id": "String",
//     "readAt": "Date",
//     "roomId": "String",
//     "userId": "String"
// },
Meteor.methods({
  roomInsert() {
    const time = new Date(); //비교??

    Rooms.insert({
      updateAt: time,
      lastUserId: "",
      lastUserName: "new chat room",
      lastUserAvatar: "",
      lastMessage: "새로운 채팅방이 생성되었습니다",
      joiner: [this.userId], //방 참여자 아이디 추가될 것이므로 ID이다
    });
    const room_id = Rooms.findOne({ updateAt: time })._id; //room_id

    Read.insert({
      readAt: time,
      roomId: room_id,
      userId: this.userId,
    });

    return room_id;
  },
});
