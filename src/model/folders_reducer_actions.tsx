import {FolderModel} from "../services/folders.service";

// action types
export const SET_FOLDERS = 'SET_FOLDERS';


// other constants
// ??

// action creators
export function setFolders(folderModels: FolderModel[]) {
    return {type: SET_FOLDERS, folderModels};
}

