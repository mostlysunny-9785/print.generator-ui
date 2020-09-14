import {FunctionalComponent, h} from 'preact';
import * as style from './style.css';

interface Props {
    delete: () => void
}

const DeleteButton: FunctionalComponent<Props> = (props: Props) => {
    return (
        <button class={style.deleteButton + " grayButton"} onClick={props.delete}>
            X
        </button>
    )
}

export default DeleteButton;
