import "./chatRoomPage.html";
import "./chatRoomPage.css";
import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Messages, Rooms } from "../../../collections";

//입력창 줄바꿈 입력 가능
// 메세지 리스트 출력 (줄바꿈 적용 필요)
// 본인 오른쪽 (이름/아바타 미노출, 시간 분단위 노출)
// 상대방 왼쪽 (이름/아바타/시간 분단위 노출)
// 시스템 타입 왼쪽 (말풍선/이름/아바타 미노출)

// 방을 생성하면, "000님이 방을 생성"
// 방에 입장하면, "000님 입장"
// 방에서 나가면, "000님 퇴장"
// 뒤로가기/퇴장하기 기능

Template.chatRoomPage.onCreated(function () {
  const roomId = FlowRouter.getParam("roomId");
  this.subscribe("chatMessage", roomId);
});

Template.chatRoomPage.onRendered(function () {
  //메세지 read 업데이트
});

Template.chatRoomPage.onDestroyed(function () {});

Template.chatRoomPage.helpers({
  Messages() {
    console.log(Messages.find({}).fetch());
    return Messages.find({});
  },
});

Template.chatRoomPage.events({
  "click .Back"() {
    FlowRouter.go("/roomList");
  },
  "submit .textForm"(event, instance) {
    event.preventDefault();
    const text = instance.find("#textAreaExample3").value;
    chatText_Data(text);

    instance.find("#textAreaExample3").value = "";
  },
  "keyup .textForm"(event, instance) {
    if (event.keyCode === 13) {
      event.preventDefault();
      const text = instance.find("#textAreaExample3").value;
      chatText_Data(text);
      instance.find("#textAreaExample3").value = "";
    }
  },
});

function chatText_Data(text) {
  const createdAt = new Date();
  const notice = true;
  const message = text;
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
