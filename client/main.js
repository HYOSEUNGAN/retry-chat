import { Meteor } from "meteor/meteor";
import "./main.html";
import "/imports/collections";
import "/imports/client";
import "/imports/routes";
import "bootstrap";

Meteor.startup(function () {
  // Meteor.setTimeout(callAI, 5000);
});

function callAI() {
  const next = Math.floor(Math.random() * 3000) + 7000;

  Meteor.userId() && Meteor.call("_ai");
  Meteor.setTimeout(callAI, next);
}
