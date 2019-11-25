import { Meteor } from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles'

Meteor.publish('users.all', function () {
    var loggedInUser = Meteor.users.findOne(this.userId);
    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'], 'oven')) {
        return [];
    }

    return Meteor.users.find();
});

Meteor.publish('users.one', function (uId) {
    var loggedInUser = Meteor.users.findOne(this.userId);
    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'], 'oven')) {
        return [];
    }
    return Meteor.users.find({_id: uId});
});
