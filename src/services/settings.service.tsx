import { h } from "preact";
import {apiUrlPrefix} from "../components/utils/global";
import {GenerationModel} from "../routes/loggedIn/theTool/generationModel";




export class SettingsServiceClass {

    public async update(settings: GenerationModel): Promise<GenerationModel> {
        const response = await fetch(apiUrlPrefix + "/user/settings",{
            method: 'PUT',
            body: JSON.stringify({content: settings}),
            headers: {"content-type": 'application/json'}
        });
        if (response.status !== 200) {
            throw new Error(await response.text());
        }
        return await response.json();
    }

}

export var SettingsService = new SettingsServiceClass();
