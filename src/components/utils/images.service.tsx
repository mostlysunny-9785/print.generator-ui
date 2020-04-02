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


export class ImagesServiceClass {
    private apiUrlPrefix = "http://localhost:3000";

    public async loadImages(): Promise<ImageModel[]> {

        const response = await fetch(
            this.apiUrlPrefix + "/images",
            {
                method: 'GET'
            }
        );
        let newVar = await response.json();
        console.log({newVar});

        return newVar;
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
