import {Tracker} from "meteor/tracker";
import SimpleSchema from 'simpl-schema';

export const usersAddFormSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Your name",
        max: 50
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "E-mail address"
    },
    password: {
        type: String,
        label: "Enter a password",
        min: 4,
        autoform: {
            type: 'password'
        }
    },
    confirmPassword: {
        type: String,
        label: "Enter the password again",
        min: 4,
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
        label: "Roles",
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
}, {tracker: Tracker});
