import f from "../common/styles/Container.module.css";
import React from "react";
import s from './Contact.module.css'

export function Contact() {
    return (
        <div className={s.blockContact}>
            <div className={`${f.container} ${s.contacts}`}>
                <h3> Contacts </h3>
                <form className={s.formStyle}>
                    <div className={s.input}><input/></div>
                    <div className={s.input}><input/></div>
                    <div className={s.textarea}><textarea/></div>
                    <button className={s.buttonContact}>Send</button>
                </form>
            </div>
        </div>

    )
}