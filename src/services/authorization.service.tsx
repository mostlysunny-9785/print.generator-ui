import {UserDocument} from "../model/user.model";
import {apiUrlPrefix} from "../components/utils/global";
import {store} from "../model/store";
import {userActionLoad, userActionLogin, userActionLogout} from "../model/user_reducer_actions";
import {GuestInfo, GuestService} from "./guest.service";
import {guestActionLoad} from "../model/guest_reducer_actions";

class AuthorizationServiceClass {

    constructor() {

    }

    public async authenticate(email: string, password: string): Promise<UserDocument | undefined> {
        if (store.getState().userReducer.authenticated) { // we already have a state

        } else {
            const response = await fetch(
                apiUrlPrefix + "/login",
                {
                    method: 'POST',
                    headers: {"content-type": 'application/json'},
                    body: JSON.stringify({email, password})
                },

            );

            if (response.status === 200) {
                let user = await response.json();
                store.dispatch(userActionLoad(user as UserDocument));
                store.dispatch(userActionLogin());
                return user;
            } else {
                return undefined;
            }
        }
    }

    public async getSession(): Promise<UserDocument | undefined> {
        if (store.getState().userReducer.authenticated) { // we already have a state

        } else { // try to ask backend for it
            const response = await fetch(
                apiUrlPrefix + "/session",
                {
                    method: 'GET',
                    headers: {"content-type": 'application/json'}
                },
            );
            if (response.status === 200) {
                let user = await response.json();
                store.dispatch(userActionLoad(user as UserDocument));
                store.dispatch(userActionLogin());
                GuestService.identifyGuest().then((guestInfo: GuestInfo) => {
                    store.dispatch(guestActionLoad(guestInfo)); // save guest info for UI
                });

                return user;
            } else {
                // user is not authentificated, try to determine guest
                GuestService.identifyGuest().then((guestInfo: GuestInfo) => {
                    store.dispatch(guestActionLoad(guestInfo)); // save guest info for UI
                });
                // return user unidentified
                return undefined;
            }
            // }

        }
    }

    public async signout(): Promise<boolean> {
        const response = await fetch(
            apiUrlPrefix + "/logout",
            {
                method: 'GET',
            }
        );

        if (response.ok) {
            store.dispatch(userActionLogout());
            return true;
        } else {
            return false;
        }
    }

    private static setItem(key: string, value: string): any {
        console.log("settingup:" + value);
        if (typeof window !== "undefined") {
            localStorage.setItem(key, "false");
        }
    }

    private static getItem(key: string): string | null {
        if (typeof window !== "undefined") {
            return localStorage.getItem(key);
        } else {
            return null;
        }
    }

}

export const AuthorizationService = new AuthorizationServiceClass();
