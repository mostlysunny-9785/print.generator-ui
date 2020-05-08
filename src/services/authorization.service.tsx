import { ChanelModel, ImageModel } from "../components/utils/images.service";

class AuthorizationServiceClass {
    public isAuthenticated: boolean;
    private localStorageKey = "authentificated";

    constructor() {
        const item = this.getItem(this.localStorageKey);
        // console.log(item);
        if (item === null) {
            if (typeof window !== "undefined") {
                this.setItem(this.localStorageKey, "false");
            }
            this.isAuthenticated = false;
        } else {
            this.isAuthenticated = item === "true";
        }
    }

    public async authenticate(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.isAuthenticated = true;
                if (typeof window !== "undefined") {
                    this.setItem(this.localStorageKey, "true");
                }

                resolve(true);
            }, 100);
        });
    }

    public async signout(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.isAuthenticated = false;
                this.setItem(this.localStorageKey, "false");
                resolve(false);
            }, 100);
        });
    }

    private setItem(key: string, value: string): any {
        if (typeof window !== "undefined") {
            localStorage.setItem(key, "false");
        }
    }

    private getItem(key: string): string | null {
        if (typeof window !== "undefined") {
            return localStorage.getItem(key);
        } else {
            return null;
        }
    }
}

export const AuthorizationService = new AuthorizationServiceClass();
