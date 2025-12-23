import React from 'react';
import s from './Main.module.css';
import f from './../common/styles/Container.module.css'


function Main() {
    return (
        <div className={s.mainBlock}>
            <div className={f.container}>
                <div className={s.text}>
                    <span>Hi There</span>
                    <h1>I am V M</h1>
                    <p>Frontend Developer</p>
                </div>
                <div className={s.photo}></div>
            </div>

        </div>
    );
}

export default Main;
