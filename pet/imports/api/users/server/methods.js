import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'users.add'(data) {
        console.log(data);
        throw new Meteor.Error(403, 'Access denied')
    },
});
