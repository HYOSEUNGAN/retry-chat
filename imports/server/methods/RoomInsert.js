import { Meteor } from 'meteor/meteor'
import { Rooms, Read } from '/imports/collections'

Meteor.methods({
  roomInsert(data) {
    const time = new Date()
    Rooms.insert({
      updatedAt: time,
      lastUserId: data.lastUserId,
      lastUserName: data.lastUserName,
      lastUserAvatar: data.lastUserAvatar,
      lastMessage: '새로운 채팅방이 생성되었습니다',
      joiner: [this.userId], //방 참여자 아이디 추가될 것이므로 ID이다
    },function result(error){
     if(error){
       throw new error('roomInsert check')
     }else{
       const room_id = Rooms.findOne({ updatedAt: time })._id //room_id
       Read.insert({
         readAt: time,
         roomId: room_id,
         userId: this.userId,
       })
       return room_id
     }
    })
  },
})


// Meteor.methods({
//   roomInsert(data) {
//     const time = new Date()
//     Rooms.insert({
//       updatedAt: time,
//       lastUserId: data.lastUserId,
//       lastUserName: data.lastUserName,
//       lastUserAvatar: data.lastUserAvatar,
//       lastMessage: '새로운 채팅방이 생성되었습니다',
//       joiner: [this.userId], //방 참여자 아이디 추가될 것이므로 ID이다
//     },function result(error){
//       if(error){
//         throw new error('roomInsert check')
//       }else{
//         const room_id = Rooms.findOne({ updatedAt: time })._id //room_id
//         Read.insert({
//           readAt: time,
//           roomId: room_id,
//           userId: this.userId,
//         })
//         return room_id
//       }
//     })
//   },
// })
