import "./chatRoomPage.html";
import "./chatRoomPage.css";
import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Messages, Rooms } from "../../../collections";
import { Tracker } from 'meteor/tracker'

//입력창 줄바꿈 입력 가능 🚨

// 메세지 리스트 출력 (줄바꿈 적용 필요)
// 본인 오른쪽 (이름/아바타 미노출, 시간 분단위 노출)
// 상대방 왼쪽 (이름/아바타/시간 분단위 노출)

// 시스템 타입 왼쪽 (말풍선/이름/아바타 미노출)

// 방을 생성하면, "000님이 방을 생성"
// 방에 입장하면, "000님 입장"
// 방에서 나가면, "000님 퇴장"
// 뒤로가기/퇴장하기 기능
// 스크롤 하단고정

// window.scrollTo(0, document.body.scrollHeight);

Template.chatRoomPage.onCreated(function () {
  const roomId = FlowRouter.getParam("roomId");
  this.subscribe("chatMessage", roomId);
});



Template.chatRoomPage.onRendered(  function () {
  const user = Meteor.user().profile.nickName;
    const InMessage = user + "님이 입장하셨습니다";
    chatText_Data(InMessage, true);
    const self= this

    //렌더링 되기전
    this.autorun(function(){
      console.log(Messages.find({}).count())

      Tracker.flush()
      const element = self.find(".scroll-box")
      console.log(element)

      const msg_height = element.scrollHeight
      element.scroll(0, msg_height)
      // Tracker.afterFlush(function(){
      // })
    })


});

Template.chatRoomPage.onDestroyed(function () {});

Template.chatRoomPage.helpers({
  Messages() {
    return Messages.find({});
  },
  Messages_location(item) {
    const notice = item.notice;
    Session.set("notice", notice);
    const user = Meteor.userId();
    if (item.userId === user) {
      return "flex-row-reverse";
    }
  },
  Date(item) {
    return item.toLocaleString();
  },
});

Template.chatRoomPage.events({
  "click .Remove"() {
    const roomId = FlowRouter.getParam("roomId");
    const user = Meteor.user().profile.nickName;
    const Text = user + "님이 퇴장하셨습니다";
    chatText_Data(Text, false);
    Meteor.call("roomExit", roomId);
    FlowRouter.go("/roomList");
  },
  "click .Back"() {
    FlowRouter.go("/roomList");
  },
  "submit .textForm"(event, instance) {
    event.preventDefault();
    const Text = instance.find("#textAreaExample3").value;
    chatText_Data(Text, true);

    instance.find("#textAreaExample3").value = "";
  },
  "keyup .textForm"(event, instance) {
    if (event.keyCode === 13) {
      // if (!event.shiftKey) {
        event.preventDefault();
        const Text = instance.find("#textAreaExample3").value;
        chatText_Data(Text, true);
        instance.find("#textAreaExample3").value = "";
      // } else {
      //   // instance.find("#textAreaExample3").replaceAll("\r\n", "<br>"); //🚨DB에서 인식 잘못하는 현상 체크
      // }
    }
  },
});

function chatText_Data(Text, Notice) {
  const createdAt = new Date();
  const notice = Notice;
  const message = Text;
  const userId = Meteor.userId();
  const nickName = Meteor.user().profile.nickName;
  const avatarImg = Meteor.user().profile.avatarImg;
  const roomId = FlowRouter.getParam("roomId");
  const data = {
    createdAt: createdAt,
    notice: notice,
    message: message,
    userId: userId,
    nickName: nickName,
    avatarImg: avatarImg,
    roomId: roomId,
  };
  //메서드콜
  Meteor.call("messageInsert", data);
}
