import './chatRoomPage.html'
import './chatRoomPage.css'
import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
import { Messages, Rooms } from '/imports/collections'


Template.chatRoomPage.onCreated(function() {
  const roomId = FlowRouter.getParam('roomId')
  this.subscribe('chatMessage', roomId)
})

Template.chatRoomPage.onRendered(function() {
  const user = Meteor.user()?.profile?.nickName
  const InMessage = user + '님이 입장하셨습니다'

  // Meteor.call('messageInsert2', data)
  chatText_Data(InMessage, true) //🚨새로고침 에러

  const self = this
  this.autorun(function() {
    console.log("새로고침 오토런")
    const Cursor = Messages.find({}).count()
    const element = self.find('.scroll-box')
    const msg_height = element.scrollHeight
    element.scroll(0, msg_height)
  })
})

Template.chatRoomPage.onCreated(function () {
  const roomId = FlowRouter.getParam("roomId");
  this.subscribe("chatMessage", roomId);
});

Template.chatRoomPage.helpers({
  Messages() {
    return Messages.find({})
  },
  Messages_location(item) {
    const user = Meteor.userId()
    if (item.userId === user) {
      return 'flex-row-reverse'
    }
  },
  Date(item) {
    // const Date = new Date()
    if(item.getMonth()){
      const getMonth = item.getMonth() + 1
      return getMonth + '월' + item.getDate() + '일' + item.getHours() + '시' + item.getMinutes() + '분'
    }else{
      return ""
    }
  },
})

Template.chatRoomPage.events({
  'click .Remove'() {
    const roomId = FlowRouter.getParam('roomId')
    const user = Meteor.user().profile.nickName
    const Text = user + '님이 퇴장하셨습니다'
    chatText_Data(Text, true)
    Meteor.call('roomExit', roomId)
    FlowRouter.go('/roomList')
  },
  'click .Back'() {
    FlowRouter.go('/roomList')
  },
  'submit .textForm'(event, instance) {
    event.preventDefault()
    const Text = instance.find('#textArea').value
    chatText_Data(Text, false)
    instance.find('#textArea').value = ''
  },
  'keyup #textArea'(event, instance) {
    if (event.keyCode === 13 && event.shiftKey && !'') {
      event.preventDefault()
      const text = instance.find('#textArea').value
      text.replaceAll('\r\n')
    }
    else if (event.keyCode === 13 && instance.find('#textArea').value !== '\n') {
      event.preventDefault()
      const Text = instance.find('#textArea').value
      chatText_Data(Text, false)
      instance.find('#textArea').value = ''
    }
    else {
      return ''
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
  Meteor.call('messageInsert', data)

}


