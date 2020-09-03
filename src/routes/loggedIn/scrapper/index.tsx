import { Component, FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import * as style from "./style.css";
import {
    ChanelModel,
    ImageModel,
    ImagesService
} from "../../../components/utils/images.service";
import { ScapperImage } from "./image";
import { ScrapperChanel } from "./chanel";
import ScrapperMenu from "./menu";
import PicturePromt from "./picturePromt";

interface ScrapperState {
    images: ImageModel[];
    channels: ChanelModel[];
    chanelToLoad: string;
}

export default class Scrapper extends Component<any, ScrapperState> {
    constructor(props: any, context: any) {
        super(props, context);
    }

    componentDidMount(): void {
        ImagesService.loadChannels().then(value => {
            this.setState({ channels: value });
        });
    }

    onSubmit = (e: any) => {
        console.log(this.state.chanelToLoad);
        e.preventDefault();
        // ImagesService.scrap(this.state.chanelToLoad).then(value => {
        //     console.log(value);
        //     this.componentDidMount(); // reload everything
        // });
    };

    onInput = (e: any) => {
        const { value } = e.target;
        this.setState({ chanelToLoad: value });
    };

    onRemoveChannel = (channelId: string) => {
        ImagesService.removeChannel(channelId).then(value => {
            if (value){
                this.setState({channels: this.state.channels.filter(channel => channelId !== channel._id)});
            } else {
                // some error
            }
        })
    }

    onAddChannel = (channelId: string) => {
        ImagesService.scrap(channelId, "0").then(value => {
            if (value){
                console.log("juj");
                this.componentDidMount(); // reload everything
            } else {
                // some error
            }
        });
    }

    render() {
        const chanels: any = [];


        if (this.state.channels) {
            this.state.channels.forEach(value => {
                chanels.push(<ScrapperChanel chanel={value} onRemove={() => this.onRemoveChannel(value._id)}  />);
            });
        }

        return (
            <div class={style.scrapper}>
                {/*<div>*/}
                {/*    <form onSubmit={this.onSubmit}>*/}
                {/*        <input*/}
                {/*            type="text"*/}
                {/*            value={this.state.chanelToLoad}*/}
                {/*            onInput={this.onInput}*/}
                {/*        />*/}
                {/*        <button type="submit">Submit</button>*/}
                {/*    </form>*/}
                {/*</div>*/}
                {/*<p>Already loaded ({len}):</p>*/}
                {/*<ul>*/}
                {/*    <li>*/}
                {/*        https://www.are.na/ankkit-modi/i-want-this-on-a-tshirt*/}
                {/*    </li>*/}
                {/*    <li>https://www.are.na/meg-miller/good-sign-offs</li>*/}
                {/*</ul>*/}

                <PicturePromt onSubmit={this.onAddChannel} />

                {chanels}


                <ScrapperMenu />



            </div>
        );
    }
}
