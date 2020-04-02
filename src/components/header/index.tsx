import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router/match";
import * as style from "./style.css";

const Header: FunctionalComponent = () => {
    return (
        <header class={style.header}>
            <h1>Ya.C Ya.G</h1>
            <nav>
                <Link activeClassName={style.active} href="/">
                    Home
                </Link>
                <Link activeClassName={style.active} href="/scrapper">
                    Scrapper
                </Link>
                <Link activeClassName={style.active} href="/profile/john">
                    Profile
                </Link>
            </nav>
        </header>
    );
};

export default Header;
