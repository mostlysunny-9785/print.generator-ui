import {Component, h} from "preact";
import * as style from "./style.css";
import InstructionsMenu from "./menu";
import Navigation from "../../../components/navigation";

export default class Instructions extends Component<any, any> {
    constructor() {
        super();
        this.state = { value: "" };
    }

    onSubmit = (e: any) => {
        alert("Submitted a todo");
        e.preventDefault();
    };

    onInput = (e: any) => {
        const { value } = e.target;
        this.setState({ value });
    };

    render () {
        return (

            <div>
                <Navigation> </Navigation>
                <div>

                    <div class={style.main}>

                        <div class={style.scrollable}>
                            <p>BASIC INSTRUCTIONS</p>

                            <p>
                            1. Once registered, you will have access to a personal dashboard to manage subscriptions and preferences.
                            </p>
                            <p>
                            2. You will automatically be charged each month for each active module.
                            </p>
                            <p>
                            3. You may unsubscribe from a module at any time –– just toggle the option off and update your OS‌.
                            </p>
                            <p>
                            4. For digital-only modules, once a payment is made you will have immediate 30-day access – no refunds. If you have any questions or issues, feel free to reach out to support@ya.c.ya.g.com.
                            </p>

                            <p> 1) Neither the Font Software nor any of its individual components, in Original or Modified Versions, may be sold by itself.</p>

                            <p>
                            2) Original or Modified Versions of the Font Software may be bundled,
                            redistributed and/or sold with any software, provided that each copy
                            contains the above copyright notice and this license. These can be
                            included either as stand-alone text files, human-readable headers or
                            in the appropriate machine-readable metadata fields within text or
                            binary files as long as those fields can be easily viewed by the user.
                            </p>

                            <p>
                            3) No Modified Version of the Font Software may use the Reserved Font
                            Name(s) unless explicit written permission is granted by the corresponding
                            Copyright Holder. This restriction only applies to the primary font name as
                            presented to the users.
                            </p>

                            <p>
                            4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
                            Software shall not be used to promote, endorse or advertise any
                            Modified Version, except to acknowledge the contribution(s) of the
                            Copyright Holder(s) and the Author(s) or with their explicit written
                            permission.
                            </p>

                            <p>
                            5) The Font Software, modified or unmodified, in part or in whole,
                            must be distributed entirely under this license, and must not be
                            distributed under any other license. The requirement for fonts to
                            remain under this license does not apply to any document created
                            using the Font Software
                            </p>


                        </div>
                        <div class={style.scrollable}>

                            <p>PERMISSION & CONDITIONS</p>

                            <p>
                            Permission is subject to the following conditions:
                            </p>

                            <div class={style.license}>
                                <p>
                                    1) Neither the Font Software nor any of its individual components,
                                    in Original or Modified Versions, may be sold by itself.
                                </p>

                                <p>
                                    2) Original or Modified Versions of the Font Software may be bundled, redistributed and/or sold with any software, provided that each copy contains the above copyright notice and this license. These can be included either as stand-alone text files, human-readable headers or
                                    in the appropriate machine-readable metadata fields within text or
                                    binary files as long as those fields can be easily viewed by the user.
                                </p>

                                <p>
                                    3) No Modified Version of the Font Software may use the Reserved Font
                                    Name(s) unless explicit written permission is granted by the corresponding
                                    Copyright Holder. This restriction only applies to the primary font name as
                                    presented to the users.
                                </p>

                                <p>
                                    4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
                                    Software shall not be used to promote, endorse or advertise any
                                    Modified Version, except to acknowledge the contribution(s) of the
                                    Copyright Holder(s) and the Author(s) or with their explicit written
                                    permission.
                                </p>

                                <p>
                                    5) The Font Software, modified or unmodified, in part or in whole,
                                    must be distributed entirely under this license, and must not be
                                    distributed under any other license. The requirement for fonts to
                                    remain under this license does not apply to any document created
                                    using the Font Software.
                                </p>
                            </div>







                            <p>
                            Copyright Holder(s) or the Author(s) of the Font Software shall not be used to promote, endorse or advertise any Modified Version, except to acknowledge the contribution(s) of the
                            </p>
                            <p>
                            Copyright Holder(s) and the Author(s) or with their explicit written
                            permission.
                            </p>



                        </div>
                    </div>
                    <InstructionsMenu></InstructionsMenu>
                </div>
            </div>
        );
    }
}



