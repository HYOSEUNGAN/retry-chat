import "./roomListPage.html";
import "./roomListPage.css";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { Template } from "meteor/templating";

//Rooms✅
//1.펍섭부르기 2.메서드콜로 Roomid 3.

Template.roomListPage.onCreated(function () {
  const self = this;
  const check = "hey";
  self.subscribe("roomList", check);
});

Template.roomListPage.onRendered(function () {});

Template.roomListPage.onDestroyed(function () {});

Template.roomListPage.helpers({});

Template.roomListPage.events({
  "click .logout"() {
    Meteor.logout();
  },
  "click .room"() {
    Meteor.call("roomInsert");
    // FlowRouter.go("/chatRoom/:roomId")
  },
});
