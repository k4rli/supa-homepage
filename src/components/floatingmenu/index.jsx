import React, {Component} from 'react';
import Signin from "react-icons/lib/fa/sign-in.js";
import Back from "react-icons/lib/ti/backspace.js";
import MenuIcon from "react-icons/lib/md/menu.js";
import MdClose from "react-icons/lib/md/close.js";
import FloatingMenu from "react-floating-button-menu/es/FloatingMenu";
import MainButton from "react-floating-button-menu/es/MainButton";
import ChildButton from "react-floating-button-menu/es/ChildButton";

export default class FloatMenu extends Component {
    render() {
        return (
            <div className="floatingMenuButton">
                <FloatingMenu slideSpeed={500} direction="right" size={{ main: 56, child: 40 }}>
                    <MainButton
                        iconResting={MenuIcon}
                        iconActive={MdClose}
                        iconColor="#f0efed"
                        backgroundColor="black"
                        onClick={console.log("tere")}
                    />
                    <ChildButton
                        iconButton={Signin}
                        iconColor="#f0efed"
                        order={1}
                        backgroundColor="green"
                    />
                    <ChildButton
                        iconButton={Back}
                        iconColor="#f0efed"
                        order={2}
                        backgroundColor="green"
                    />
                </FloatingMenu>
            </div>
        );
    };
};
