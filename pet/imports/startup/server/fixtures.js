// Fill the DB with example data on startup

import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {} from 'meteor/underscore';
import {Roles} from 'meteor/alanning:roles';
// import { Links } from '../../api/links/links.js';

Meteor.startup(() => {

    var users = [
        {name: 'Admin User', email: 'admin@example.com', roles: ['admin']}
    ];

    users.forEach(function (user) {
        if (Meteor.users.findOne({'emails.address': user.email})) {
            return;
        }
        var id;

        id = Accounts.createUser({
            email: user.email,
            password: "test",
            profile: {name: user.name}
        });

        if (Meteor.roleAssignment.find({'user._id': id}).count() === 0) {
            user.roles.forEach(function (role) {
                Roles.createRole(role, {unlessExists: true});
            });
            // Need _id of existing user record so this call must come after `Accounts.createUser`.
            Roles.addUsersToRoles(id, user.roles, 'default-group');
        }

    });
});
