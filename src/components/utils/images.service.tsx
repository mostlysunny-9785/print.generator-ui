import { h } from "preact";

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
    pictureIds: []
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
    private apiUrlPrefix = "/api";

    public async loadImages(chanelId: string): Promise<ImageModel[]> {

        const response = await fetch(
            this.apiUrlPrefix + "/images/" + chanelId,
            {
                method: 'GET'
            }
        );
        let newVar = await response.json();

        return newVar;
    }

    public async loadChannels(): Promise<ChanelModel[]> {
        const response = await fetch(this.apiUrlPrefix + "/channels",{method: 'GET'});
        return await response.json();
    }

    public async loadChannelsWithImages(): Promise<LoadedChanelModel[]> {
        const loadedChannels: LoadedChanelModel[] = [];

        const channels = await this.loadChannels();
        for (let channel of channels) {
            const chanelImages = await this.loadImages(channel._id);
            loadedChannels.push({...channel, pictures: chanelImages});
        }

        return loadedChannels;
    }

    public async removeChannel(channelId: string): Promise<boolean> {
        const response = await fetch(this.apiUrlPrefix + "/channels/" + channelId,{method: 'DELETE'});
        return response.status === 200;
    }


    public async scrap(chanel: string): Promise<boolean> {
        const response = await fetch(this.apiUrlPrefix + "/scrap", {method: 'POST', headers: {"content-type": 'application/json'}, body: JSON.stringify({chanel})});
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
