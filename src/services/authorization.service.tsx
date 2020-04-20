import {ChanelModel, ImageModel} from "../components/utils/images.service";

export class AuthorizationServiceClass {
    public isAuthenticated: boolean;
    private localStorageKey = "authentificated";

    constructor() {
        let item = localStorage.getItem(this.localStorageKey);
        console.log(item);
        if (item === null){
            localStorage.setItem(this.localStorageKey, "false");
            this.isAuthenticated = false;
        } else {
            this.isAuthenticated = item === "true";
        }
    }

    public async authenticate(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(()=> {
                this.isAuthenticated = true;
                localStorage.setItem(this.localStorageKey, "true");
                resolve(true);
            }, 100)
        })
    }

    public async signout(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(()=> {
                this.isAuthenticated = false;
                localStorage.setItem(this.localStorageKey, "false");
                resolve(false);
            }, 100)
        })
    }

}

export var AuthorizationService = new AuthorizationServiceClass();
