import {GenerationModel} from "../routes/loggedIn/theTool/generationModel";

// action types
export const INIT = 'INIT';
export const SET_MODEL = 'SET_MODEL';


// other constants
// ??

// action creators
export function generationInit(generationModel: GenerationModel) {
    return {type: INIT, generationModel};
}

export function setGenerationAction(generationModel: GenerationModel) {
    return {type: SET_MODEL, generationModel};
}

