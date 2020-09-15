import { Component, FunctionalComponent, h } from "preact";
import * as style from "./style.css";

interface Props {
    headline: string;
    visible?: boolean;
    children: any;
}

interface State {
    visible: boolean;
}

export default class Hider extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { visible: false };
        if (props.visible) {
            this.state = { visible: true };
        }
    }

    toggleVisible = () => {
        this.setState({ visible: !this.state.visible });
    };

    render() {
        return (
            <div class={style.container}>
                <div class={style.headline} onClick={this.toggleVisible}>
                    <div class={style.icon}>
                        {this.state.visible ? "▼" : "▶"}{" "}
                    </div>
                    {this.props.headline}
                </div>
                {this.state.visible ? (
                    <div class={style.content}>{this.props.children}</div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}
