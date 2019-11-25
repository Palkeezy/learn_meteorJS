import './users-update.html';
import {Template} from "meteor/templating";
import '../../components/users/users-update-form-com.js';
import {FlowRouter} from 'meteor/kadira:flow-router';

//FlowRouter.getParams("appId");

Template.usersUpdate.helpers({
    getUserId () {
        return FlowRouter.getParam('uId');
    }
});
