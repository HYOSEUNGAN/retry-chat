import './chatRoomPage.html'
import './chatRoomPage.css'
import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
import { Messages, Rooms } from '/imports/collections'
import { Tracker } from 'meteor/tracker'

Template.chatRoomPage.onCreated(function() {
  const roomId = FlowRouter.getParam('roomId')
  this.subscribe('chatMessage', roomId)
})

Template.chatRoomPage.onRendered(function() {
  const user = Meteor.user()?.profile.nickName  //데이터 없음
  const InMessage = user + '님이 입장하셨습니다'
  chatText_Data(InMessage, true)
  const self = this
  this.autorun( function() {
    const Cursor = Messages.find().fetch()  //autorun cursor
    const element =  self.find('.scroll-box')
    const msg_height =  element.scrollHeight
    element.scroll(0, msg_height)
  })

})

Template.chatRoomPage.onDestroyed(function() {
})

Template.chatRoomPage.helpers({
  Messages() {
    return Messages.find({})
  },
  Messages_location(item) {
    const notice = item.notice
    Session.set('notice', notice)
    const user = Meteor.userId()
    if (item.userId === user) {
      return 'flex-row-reverse'
    }
  },
  Date(item) {
    const getMonth = item.getMonth() + 1
    return getMonth + '월' + item.getDate() + '일' + item.getHours() + '시' + item.getMinutes() + '분'
  },
})


Template.chatRoomPage.events({
  'click .Remove'() {
    const roomId = FlowRouter.getParam('roomId')
    const user = Meteor.user().profile.nickName
    const Text = user + '님이 퇴장하셨습니다'
    chatText_Data(Text, false)
    Meteor.call('roomExit', roomId)
    FlowRouter.go('/roomList')
  },
  'click .Back'() {
    FlowRouter.go('/roomList')
  },
  'submit .textForm'(event, instance) {
    event.preventDefault()
    const Text = instance.find('#textAreaExample3').value
    chatText_Data(Text, true)
    instance.find('#textAreaExample3').value = ''
  },
  'keyup .textForm'(event, instance) {
    if (event.keyCode === 13 && event.shiftKey) {
      event.preventDefault()
      const text = instance.find('#textAreaExample3').value
      text.replaceAll('\r\n', '<br>')
    }
    else if(event.keyCode === 13){
        event.preventDefault()
        const Text = instance.find('#textAreaExample3').value
        chatText_Data(Text, true)
        instance.find('#textAreaExample3').value = ''
    }else{
    }


  },
})

function chatText_Data(Text, Notice) {
  const createdAt = new Date()
  const notice = Notice
  const message = Text
  const userId = Meteor.userId()
  const nickName = Meteor.user().profile.nickName
  const avatarImg = Meteor.user().profile.avatarImg
  const roomId = FlowRouter.getParam('roomId')
  const data = {
    createdAt: createdAt,
    notice: notice,
    message: message,
    userId: userId,
    nickName: nickName,
    avatarImg: avatarImg,
    roomId: roomId,
  }
  //메서드콜
  Meteor.call('messageInsert', data)
}
