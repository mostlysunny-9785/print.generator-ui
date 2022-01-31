import {Component, h} from "preact";
import WordFolderHeader from "./header";
import WordFolderMenu from "./menu";
import * as style from "./style.css";
import {useRef} from "preact/hooks";
import {WordModel, WordsService} from "../../../../services/words.service";
import Word from "../../word";

interface State {
    word?: WordModel,
    wordsCount: number;
}

interface Props {
    wordFolderId: string
}

/**
 * Component for putting words into database. This show & edit exactly one word get by folder ID
 */
export default class WordFolder extends Component<Props, State> {

    private textAreaRef = useRef<HTMLTextAreaElement>(null);


    constructor(props: Props) {
        super(props);
        this.state = { wordsCount: 0};
    }



    componentDidMount(): void {
        WordsService.getByFolder(this.props.wordFolderId).then(word => {
            const wordsCount = word.content !== "" ? word.content.split(' ').length : 0;
            this.setState({word, wordsCount});
            this.input = word.content;
        }).catch(reason => {
            WordsService.add(this.props.wordFolderId, '').then(word => {
                this.setState({word});
            }).catch(reason1 => {
                console.log({reason1});
            })
        })
    }

    private input = "";

    onInput = (e: any) => {
        const {value} = e.target;
        this.input = value;
        const wordsCount = this.input !== "" ? this.input.split(' ').length : 0;
        if (this.state.wordsCount !== wordsCount) {
            this.setState({wordsCount});
        }

    }

    onRoute = () => {
        if (this.state.word) {
            WordsService.update(this.state.word._id, this.input).then(saved => {
                console.log({saved});
            })
        }
    }

    newWords = () => {

    }



    render () {

        return (
            <div style={{height: "100%"}}>
                <WordFolderHeader onRouterChange={this.onRoute} wordCount={this.state.wordsCount}> </WordFolderHeader>

                <div class={style.container}>
                    <textarea
                        autofocus
                        ref={this.textAreaRef}
                        class={style.text}
                        placeholder="Enjoy that new doc smell"
                        value={this.input}
                        onInput={this.onInput}
                    />
                </div>

                <WordFolderMenu onRouterChange={this.onRoute}> </WordFolderMenu>
            </div>
        );
    }
}



