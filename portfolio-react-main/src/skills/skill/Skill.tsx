import React from 'react';
import s from './Skill.module.css';

type SkillsProps={
    title:string
    description:string
}

function Skill(props:SkillsProps) {
    return (
        <div className={s.skill}>
            <div className={s.icon}></div>
            <h3>{props.title}</h3>
            <span className={s.description}>{props.description}</span>
        </div>
    );
}

export default Skill;