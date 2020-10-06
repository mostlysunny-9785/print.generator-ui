import {FunctionalComponent, h} from "preact";
import * as style from "../../components/header/style.css";
import {route} from "preact-router";
import {store} from "../../model/store";

interface Props {

}

const LoginHeader: FunctionalComponent<Props> = (props: Props) => {

    const userId = store.getState().guestReducer.id;

    return (
        <div class={style.main}>
            <div class={style.a}> </div>
            <div class={style.b}>
                Hello, for early access, continue to beta as Anonymous #{userId}
            </div>
            <div class={style.c}> </div>
        </div>
    )
}

export default LoginHeader;
