import {UserDocument} from "./user.model";
import {GenerationModel} from "../routes/loggedIn/theTool/generationModel";
import {GuestInfo} from "../services/guest.service";

// action types
export const GUEST_LOAD = 'GUEST_LOAD';


// other constants
// ??

// action creators
export function guestActionLoad(guest: GuestInfo) {
    return {type: GUEST_LOAD, guest};
}

