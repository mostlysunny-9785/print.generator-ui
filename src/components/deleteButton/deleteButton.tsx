import {FunctionalComponent, h} from 'preact';
import * as style from './style.css';

interface Props {
    delete: () => void
}

const DeleteButton: FunctionalComponent<Props> = (props: Props) => {
    return (
        <button class={style.deleteButton} onClick={props.delete}>

        </button>
    )
}

export default DeleteButton;
