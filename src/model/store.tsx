import {combineReducers, createStore} from 'redux';
import {userReducer} from "./user_reducer";
import {generationReducer} from "./generation_reducer";
import {folderReducer} from "./folders_reducer";
import {guestReducer} from "./guest_reducer";



// export const store = createStore(userReducer);
export const store = createStore(combineReducers({
    userReducer,
    generationReducer,
    folderReducer,
    guestReducer
}));










store.subscribe(() => {
    console.log("Store change", store.getState());
})

// store.dispatch({
//     type: "LOGIN",
//     payload: {username: "honza", password: "deepshit"}
// });



// let ACTIONS = {
//     LOGIN_USER: ({user, ...state}, { userData }) => ({
//         user: [...user, {
//             id: Math.random().toString(36).substr(2),
//             userData
//         }],
//         ...state
//     })
// }
//
// const INITIAL = {
//     user: {}
// }
//
// export default createStore( (state, action) => (
//     action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state
// ), INITIAL, typeof devToolsExtension==='function' ? devToolsExtension() : undefined);
//
