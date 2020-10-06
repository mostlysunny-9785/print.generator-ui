import {GUEST_LOAD} from "./guest_reducer_actions";
import {GuestInfo} from "../services/guest.service";


export const guestReducer = (state: GuestInfo = {id: 0}, action: any) => {
    switch (action.type) {
        case GUEST_LOAD:
            state = action.guest;
            break;
    }
    return state;

};
