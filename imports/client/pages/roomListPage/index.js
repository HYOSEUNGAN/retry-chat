import "./roomListPage.html";
import "./roomListPage.css";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Template } from "meteor/templating";
import { Rooms, Read } from "../../../collections";

//Rooms✅
//1명 이상 참여중인 방 리스트 노출  => 데이터 지움
//채팅방 생성/입장 => 입장은 했는데 데이터 수정해야함
//읽음/안읽음/참여/미참여 표시 => isRead, isJoin

Template.roomListPage.onCreated(function () {
  const userId = Meteor.userId();
  const self = this;

  self.subscribe("roomList");
  // self.autorun(function () {
  this.subscribe("read", userId);
  // });
});

Template.roomListPage.onRendered(function () {});

Template.roomListPage.onDestroyed(function () {});

Template.roomListPage.helpers({
  roomList() {
    return Rooms.find({}, { sort: { updatedAt: -1 } });
  },
  getDate(date) {
    return date.toLocaleString();
  },
  isJoin(joiner) {
    const userId = Meteor.userId();

    return joiner.includes(userId) ? "Join" : "no Join";
  },
  isRead(roomId) {
    // const read = Read.findOne({ roomId: roomId });
    const rooms = Rooms.findOne({ _id: roomId });
    const read = Read.findOne({ roomId: roomId });
    if (read) {
      return read?.readAt >= rooms.updatedAt ? "Read" : "no Read";
    } else {
      return "First";
    }
  },
});

Template.roomListPage.events({
  "click .logout"() {
    Meteor.logout();
  },
  "click .room"() {
    Meteor.call("roomInsert", (err, room_id) => {
      err ? alert(err) : FlowRouter.go("/chatRoom/" + room_id);
    });
  },

  //✅헬퍼에서 This는 데이터 컨택스트이다 => #with로 특정 컨텍스트 데이터 지정
  "click  li"() {
    const userId = Meteor.userId();
    const roomId = this._id;
    const click_time = new Date();
    //joinerUpdate, readLastAtUpdate 메서드 필요
    //리드데이터 변경
    //방 참여자 변경
    Meteor.call("joinerUpdate", roomId, userId);
    Meteor.call("readLastAtUpdate", roomId, click_time, userId);
    alert("✅채팅방 입장완료");
    FlowRouter.go("/chatRoom/" + roomId);
  },
});
