import {UserDocument} from "./user.model";
import {GenerationModel} from "../routes/loggedIn/theTool/generationModel";

// action types
export const LOAD = 'LOAD';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS'


// other constants
// ??

// action creators
export function userActionLoad(user: UserDocument) {
    return {type: LOAD, user};
}

export function userActionLogin() {
    return {type: LOGIN, undefined};
}

export function userActionLogout() {
    return {type: LOGOUT, undefined};
}

export function userActionUpdateSettings(settings: GenerationModel) {
    return {type: UPDATE_SETTINGS, settings};
}
