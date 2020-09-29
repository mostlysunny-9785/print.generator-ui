import {Component, h} from "preact";
import {CompositionTypes, GenerationModel, ImageProps, WordProps} from "../generationModel";
import {ImageModel, ImagesService} from "../../../../services/images.service";
import {DrawArea} from "./toolCore";
import {WordModel, WordsService} from "../../../../services/words.service";
import {FolderModel, FoldersService} from "../../../../services/folders.service";
import {getImage, getWord, revertImageDimensionsToOriginal} from "./functions/content";
import {ToolService} from "../../../../services/tool.service";
import {GridComposition} from "./compositions/grid";
import {RandomComposition} from "./compositions/random";
import generationModelPicker from "../generationModelPicker/generationModelPicker";


// TODO: move this to store
export let glob_generationModel: GenerationModel;

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
            this.setState({images});

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

    loadImages(count: number) {
        const loadedImages: Promise<ImageProps>[] = [];
        if (count > this.state.images.length) {
            count = this.state.images.length;
        }
        for (let i = this.state.loadedImages.length; i < count; i++){
            const image = this.state.images[i];
            if (!this.state.loadedImages[i] && image) { // only if its not yet loaded
                loadedImages.push(getImage(image));
            }
        }

        // wait for all to download
        if (loadedImages.length > 0) {
            Promise.all(loadedImages).then((loadedImages: ImageProps[]) => {
                // when we have downloaded and loaded all images and their properties
                this.setState({loadedImages: [...this.state.loadedImages, ...loadedImages]});
            });
        }
    }

    render() {
        const p = this.props;
        const s = this.state;
        glob_generationModel = p.model;

        const imagesNum = p.model.picturesCount === 0 ? s.images.length : p.model.picturesCount; // if user setted max pictures overwrite
        const wordsNum = p.model.wordsCount === 0 ? s.words.length : p.model.wordsCount;
        this.loadImages(imagesNum);

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
        let toDraw: any[] = [];
        if (this.props.model.composition === CompositionTypes.RANDOM) {
             toDraw = RandomComposition.compose(imagesToDraw, wordsToDraw, p.drawArea);
        } else if (this.props.model.composition === CompositionTypes.GRID) {
            toDraw  = GridComposition.compose(imagesToDraw, wordsToDraw, p.drawArea);
        }



        return (
                <svg x={440} y={150} height={p.drawArea.height} width={p.drawArea.width} id='drawArea'>
                    {toDraw}
                </svg>
        );
    }



}


