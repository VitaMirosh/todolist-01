import React from 'react';
import s from './Header.module.css';
import Nav from "../nav/Nav";
import f from "../common/styles/Container.module.css";

function Header() {
    return (
        <div className={s.blockHeader}>
        <div className={s.header}>
            <Nav/>
        </div>
        </div>
    );
}

export default Header;
