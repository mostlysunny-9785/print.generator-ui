import { h } from "preact";

export interface ImageModel {
    localPath: string;
    remotePath: string;
    description: string,
    title: string,
    block: string,
    created: Date,
    filename: string,
    fileSize: number,
}

export interface ChanelModel {
    url: string;
}


export class ImagesServiceClass {
    private apiUrlPrefix = "http://localhost:3000/api";

    public async loadImages(): Promise<ImageModel[]> {

        const response = await fetch(
            this.apiUrlPrefix + "/images",
            {
                method: 'GET'
            }
        );
        let newVar = await response.json();

        return newVar;
    }

    public async loadChanels(): Promise<ChanelModel[]> {
        const response = await fetch(this.apiUrlPrefix + "/chanels",{method: 'GET'});
        return await response.json();
    }


    public async scrap(chanel: string): Promise<string> {
        const response = await fetch(this.apiUrlPrefix + "/scrap", {method: 'POST', body: JSON.stringify({chanel})});
        return await response.json();
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
