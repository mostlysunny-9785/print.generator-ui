import {FunctionalComponent, h} from "preact";
import * as style from "./style.css";
import {ImagesService} from "../../../components/utils/images.service";

interface Props {
    onSubmit: (channelId: string) => void;
}

const PicturePromt: FunctionalComponent<Props> = (props: Props) => {

    let input = "";
    let linkStyle = style.add;

    const onSubmit = (e: any) => {
        console.log(input);
        e.preventDefault();

        props.onSubmit(input);
    }

    const onInput = (e: any) => {
        const {value} = e.target;
        input = value;
        linkStyle = input.length > 0 ? style.addActive : style.add;
    }



    return (
        <div>
            <form onSubmit={onSubmit}>
                <textarea
                    rows={6}
                    placeholder="Drop or Choose files, paste a URL (image or public Are.na channel)"
                    value={input}
                    onInput={onInput}
                />
                <a class={linkStyle} onClick={onSubmit}>Add</a>
            </form>
        </div>

    );
}

export default PicturePromt;
