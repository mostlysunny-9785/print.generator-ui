import {FunctionalComponent, h} from "preact";
import * as style from "../../components/header/style.css";
import {route} from "preact-router";

interface Props {

}

const LoginHeader: FunctionalComponent<Props> = (props: Props) => {
    return (
        <div class={style.main}>
            <div class={style.a}> </div>
            <div class={style.b}>
                Hello, for early access, continue to beta as Anonymous #3
            </div>
            <div class={style.c}> </div>
        </div>
    )
}

export default LoginHeader;
