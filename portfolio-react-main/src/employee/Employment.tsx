import React from "react";
import f from './../common/styles/Container.module.css'
import s from './Employment.module.css'

export function Employment() {
    return (
        <div className={s.blockEmployee}>
            <div className={`${f.container} ${s.employee}`}>
                <h2>Сonsidering remote options</h2>
                <a href="">Hire me</a>
            </div>
        </div>

    )
}