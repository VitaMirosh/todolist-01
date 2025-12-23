import React from 'react';
import s from './Projects.module.css';
import f from "../common/styles/Container.module.css";
import {IconSvg} from "../common/components/IconSvg";


function Projects() {
    const projectsMy = [
        {name: 'todo', link: 't',info:'my todolist '},
        {name: 'social', link: 's',info:'social work'}
    ]
    return (
        <div className={s.projectBlock}>
            <div className={`${f.container} ${s.projectContainer}`}>
                <h2>My projects</h2>
                <div className={s.project}>
                    {projectsMy.map(n => <div className={s.project1}>
                            <h3>{n.name}</h3>
                            <a href={n.link}>Watch</a>
                        <p>{n.info}</p>
                    </div>
                        )
                    }
                </div>

            </div>
        </div>

)
    ;
}

export default Projects;