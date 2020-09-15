import { h } from "preact";
import {LoadedChanelModel} from "./images.service";
import {apiUrlPrefix} from "../components/utils/global";



export interface WordModel {
    _id: string;
    content: string;
    created: Date;
    folderId: string;
    ownerId: string,
}


export class WordsServiceClass {

    public async getByFolder(folderId: string): Promise<WordModel> {
        const response = await fetch(apiUrlPrefix + "/words/" + folderId,{method: 'GET'});
        if (response.status !== 200) {
            throw new Error(await response.text());
        }
        return await response.json();
    }
    public async delete(wordId: string): Promise<boolean> {
        const response = await fetch(apiUrlPrefix + "/words/" + wordId,{method: 'DELETE'});
        if (response.status !== 200) {
            throw new Error(await response.text());
        }
        return response.status === 200;
    }
    public async add(folderId: string, content: string): Promise<WordModel> {
        const response = await fetch(apiUrlPrefix + "/words/" + folderId,{
            method: 'POST',
            body: JSON.stringify({content}),
            headers: {"content-type": 'application/json'}
        });
        if (response.status !== 201) {
            throw new Error(await response.text());
        }
        return await response.json();
    }
    public async update(wordId: string, content: string): Promise<WordModel> {
        const response = await fetch(apiUrlPrefix + "/words/" + wordId,{
            method: 'PUT',
            body: JSON.stringify({content}),
            headers: {"content-type": 'application/json'}
        });
        if (response.status !== 200) {
            throw new Error(await response.text());
        }
        return await response.json();
    }

    public async getAll(): Promise<WordModel[]> {
        const response = await fetch(apiUrlPrefix + "/words",{method: 'GET'});
        if (response.status !== 200) {
            throw new Error(await response.text());
        }
        return await response.json();
    }

}

export var WordsService = new WordsServiceClass();
