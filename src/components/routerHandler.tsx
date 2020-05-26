import {store} from "../model/store";
import {route} from "preact-router";
import {publicRoutes} from "./utils/global";



export const handleRouteChange = (e: any) => {



    if (!publicRoutes.includes(e.url)) {

        // you need to be logged in to see different than allowedRoutes

        const isAuthed = store.getState().authenticated;
        if (!isAuthed) {
            console.log("redirecting");
            route("/login", true);
        }
    }
    return e.url;
};
