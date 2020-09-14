import { h } from "preact";
import {apiUrlPrefix} from "../components/utils/global";

export enum FolderType {
    WORD,
    IMAGE
}


export interface FolderModel {
    _id: string;
    id: number;
    type: FolderType
    ownerId: string
}



export class FoldersServiceClass {
    public async get(): Promise<FolderModel[]> {
        const response = await fetch(apiUrlPrefix + "/folders" ,{method: 'GET'});
        if (response.status !== 200) {
            throw new Error(await response.text());
        }
        const folder: any[] = await response.json();
        folder.forEach((oneFolder: any) => {
            if (oneFolder.type === "0") {
                oneFolder.type = FolderType.WORD
            } else if (oneFolder.type === "1") {
                oneFolder.type = FolderType.IMAGE;
            }
        })

        return folder;
    }

    public async add(id: string, type: FolderType): Promise<FolderModel> {
        let typeStr = '';
        switch (type) {
            case FolderType.IMAGE: typeStr = 'IMAGE'; break;
            case FolderType.WORD: typeStr = 'WORD'; break;
        }

        const response = await fetch(apiUrlPrefix + "/folders",{
            method: 'POST',
            body: JSON.stringify({id, type: typeStr}),
            headers: {"content-type": 'application/json'}
        });
        if (response.status !== 201) {
            throw new Error(await response.text());
        }
        return await response.json();
    }

    public async delete(folderId: string): Promise<boolean> {
        const response = await fetch(apiUrlPrefix + "/folders/" + folderId,{method: 'DELETE'});
        if (response.status !== 200) {
            throw new Error(await response.text());
        }
        return response.status === 200;
    }
}

export var FoldersService = new FoldersServiceClass();
