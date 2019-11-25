import './users-list-com.html';
import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";

Template.usersListCom.onCreated(function () {
    this.subscribe('users.all');
});

Template.usersListCom.helpers({
    users() {
        return Meteor.users.find();
    },
    getEmail() {
        return this.emails[0].address;
    }
});
