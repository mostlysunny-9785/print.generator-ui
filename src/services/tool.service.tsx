import { h } from "preact";
import {LoadedChanelModel} from "./images.service";
import {apiUrlPrefix} from "../components/utils/global";



export interface GeneratedModel {
    _id: string;
    id: string;
    title: string;
    previewFilename: string;
    filename: string;
    svgFilename: string;
    width: number;
    height: number;
    fileSize: number;
    generationTime: number;
    ownerId: string;
    createdAt: Date;
}


export class ToolServiceClass {

    public async add(svg: string): Promise<GeneratedModel> {
        const response = await fetch(apiUrlPrefix + "/tool",{
            method: 'POST',
            body: JSON.stringify({svg}),
            headers: {'content-type': 'application/json'}
        });
        if (response.status !== 200) {
            throw new Error(await response.text());
        }
        return await response.json();
    }

    public async list(): Promise<GeneratedModel[]> {
        const response = await fetch(apiUrlPrefix + "/tool/list",{method: 'GET'});
        if (response.status !== 200) {
            throw new Error(await response.text());
        }
        return await response.json();
    }

}

export var ToolService = new ToolServiceClass();
