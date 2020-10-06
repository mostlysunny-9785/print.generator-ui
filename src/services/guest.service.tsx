import {apiUrlPrefix} from "../components/utils/global";
import {store} from "../model/store";
import {guestActionLoad} from "../model/guest_reducer_actions";

export interface GuestInfo {
    _id?: string,
    id: number,
    createdAt?: Date
}

const DefaultGuestInfo: GuestInfo = {
    id: 0
}

class GuestServiceClass {

    public static GUEST_KEY = "guest-key";

    public async identifyGuest(): Promise<GuestInfo> {
        if (!this.alreadyBeenHere()) { // looks like this is first time user has been here
            const newId: GuestInfo = await this.askForId();
            this.setLocalStorage(newId);
            return newId;
        } else { // he already been here
            return new Promise<GuestInfo>((resolve) => {
                resolve(this.getLocalStorage());
            });
        }
    }


    private async askForId() {
        const response = await fetch(apiUrlPrefix + "/user/guest",{method: 'POST'});
        if (response.status !== 201) {
            throw new Error(await response.text());
        }
        return await response.json();
    }

    private alreadyBeenHere(): boolean {
        const item = localStorage.getItem(GuestServiceClass.GUEST_KEY);
        return item !== null;
    }

    private getLocalStorage(): GuestInfo {
        const item = localStorage.getItem(GuestServiceClass.GUEST_KEY);
        if (item === null) {
            this.setLocalStorage(DefaultGuestInfo);
            return DefaultGuestInfo;
        } else {
            return JSON.parse(item);
        }
    }

    private setLocalStorage(info: GuestInfo) {
        localStorage.setItem(GuestServiceClass.GUEST_KEY, JSON.stringify(info));
    }
}

export const GuestService = new GuestServiceClass();
