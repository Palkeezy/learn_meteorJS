import './login.html';
import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";

Template.login.onCreated(function () {
    if (Meteor.loggingIn() || Meteor.userId()) {
        FlowRouter.go('App.home');
}});

Template.login.events({
    'click #jsLogin': function (e) {
        let login = $('#loginField').val();
        let password = $('#passwordField').val();
        Meteor.loginWithPassword(login, password, function (e) {
           if (e) {
               toastr['error'](e.reason, 'Authentication error');
               console.log(e.reason);
           } else {
               FlowRouter.go('App.home');
               console.log('success');
           }
        });
    }

});
