import {LOAD, LOGIN, LOGOUT, UPDATE_SETTINGS} from "./user_reducer_actions";

export const userReducer = (state: any = { authenticated: false }, action: any) => {
    switch (action.type) {
        case LOGIN:
            state = {
                ...state,
                authenticated: true
            };
            break;
        case LOAD:
            state = {...state,
                ...action.user
            };
            break;
        case LOGOUT:
            state = {
                ...state,
                authenticated: false
            };
            break;
        case UPDATE_SETTINGS:
            state = {
                ...state,
                settings: action.settings
            };
            break;
    }
    return state;

};
