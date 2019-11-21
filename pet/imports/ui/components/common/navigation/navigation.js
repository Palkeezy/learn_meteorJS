import './navigation.html';
import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";

Template.navigation.rendered = function () {

    // Initialize metisMenu
    $('#side-menu').metisMenu();

};

// Used only on OffCanvas layout
Template.navigation.events({
    'click .js-logout': function () {
        Meteor.logout(function () {
            FlowRouter.go('App.login');
        })
    },
    'click .close-canvas-menu': function () {
        $('body').toggleClass("mini-navbar");
    }

});

