import {Component, FunctionalComponent, h} from "preact";
import { useEffect, useState } from "preact/hooks";
import * as style from "./style.css";
import {ChanelModel, ImageModel, ImagesService} from "../../../components/utils/images.service";
import {ScapperImage} from "./image";
import {ScrapperChanel} from "./chanel";

interface ScrapperState {
    images: ImageModel[],
    chanels: ChanelModel[],
    chanelToLoad: string
}


export default class Scrapper extends Component<any, ScrapperState> {

    constructor(props: any, context: any) {
        super(props, context);
    }

    componentDidMount(): void {
        ImagesService.loadImages().then(value => {
            this.setState({images: value});
        })

        ImagesService.loadChanels().then(value => {
            this.setState({chanels: value});
        })
    }

    onSubmit = (e: any) => {
        console.log(this.state.chanelToLoad);
        e.preventDefault();
        ImagesService.scrap(this.state.chanelToLoad).then(value => {
            console.log(value);
            this.componentDidMount(); // reload everything
        })
    };

    onInput = (e: any) => {
        const { value } = e.target;
        this.setState({ chanelToLoad: value });
    };



    render() {
        var images = [];
        var chanels = [];
        var len = 0;
        if (this.state.images){
            this.state.images.forEach(value => {
                images.push((<ScapperImage image={value} />));
            });
            len = this.state.images.length;
        }

        if (this.state.chanels) {
            this.state.chanels.forEach(value => {
                chanels.push((<ScrapperChanel chanel={value} />));
            });
        }
        
        return (
            <div class={style.scrapper}>
                <h1>Load new:</h1>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <input type="text" value={this.state.chanelToLoad}  onInput={this.onInput} />
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <p>Already loaded ({len}):</p>
                <ul>
                    <li>https://www.are.na/ankkit-modi/i-want-this-on-a-tshirt</li>
                    <li>https://www.are.na/meg-miller/good-sign-offs</li>
                </ul>

                {chanels}

                <p>
                    {images}
                </p>
            </div>
        )
    }
}
