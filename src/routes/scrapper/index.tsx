import {Component, FunctionalComponent, h} from "preact";
import { useEffect, useState } from "preact/hooks";
import * as style from "./style.css";
import {ImageModel, ImagesService} from "../../components/utils/images.service";

interface ScrapperState {
    images: ImageModel[]
}


export default class Scrapper extends Component<any, ScrapperState> {

    componentDidMount(): void {
        // ImagesService.loadImages().then(value => {
        //     this.setState({images: value});
        // })
    }

    render() {
        // this.state.images.forEach(value => {
        //     console.log({value});
        // });
        return (
            <div class={style.scrapper}>
                <h1>Load new:</h1>
                <p>Already loaded (5):</p>
                <ul>
                    <li>https://www.are.na/ankkit-modi/i-want-this-on-a-tshirt</li>
                    <li>https://www.are.na/meg-miller/good-sign-offs</li>
                </ul>

                <p>

                </p>
            </div>
        )
    }
}
