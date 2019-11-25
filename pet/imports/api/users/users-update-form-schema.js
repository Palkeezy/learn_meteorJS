import {Tracker} from "meteor/tracker";
import SimpleSchema from 'simpl-schema';


export const usersUpdateFormSchema = new SimpleSchema({
    _id: {
        type: String,
        autoform: {
            type: "hidden"
        },
    },
    name: {
        type: String,
        label: "Your name",
        max: 50
    },
    email: {
        type: String,
        optional: true,
        autoform: {
            disabled: true
        },
        regEx: SimpleSchema.RegEx.Email,
        label: "E-mail address"
    },
    password: {
        type: String,
        label: "Enter a password",
        min: 4,
        optional: true,
        autoform: {
            type: 'password'
        }
    },
    confirmPassword: {
        type: String,
        label: "Enter the password again",
        min: 4,
        optional: true,
        autoform: {
            type: 'password'
        },
        custom() {
            if (this.value !== this.field('password').value) {
                return "passwordMismatch";
            }
        },
    },
    roles: {
        optional: true,
        type: Array,
        label: 'Roles',
        autoform: {
            type: 'select-checkbox',
            options: [
                {label: 'Manager', value: 'dispatcher'},
                {label: 'Admin', value: 'admin'}
            ]
        }
    },
    'roles.$': {
        type: String,
        allowedValues: ['admin', 'dispatcher']
    }
});
