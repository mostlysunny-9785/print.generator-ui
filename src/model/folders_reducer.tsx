import {SET_FOLDERS} from "./folders_reducer_actions";

export const folderReducer = (state: any = [], action: any) => {
    switch (action.type) {
        case SET_FOLDERS:
                state = action.folderModels
            ;
            break;
    }
    return state;

};
