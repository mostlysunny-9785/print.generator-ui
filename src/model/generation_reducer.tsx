import {INIT, SET_MODEL} from "./generation_reducer_actions";
import {DefaultGenerationModel} from "../routes/loggedIn/theTool/generationModel";

export const generationReducer = (state: any = DefaultGenerationModel, action: any) => {
    switch (action.type) {
        case INIT:
            state = {
                action
            };
            break;
        case SET_MODEL:
            state = action.generationModel;
            break;
    }
    return state;

};
