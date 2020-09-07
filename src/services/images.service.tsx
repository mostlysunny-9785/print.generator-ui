import { h } from "preact";
import {apiUrlPrefix} from "../components/utils/global";

export enum ChanelTypes {
    ARENA,
    WWW,
    FILE
}


export interface ImageModel {
    _id: string,
    localPath: string;
    remotePath: string;
    description: string;
    title: string;
    block: string;
    created: Date;
    filename: string;
    fileSize: number;
    chanelId: string;
    ownerId: string;
}

export interface ChanelModel {
    _id: string,
    ownerId: string,
    url: string,
    type: ChanelTypes,
    pictureIds: string[]
}

export interface LoadedChanelModel {
    _id: string,
    ownerId: string,
    url: string,
    type: ChanelTypes,
    pictureIds: [],
    pictures: ImageModel[]
}


export class ImagesServiceClass {

    public async loadChannelImages(chanelId: string): Promise<ImageModel[]> {

        const response = await fetch(
            apiUrlPrefix + "/arenaimages/" + chanelId,
            {
                method: 'GET'
            }
        );
        let newVar = await response.json();

        return newVar;
    }

    public async removeImage(imageId: string, folderId: string): Promise<boolean> {
        const response = await fetch(apiUrlPrefix + "/images/" + imageId + "/" + folderId,{method: 'DELETE'});
        return response.status === 200;
    }

    public async uploadImages(files: FileList, folderId: string): Promise<ImageModel[]> {
        const uploadData = new FormData();
        for (let i = 0; i < files.length; i++) {
            uploadData.append('data', files[i], files[i].name);
        }

        const response = await fetch(
            apiUrlPrefix + "/images/" + folderId,
            {
                method: 'POST',
                body: uploadData
            }
        )
        return await response.json();
    }

    public async loadFolder(folderId: string): Promise<ImageModel[]> {
        const response = await fetch(apiUrlPrefix + "/images/" + folderId,{method: 'GET'});
        return  await response.json();
    }

    public async loadChannels(): Promise<ChanelModel[]> {
        const response = await fetch(apiUrlPrefix + "/channels",{method: 'GET'});
        return await response.json();
    }

    public async loadChannelsWithImages(): Promise<LoadedChanelModel[]> {
        const loadedChannels: LoadedChanelModel[] = [];

        const channels = await this.loadChannels();
        for (let channel of channels) {
            const chanelImages = await this.loadChannelImages(channel._id);
            loadedChannels.push({...channel, pictures: chanelImages} as LoadedChanelModel);
        }

        return loadedChannels;
    }

    public async removeChannel(channelId: string): Promise<boolean> {
        const response = await fetch(apiUrlPrefix + "/channels/" + channelId,{method: 'DELETE'});
        return response.status === 200;
    }


    public async scrap(channel: string, folderId: string): Promise<boolean> {
        const response = await fetch(apiUrlPrefix + "/scrap",{
            method: 'POST',
            headers: {"content-type": 'application/json'},
            body: JSON.stringify({
                channel,
                folderId
            })
        });
        return response.status === 200;
    }



    // .then(value => {
    //         value.json().then(value1 => {
    //             console.log({value1});
    //             resolve(value1);
    //         })
    //     })
    // });

}

export var ImagesService = new ImagesServiceClass();
