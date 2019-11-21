import './users-add-form-com.html';
import {usersAddFormSchema} from "../../../api/users/users-add-form-schema.js";
import {Template} from "meteor/templating";


Template.usersAddFormCom.helpers({
    getUsersAddSchema() {
        return usersAddFormSchema;
    }
});

Template.usersAddFormCom.onRendered(function () {
    var usersAddFormHooks = {
        // Called when any submit operation succeeds
        onSuccess: function (formType, result) {
            toastr['success']('User was created', 'Success');
        },

        // Called when any submit operation fails
        onError: function (formType, error) {
            toastr['error'](error.reason, 'Error');
        },
    };


    AutoForm.addHooks('usersAddForm', usersAddFormHooks, true)
});
