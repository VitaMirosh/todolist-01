import React from 'react';
import s from './Nav.module.css';


function Nav() {
    return (
        <div className={s.nav}>
            <a href=''>HOME</a>
            <a href=''>SKILLS</a>
            <a href=''>PROJECTS</a>
            <a href=''>CONTACTS</a>
        </div>
    );
}

export default Nav;
