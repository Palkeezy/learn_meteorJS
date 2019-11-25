import './users-update-form-com.html';
import {Template} from "meteor/templating";
import {usersUpdateFormSchema} from "../../../../imports/api/users/users-update-form-schema.js";


Template.usersUpdateFormCom.onCreated(function () {
    this.subscribe('users.one', this.data.userId)
});
Template.usersUpdateFormCom.helpers({
    getUserId() {
        return this.userId;
    },
    getUser() {
        let user = Meteor.users.findOne(this.userId);
        if (user) {
            return {
                _id: user._id,
                name: user.profile.name,
                email: user.emails[0].address,
                password: '',
                confirmPassword: '',
                roles: user.roles && user.roles.oven ? user.roles.oven : []
            }
        } else {
            return {
                _id: '',
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                roles: []
            }
        }
    },
    getUsersUpdateFormSchema() {
        return usersUpdateFormSchema;
    },
});

Template.usersUpdateFormCom.onRendered(function () {
    var usersUpdateFormHooks = {
        // Called when any submit operation succeeds
        onSuccess: function (formType, result) {
            toastr['success']('User was updated', 'Success');
            if (Meteor.userId() == this.insertDoc._id && this.insertDoc.password) {
                setTimeout(function () {FlowRouter.reload();},1000);
                FlowRouter.go('/login');
            }
        },
        // Called when any submit operation fails
        onError: function (formType, error) {
            toastr['error'](error.reason, 'Error');
        },
    };

    AutoForm.addHooks('usersUpdateForm', usersUpdateFormHooks, true)
});

