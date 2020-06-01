import { createStore } from 'redux';
import {userReducer} from "./user_reducer";



export const store = createStore(userReducer);










store.subscribe(() => {
    // console.log("User updated!", store.getState());
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
