import React from 'react';
import s from './Skills.module.css';
import f from "../common/styles/Container.module.css";
import Skill from "./skill/Skill";


function Skills() {
    return (
        <div className={s.skillsBlock}>
            <div className={`${f.container} ${s.skillsContainer}`}>
                <h2 className={s.title}>Skills</h2>
                <div className={s.skills}>
                    <Skill title={"TS"} description={"dfgyt yuyuui hykkhj hjhjkj fdgfhf ghfghg hggfh gfghg fdsd fghg"}/>
                    <Skill title={"Js"} description={"fghjhgf dfghjhg"}/>
                    <Skill title={"React"} description={"gfdfg hjtrfghf"}/>
                </div>


            </div>
        </div>
    );
}

export default Skills;