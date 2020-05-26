import {UserDocument} from "./user.model";

// action types
export const LOAD = 'LOAD';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


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
