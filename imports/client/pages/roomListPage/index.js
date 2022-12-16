import './roomListPage.html'
import './roomListPage.css'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
import { Template } from 'meteor/templating'
import { Rooms, Read, Messages } from '/imports/collections'

Template.roomListPage.onCreated(function() {
  const userId = Meteor.userId()
  this.subscribe('roomList')
  this.subscribe('read', userId)
})

Template.roomListPage.onRendered(function() {
})

Template.roomListPage.onDestroyed(function() {
})

Template.roomListPage.helpers({
  roomList() {
    return Rooms.find({}, { sort: { updatedAt: -1 } })
  },
  getDate(date) {
    return date.toLocaleString()
  },
  isJoin(joiner) {
    const userId = Meteor.userId()

    return joiner.includes(userId) ? 'Join' : 'no Join'
  },
  isRead(roomId) {
    // const read = Read.findOne({ roomId: roomId });
    const rooms = Rooms.findOne({ _id: roomId })
    const read = Read.findOne({ roomId: roomId })
    if (read) {
      return read.readAt <= rooms.updatedAt ? 'Read' : 'no Read'
    }
    else {
      return 'First'
    }
  },
})

Template.roomListPage.events({
  'click .logout'() {
    FlowRouter.go('/signOutPage')
    Meteor.logout()
  },
  'click .room'() {
    const data = {
      lastUserId: Meteor.userId(),
      lastUserName: Meteor.user().profile.nickName,
      lastUserAvatar: Meteor.user().profile.avatarImg,
    }
    Meteor.call('roomInsert', data, function(err, result) {
      if (err) {
        alert(err)
      }
      else {
        FlowRouter.go('/chatRoom/' + result)
      }
    })
    const user = Meteor.user().profile.nickName
    const outMessage = user + '님이 방을 생성하셨습니다'
    chatText_Data(outMessage)
  },

  //✅헬퍼에서 This는 데이터 컨택스트이다 => #with로 특정 컨텍스트 데이터 지정
  'click li'() {
    const userId = Meteor.userId()
    const roomId = this._id
    const click_time = new Date()
    Meteor.call('joinerUpdate', roomId, userId)
    Meteor.call('readLastAtUpdate', roomId, click_time, userId)
    alert('✅채팅방 입장완료')
    FlowRouter.go('/chatRoom/' + roomId)
  },
})

function chatText_Data(text) {
  const createdAt = new Date()
  const notice = true
  const message = text
  const userId = Meteor.userId()
  const nickName = Meteor.user().profile.nickName
  const avatarImg = Meteor.user().profile.avatarImg


  const data = {
    createdAt: createdAt,
    notice: notice,
    message: message,
    userId: userId,
    nickName: nickName,
    avatarImg: avatarImg,
  }
  //메서드콜
  Meteor.call('messageInsert', data)
}
