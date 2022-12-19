import "./signInPage.html";
import "./signInPage.css";
import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.signInPage.onCreated(function () {});

Template.signInPage.onRendered(function () {
  if (localStorage.getItem("userId")) {
    document.getElementById("flexCheckDefault").checked = true;
  }
});
Template.signInPage.onDestroyed(function () {});

Template.signInPage.helpers({
  rememberId() {
    return localStorage.getItem("userId");
  },
});

Template.signInPage.events({
  "submit #submit-signIn": function (event) {
    event.preventDefault();
    const target = event.target;
    const username = target.username.value;
    const password = target.password.value;
    const checkbox = document.getElementById("flexCheckDefault")
    const is_checked = checkbox.checked;


    Meteor.loginWithPassword(username, password, function (error) {
      if (error) {
        document.getElementById('submit-signIn').classList.add('was-validated')
        alert(error);
      }else if (is_checked){
        const username = Meteor.user().username;
        const email = Meteor.user().email
        if(!email){
          localStorage.setItem("userId", username);
        }else{
          localStorage.setItem("userId", email);
        }
      }
      else {
        alert("로그인되셨습니다!");
        localStorage.removeItem("userId");
      }
      FlowRouter.go("/roomlist");
    });

    //체크박스
  },
});

