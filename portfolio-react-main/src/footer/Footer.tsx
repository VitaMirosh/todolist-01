import f from "../common/styles/Container.module.css";
import React from "react";
import {IconSvg} from "../common/components/IconSvg";
import s from './Footer.module.css'

export function Footer() {
const messages = ["github","linkedin","telegram"]
    return (
        <footer className={`${f.container} ${s.footer}`}>
            <h3> V M </h3>
            <div className={s.imageSVG} >
                {messages.map(n =>  <a href={""}>
                    <IconSvg name={n}/>
                </a>)}
            </div>
            <h3> © 2023 All rights reserved </h3>



        </footer>
)
}