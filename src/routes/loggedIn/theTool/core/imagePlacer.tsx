import {Component, FunctionalComponent, h} from "preact";
import * as style from "./style.css";
import {GenerationModel, ImageProps, TShirtColors, TShirtTypes, WordProps} from "../generationModel";
import {ImageModel, ImagesService, LoadedChanelModel} from "../../../../services/images.service";
import {DrawArea, ToolCoreProps} from "./toolCore";
import {apiUrlPrefix} from "../../../../components/utils/global";
import {WordModel, WordsService} from "../../../../services/words.service";
import {FolderModel, FoldersService} from "../../../../services/folders.service";
import Word from "../../word";
import {RandomComposition} from "./compositions/random";
import {getImage, getWord, revertImageDimensionsToOriginal} from "./functions/content";
import {mm2pix} from "./helpers";
import { saveAs } from 'file-saver';
import {ToolService} from "../../../../services/tool.service";

var pngLib = require("save-svg-as-png")


export interface Props {
    model: GenerationModel;
    drawArea: DrawArea;
}

export interface State {
    images: ImageModel[];
    loadedImages: ImageProps[];
    words: WordModel[];
    loadedWords: WordProps[];
    folders: FolderModel[];

    loadingDone: boolean,
    objectsToDraw: any[]
}


export default class ImagePlacer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loadingDone: false, 
            objectsToDraw: [],
            images: [],
            loadedImages: [],
            words: [],
            loadedWords: [],
            folders: []
        };
        
    }

    componentDidMount() {
        FoldersService.get().then(folders => {
            this.setState({folders});
        });

        ImagesService.getAllImages().then(images => {
            // also load image properties
            const loadedImages: Promise<ImageProps>[] = [];
            images.forEach((image: ImageModel) => {
                loadedImages.push(getImage(image.filename));
            });

            Promise.all(loadedImages).then((loadedImages: ImageProps[]) => {
                // when we have downloaded and loaded all images and their properties
                this.setState({images, loadedImages});
            });

        });

        WordsService.getAll().then(words => {
            const loadedWords: WordProps[] = [];
            if (words && words.length) {
                words.forEach(word => {
                    loadedWords.push(getWord(word)); // fillup visible object
                })
            }
            console.log({words, loadedWords});
            this.setState({words, loadedWords});

        });
    }

    download = () => {

        const svgElement: any = document.getElementById("drawArea");
        const serializedSvg = new XMLSerializer().serializeToString(svgElement);
        const base64 = window.btoa(serializedSvg);

        ToolService.add(base64).then(value => {
            console.log({value});
        });

        // pngLib.saveSvgAsPng(document.getElementById("drawArea"), "diagram.png", options);
        // pngLib.svgAsPngUri(document.getElementById("drawArea"), options).then((uri: any) => {
        //     console.log({uri});
        //
        //     fetch(uri)
        //         .then(res => res.blob())
        //         .then(blob => {
        //             saveAs(blob, "result.png");
        //         });
        //
        //     // const blob = new Blob([uri], {type: 'image/png'});
        //
        //     // const url = window.URL.createObjectURL(new Blob([uri]));
        //     // const link = document.createElement('a');
        //     // link.href = url;
        //     // link.setAttribute('download', 'image.png')
        //     // document.body.appendChild(link);
        //     // link.click();
        // })

    }

    render() {
        const p = this.props;
        const s = this.state;

        const imagesNum = p.model.picturesCount === 0 ? s.images.length : p.model.picturesCount; // if user setted max pictures overwrite
        const wordsNum = p.model.wordsCount === 0 ? s.words.length : p.model.wordsCount;


        const imagesToDraw: ImageProps[] = [];
        const wordsToDraw: WordProps[] = [];

        if (this.state.loadedImages && this.state.loadedImages.length > 0) {
            for (let i = 0;i < imagesNum; i++) {
                let image = this.state.loadedImages[i];
                if (image) {
                    // prepare composition to draw
                    image = revertImageDimensionsToOriginal(image);
                    imagesToDraw.push(image);
                }
            }
        }

        if (this.state.loadedWords && this.state.loadedWords.length > 0) {
            for (let i = 0; i < wordsNum; i++) {
                let word = this.state.loadedWords[i];
                if (word) {
                    wordsToDraw.push(word);
                }
            }
        }

        const toDraw: any[] = RandomComposition.compose(imagesToDraw, wordsToDraw, p.drawArea);


        return (
                <svg x={p.drawArea.x} y={p.drawArea.y} height={p.drawArea.height} width={p.drawArea.width} id='drawArea' onClick={this.download}>
                    {toDraw}
                </svg>
        );
    }



}


