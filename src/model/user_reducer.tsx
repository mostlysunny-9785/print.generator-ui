import {LOAD, LOGIN, LOGOUT} from "./user_reducer_actions";

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
    }
    return state;

};
