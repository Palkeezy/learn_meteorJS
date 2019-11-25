import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import {usersAddFormSchema} from "../users-add-form-schema";
import {usersUpdateFormSchema} from "../users-update-form-schema";
import {Roles} from 'meteor/alanning:roles';

Meteor.methods({
    'users.add'(data) {
        usersAddFormSchema.validate(data);
        var loggedInUser = Meteor.user();
        if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'], 'dispatcher')) {
            throw new Meteor.Error(403, 'Access denied');
        }
        if (Meteor.users.findOne({'emails.address': data.email})) {
            throw new Meteor.Error(500, 'Email is already exist')
        }
        var id;
        id = Accounts.createUser({
            email: data.email,
            password: data.password,
            profile: {name: data.name}
        });
        if (data.roles.length > 0) {
            // Need _id of existing user record so this call must come after `Accounts.createUser`.
            Roles.addUsersToRoles(id, data.roles, 'dispatcher');
        }
    },
    'users.update'(data) {
        usersUpdateFormSchema.validate(data);
        var loggedInUser = Meteor.user();

        if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'], 'dispatcher')) {
            throw new Meteor.Error(403, 'Access denied');
        }
        Meteor.users.update(data._id, {$set: {'profile.name': data.name}});
        if (data.password && data.confirmPassword && data.password === data.confirmPassword) {
            Accounts.setPassword(data._id, data.password);
        }
        Meteor.users.update(data._id, {$unset: {'roles': ''}});

        if (data.roles.length > 0) {
             Roles.addUsersToRoles(data._id, data.roles, 'oven');
        }
    }
});
