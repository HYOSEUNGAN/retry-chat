import "./signInPage.html";
import "./signInPage.css";
import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.signInPage.onCreated(function () {});

Template.signInPage.onRendered(function () {});

Template.signInPage.onDestroyed(function () {});

Template.signInPage.helpers({});

Template.signInPage.events({
  "submit #submit-signIn": async function (event) {
    event.preventDefault();

    const target = event.target;
    const username = target.username.value;
    const password = target.password.value;

    Meteor.loginWithPassword(username, password, function (error) {
      if (error) {
        alert(error);
      } else {
        alert("로그인되셨습니다!");
        FlowRouter.go("/roomlist");
      }
    });

    //체크박스
  },
});
