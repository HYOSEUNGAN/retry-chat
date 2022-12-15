import { Accounts } from "meteor/accounts-base";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { notUserRedirect, userRedirect } from "/imports/util/routeEnter";

Accounts.onLogin(() => FlowRouter.reload());
Accounts.onLogout(() => FlowRouter.go("signIn"));

FlowRouter.route("/", {
  name: "main",
  triggersEnter: [notUserRedirect, userRedirect],
});
