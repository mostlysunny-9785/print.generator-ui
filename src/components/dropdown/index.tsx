import {Component, h} from "preact";
import * as style from "./style.css";
import * as menuStyle from "../menu/menuStyle.css";
import {route} from "preact-router";

interface Props {
    label: string,
    horizontalPosition: 'CENTER' | 'RIGHT' | 'LEFT',
    buttonStyling: string,
    buttons: {
        label: string,
        action: () => void
    }[]

}

export default class DropdownMenu extends Component<Props, any> {
    constructor(props: Props) {
        super(props);

        this.state = {
            showMenu: false,
        };

    }

    private dropdownMenu: any;

    // showMenu = (event: Event) => {
    //     event.preventDefault();
    //
    //     console.log("showing that shit")
    //     this.setState({ showMenu: true }, () => {
    //         console.log("yep setted up");
    //         // document.addEventListener('click', this.closeMenu);
    //     });
    // }

    // closeMenu = (event: Event) => {
    //     console.log("closing");
    //     if (!this.dropdownMenu.contains(event.target) && this.state.showMenu) {
    //         this.setState({ showMenu: false }, () => {
    //             document.removeEventListener('click', this.closeMenu);
    //         });
    //     }
    // }

    toggleMenu = (event: Event) => {
        event.preventDefault();
        this.setState({ showMenu: !this.state.showMenu }, () => {
            if (this.state.showMenu) {
                // document.addEventListener('click', this.closeMenu);
                // TODO: close menu when clicked somewhere else
            }
        });
    }

    actionClicked = (action: () => void) => {
        this.setState({showMenu: false}); // hide menu
        action();
    }

    render() {

        const buttons: any[] = [];
        this.props.buttons.forEach((button, index) => {
            let buttonElem;
            if (index == 0) { // first elemtn => round corners
                buttonElem = <button class={style.dropdownItem + ' ' + style.topItem} onClick={() => this.actionClicked(button.action)}>{button.label}</button>;
            }  else if (index == this.props.buttons.length-1) { // last elem
                buttonElem = <button class={style.dropdownItem + ' ' + style.bottomItem} onClick={() => this.actionClicked(button.action)}>{button.label}</button>;
            } else {
                buttonElem = <button class={style.dropdownItem} onClick={() => this.actionClicked(button.action)}>{button.label}</button>;
            }
            buttons.push(buttonElem);
        })

        const mainMenuStyle = this.state.showMenu ? 'grayButton' : 'wireButton';
        return (
            <span>
                { this.state.showMenu ? <div class={style.blurer}></div> : null }
            <span class={style.wrapper}>

                <button onClick={this.toggleMenu} class={mainMenuStyle + ' ' + this.props.buttonStyling}>
                    {this.props.label}
                </button>
                {
                    this.state.showMenu
                        ? (
                            <div
                                className="menu"
                                class={style.dropdown}
                                ref={(element) => {
                                    this.dropdownMenu = element;
                                }}
                            >
                                {buttons}
                            </div>
                        )
                        : null

                }


            </span>

            </span>
        );
    }
}



